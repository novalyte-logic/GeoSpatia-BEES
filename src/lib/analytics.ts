/**
 * Lightweight, privacy-first analytics helper for GeoSpatia Labs.
 *
 * Backed by Plausible Analytics:
 * - Cookie-less, GDPR/CCPA compliant by default.
 * - No IP address storage or fingerprinting.
 * - No PII (names, emails, coordinates) is ever sent in custom event properties.
 */

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: {
        props?: Record<string, string | number | boolean>;
        callback?: () => void;
      }
    ) => void;
  }
}

export type SafeAnalyticsEvent =
  | "page_view"
  | "request_form_view"
  | "request_form_started"
  | "request_form_submitted"
  | "sample_brief_view"
  | "map_search_used"
  | "methodology_view";

export interface EventProps {
  project_type?: string;
  dev_stage?: string;
  has_apn?: boolean;
  has_coordinates?: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Capture UTM parameters from current URL query string safely.
 */
export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "ref"];
    for (const key of keys) {
      const val = params.get(key);
      if (val) {
        utm[key] = val.slice(0, 100); // Safe length cap
      }
    }
    return utm;
  } catch {
    return {};
  }
}

/**
 * Dispatch a privacy-safe custom event to Plausible.
 */
export function trackEvent(eventName: SafeAnalyticsEvent, props?: EventProps): void {
  if (typeof window === "undefined") return;

  const sanitizedProps: Record<string, string | number | boolean> = {};
  if (props) {
    for (const [key, value] of Object.entries(props)) {
      if (value !== undefined && value !== null) {
        // Enforce strict type safety and length limits
        if (typeof value === "string") {
          sanitizedProps[key] = value.slice(0, 100);
        } else if (typeof value === "number" || typeof value === "boolean") {
          sanitizedProps[key] = value;
        }
      }
    }
  }

  if (typeof window.plausible === "function") {
    window.plausible(eventName, { props: sanitizedProps });
  } else if (process.env.NODE_ENV === "development") {
    // Development debug log
    console.debug(`[analytics:event] ${eventName}`, sanitizedProps);
  }
}
