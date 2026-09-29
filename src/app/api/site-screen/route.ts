import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

/**
 * POST /api/site-screen
 *
 * Receives a "Request a Site Screen" lead submission, validates it,
 * and persists to the SiteScreenRequest table.
 *
 * TRUST RULES:
 *  - Real validation, real persistence, real success/error states.
 *  - No fake confirmations. We only return 200 when the row is actually written.
 *  - No pricing, no turnaround promises, no fake availability.
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
    .max(120, "Name is too long."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid work email address.")
    .max(160, "Email is too long.")
    .refine((v) => {
      // Discourage personal mail hosts — not a hard block, but flag disposable ones.
      const blocked = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "aol.com"];
      const domain = v.split("@")[1] ?? "";
      return true; // soft check; we accept but may surface guidance in UI
    }, ""),
  company: z
    .string()
    .trim()
    .min(2, "Please enter your company name.")
    .max(160, "Company name is too long."),
  role: z
    .string()
    .trim()
    .min(2, "Please enter your role.")
    .max(120, "Role is too long."),
  siteLocation: z
    .string()
    .trim()
    .min(6, "Please provide a candidate site, address, APN, or coordinates.")
    .max(500, "Site location description is too long."),
  projectType: z.enum(ACCEPTED_PROJECT_TYPES, {
    message: "Please select a project type.",
  }),
  projectSizeMw: z
    .string()
    .trim()
    .max(40, "Project size is too long.")
    .optional()
    .or(z.literal("")),
  devStage: z.enum(ACCEPTED_DEV_STAGES, {
    message: "Please select your current development stage.",
  }),
  decision: z
    .string()
    .trim()
    .min(12, "Please tell us what decision you’re trying to make (at least a sentence).")
    .max(2000, "Decision description is too long."),
  notes: z
    .string()
    .trim()
    .max(4000, "Notes are too long.")
    .optional()
    .or(z.literal("")),
  privacyAck: z
    .boolean()
    .refine((v) => v === true, "Please acknowledge the privacy note to continue."),
  // Optional — currently unused but accepted for forward compatibility
  uploadName: z.string().trim().max(255).optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
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
      { status: 422 },
    );
  }

  const d = parsed.data;

  try {
    const record = await db.siteScreenRequest.create({
      data: {
        name: d.name,
        email: d.email,
        company: d.company,
        role: d.role,
        siteLocation: d.siteLocation,
        projectType: d.projectType,
        projectSizeMw: d.projectSizeMw || null,
        devStage: d.devStage,
        decision: d.decision,
        notes: d.notes || null,
        uploadName: d.uploadName || null,
        privacyAck: d.privacyAck,
        status: "received",
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        // Return a confirmation that is honest about what happens next.
        // We do NOT promise a turnaround time, price, or guaranteed engagement.
        referenceId: record.id,
        message:
          "We received your request. The Geospatial Labs team will review whether the site fits the current screening scope and follow up by email. No payment is requested at this stage.",
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("[site-screen] persistence error", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn’t save your request right now. Please try again, or email hello@geospatialabs.com.",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed. Use POST." },
    { status: 405 },
  );
}
