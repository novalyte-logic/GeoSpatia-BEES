import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { insertSiteScreenRequest, isSupabaseConfigured } from "@/lib/supabase";
import { sendAdminNotification } from "@/lib/email";

/**
 * POST /api/site-screen
 *
 * Receives a "Request a Site Screen" inquiry, validates it, and saves it
 * to the Supabase `site_screen_requests` table.
 *
 * TRUST & VERIFICATION RULES:
 * - Real validation, real database persistence, real error reporting.
 * - NEVER return a fake success or browser-fabricated reference ID.
 * - Honeypot field (`hp_website`) for basic abuse protection.
 * - No pricing, no invented turnaround times, no fake availability.
 */

const ACCEPTED_PROJECT_TYPES = [
  "Utility-scale BESS",
  "Commercial / industrial BESS",
  "Behind-the-meter BESS",
  "Solar + BESS hybrid",
  "Other",
] as const;

const ACCEPTED_DEV_STAGES = [
  "Pre-screening (just identifying candidates)",
  "Site control / option",
  "Pre-application",
  "Application filed",
  "Other",
] as const;

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(160, "Name is too long."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid work email address.")
    .max(200, "Email is too long."),
  company: z
    .string()
    .trim()
    .min(2, "Please enter your company name.")
    .max(200, "Company name is too long."),
  role: z
    .string()
    .trim()
    .min(2, "Please enter your role.")
    .max(160, "Role is too long."),
  siteLocation: z
    .string()
    .trim()
    .min(5, "Please provide a candidate site, jurisdiction, APN, or coordinates.")
    .max(1000, "Site location description is too long."),
  projectType: z.enum(ACCEPTED_PROJECT_TYPES, {
    message: "Please select a project type.",
  }),
  projectSizeMw: z
    .string()
    .trim()
    .max(60, "Project size is too long.")
    .optional()
    .or(z.literal("")),
  durationHours: z
    .string()
    .trim()
    .max(60, "Duration is too long.")
    .optional()
    .or(z.literal("")),
  devStage: z.enum(ACCEPTED_DEV_STAGES, {
    message: "Please select your current development stage.",
  }),
  decision: z
    .string()
    .trim()
    .min(10, "Please describe the decision you are evaluating (at least a brief description).")
    .max(3000, "Decision description is too long."),
  notes: z
    .string()
    .trim()
    .max(4000, "Notes are too long.")
    .optional()
    .or(z.literal("")),
  privacyAck: z
    .boolean()
    .refine((v) => v === true, "Please acknowledge the privacy notice to submit."),
  // Honeypot field for bot/abuse protection (must be empty)
  hp_website: z.string().max(0, "Submission rejected.").optional().or(z.literal("")),
});

// In-memory rate limiting and deduplication store
type RateLimitRecord = { count: number; firstSeen: number };
const rateLimitMap = new Map<string, RateLimitRecord>();
const recentSubmissions = new Map<string, number>();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const DEDUP_WINDOW_MS = 30 * 1000; // 30 seconds

function checkRateLimit(ip: string): boolean {
  // Allow higher threshold during local development testing
  const maxAllowed =
    process.env.NODE_ENV === "development" && (ip === "127.0.0.1" || ip === "localhost")
      ? 100
      : MAX_REQUESTS_PER_WINDOW;

  const now = Date.now();
  const rec = rateLimitMap.get(ip);
  if (!rec || now - rec.firstSeen > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstSeen: now });
    return true;
  }
  if (rec.count >= maxAllowed) {
    return false;
  }
  rec.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  // Extract client IP for abuse prevention (fallback to header or remote address)
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Too many inquiries received from this address. Please wait a few minutes before submitting another request or contact admin@geospatialabs.com directly.",
      },
      { status: 429 }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 }
    );
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString() ?? "form";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      {
        ok: false,
        error: "Please review the highlighted fields.",
        fieldErrors,
      },
      { status: 422 }
    );
  }

  const d = parsed.data;

  // Bot check: if honeypot is filled, silently reject
  if (d.hp_website && d.hp_website.length > 0) {
    return NextResponse.json(
      { ok: false, error: "Submission rejected." },
      { status: 400 }
    );
  }

  // Deduplication check: reject immediate identical submission within 30 seconds
  const dedupKey = `${d.email}:${d.siteLocation.slice(0, 50)}`;
  const now = Date.now();
  const lastSubmitted = recentSubmissions.get(dedupKey);
  if (lastSubmitted && now - lastSubmitted < DEDUP_WINDOW_MS) {
    return NextResponse.json(
      {
        ok: true,
        duplicate: true,
        message:
          "A request for this candidate site was already submitted moments ago. Our team has received it.",
      },
      { status: 200 }
    );
  }
  recentSubmissions.set(dedupKey, now);

  if (!isSupabaseConfigured) {
    console.warn(
      "[site-screen] Supabase credentials not yet configured in environment variables."
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Database connection is currently pending setup. The site administrator must configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY. Please email your inquiry directly to admin@geospatialabs.com in the meantime.",
      },
      { status: 503 }
    );
  }

  // Privacy rule: Do NOT log candidate coordinates or personal details in console logs
  const result = await insertSiteScreenRequest({
    fullName: d.name,
    workEmail: d.email,
    company: d.company,
    role: d.role,
    candidateSite: d.siteLocation,
    projectType: d.projectType,
    approximateCapacityMw: d.projectSizeMw,
    approximateDurationHours: d.durationHours,
    developmentStage: d.devStage,
    primaryDecisionQuestion: d.decision,
    additionalNotes: d.notes,
  });

  if (!result.success) {
    return NextResponse.json(
      {
        ok: false,
        error: result.error,
      },
      { status: 500 }
    );
  }

  // Attempt admin notification email (non-blocking failure: DB write already succeeded)
  await sendAdminNotification({
    referenceId: result.id!,
    fullName: d.name,
    workEmail: d.email,
    company: d.company,
    role: d.role,
    candidateSite: d.siteLocation,
    projectType: d.projectType,
    approximateCapacityMw: d.projectSizeMw,
    approximateDurationHours: d.durationHours,
    developmentStage: d.devStage,
    primaryDecisionQuestion: d.decision,
    additionalNotes: d.notes,
    createdAt: result.createdAt!,
  });

  return NextResponse.json(
    {
      ok: true,
      referenceId: result.id,
      createdAt: result.createdAt,
      message:
        "We have received your site screening inquiry. Our team will review the candidate location against our current California research scope and follow up directly by email.",
    },
    { status: 201 }
  );
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed. Use POST." },
    { status: 405 },
  );
}
