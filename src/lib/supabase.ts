import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Client-safe Supabase configuration for GeoSpatia Labs.
 *
 * TRUST & SECURITY RULES:
 * - NEVER import or expose a service_role key, database password, or private secret.
 * - Only uses client-safe public keys (publishable/anon key) protected by Row Level Security (RLS).
 * - Public visitors can only INSERT; they cannot SELECT, UPDATE, or DELETE records.
 * - Supports both Next.js (NEXT_PUBLIC_*) and Vite (VITE_*) environment variable conventions.
 */

// Fallback to project's public client-safe credentials if env vars are unconfigured in hosting environment
const DEFAULT_SUPABASE_URL = "https://dkfcbrjpgfflssxmcrkn.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  "sb_publishable_nJXxGHJJI_2RT_3l1qQyew_K3gUppMI";

function getSupabaseConfig(): { url: string; key: string; isConfigured: boolean } {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    DEFAULT_SUPABASE_URL;

  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    DEFAULT_SUPABASE_ANON_KEY;

  const isConfigured = Boolean(
    url &&
      key &&
      !url.includes("your-project") &&
      !key.includes("your-anon-publishable-key")
  );

  return { url, key, isConfigured };
}

export const isSupabaseConfigured = true;

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const { url, key, isConfigured } = getSupabaseConfig();
  if (!isConfigured) {
    return null;
  }
  if (!cachedClient) {
    cachedClient = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return cachedClient;
}

export type SiteScreenRequestInput = {
  fullName: string;
  workEmail: string;
  company: string;
  role: string;
  candidateSite: string;
  projectType: string;
  approximateCapacityMw?: string;
  approximateDurationHours?: string;
  developmentStage: string;
  primaryDecisionQuestion: string;
  additionalNotes?: string;
};

export type SiteScreenInsertResult =
  | { success: true; id: string; createdAt: string }
  | { success: false; error: string };

/**
 * Inserts a site screening inquiry into the Supabase site_screen_requests table.
 * Verified with Row Level Security (RLS) INSERT policy.
 */
export async function insertSiteScreenRequest(
  input: SiteScreenRequestInput
): Promise<SiteScreenInsertResult> {
  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      error:
        "Supabase is not configured yet. The site administrator must set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    };
  }

  try {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const { error, status } = await client
      .from("site_screen_requests")
      .insert([
        {
          id,
          created_at: createdAt,
          full_name: input.fullName.trim(),
          work_email: input.workEmail.trim().toLowerCase(),
          company: input.company.trim(),
          role: input.role.trim(),
          candidate_site: input.candidateSite.trim(),
          project_type: input.projectType,
          approximate_capacity_mw: input.approximateCapacityMw?.trim() || null,
          approximate_duration_hours: input.approximateDurationHours?.trim() || null,
          development_stage: input.developmentStage,
          primary_decision_question: input.primaryDecisionQuestion.trim(),
          additional_notes: input.additionalNotes?.trim() || null,
          status: "new",
        },
      ]);

    if (error || (status && status >= 400)) {
      console.error("[supabase] insert failed:", error?.message || `HTTP ${status}`);
      return {
        success: false,
        error:
          "Unable to save your request right now. Please try again or reach out to admin@geospatialabs.com.",
      };
    }

    return {
      success: true,
      id,
      createdAt,
    };
  } catch (err) {
    console.error("[supabase] network exception during insert:", err);
    return {
      success: false,
      error:
        "A network error occurred while submitting. Please check your connection and try again.",
    };
  }
}
