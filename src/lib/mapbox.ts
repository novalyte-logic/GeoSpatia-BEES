/**
 * Mapbox GL JS & Geocoding configuration for GeoSpatia Labs.
 *
 * TRUST & SECURITY RULES:
 * - Only use client-side public tokens with restricted URL/domain scopes.
 * - NEVER put secret Mapbox tokens, billing keys, or private credentials in this file.
 * - No fake coordinates, mock pins, or synthetic search results.
 * - Does not persist geocoding queries to localStorage, sessionStorage, or Supabase.
 */

export const MAPBOX_PUBLIC_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN ||
  process.env.VITE_MAPBOX_PUBLIC_TOKEN ||
  "";

export const isMapboxConfigured = Boolean(
  MAPBOX_PUBLIC_TOKEN &&
    !MAPBOX_PUBLIC_TOKEN.includes("your-mapbox-token") &&
    MAPBOX_PUBLIC_TOKEN.startsWith("pk.")
);

/** California geographic approximate bounding box [minLng, minLat, maxLng, maxLat] */
export const CALIFORNIA_BBOX = [-124.482, 32.528, -114.131, 42.009] as const;

/** California center coordinates [lng, lat] and default statewide zoom */
export const CALIFORNIA_CENTER: [number, number] = [-119.4179, 36.7783];
export const CALIFORNIA_DEFAULT_ZOOM = 5.8;

export type GeocodingFeature = {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Record<string, unknown>;
  text: string;
  place_name: string;
  center: [number, number]; // [lng, lat]
  bbox?: [number, number, number, number];
  context?: Array<{
    id: string;
    text: string;
    short_code?: string;
  }>;
};

export type GeocodingResponse = {
  type: "FeatureCollection";
  query: string[];
  features: GeocodingFeature[];
  attribution: string;
};

/**
 * Searches for real addresses using the official Mapbox Geocoding API v5.
 * Biased toward California and restricted to the United States.
 */
export async function searchAddress(
  query: string,
  signal?: AbortSignal
): Promise<{ success: true; features: GeocodingFeature[] } | { success: false; error: string }> {
  if (!isMapboxConfigured) {
    return {
      success: false,
      error: "Mapbox public token is not configured.",
    };
  }

  const trimmed = query.trim();
  if (trimmed.length < 3) {
    return { success: true, features: [] };
  }

  // Detect if user likely entered an APN (e.g. 123-456-78 or 9 digits)
  const isLikelyApn = /^[\d\s-]{6,15}$/.test(trimmed);

  try {
    const params = new URLSearchParams({
      access_token: MAPBOX_PUBLIC_TOKEN,
      country: "us",
      // Proximity to California center biases results without excluding other US locations
      proximity: `${CALIFORNIA_CENTER[0]},${CALIFORNIA_CENTER[1]}`,
      types: "address,postcode,place,locality,poi",
      limit: "5",
      language: "en",
    });

    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      trimmed
    )}.json?${params.toString()}`;

    const res = await fetch(endpoint, { signal });
    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        return {
          success: false,
          error: "Mapbox token unauthorized or domain restricted. Please verify token settings.",
        };
      }
      return {
        success: false,
        error: `Address geocoding service returned status ${res.status}.`,
      };
    }

    const data = (await res.json()) as GeocodingResponse;
    const features = data.features || [];

    if (features.length === 0 && isLikelyApn) {
      return {
        success: true,
        features: [],
      };
    }

    return {
      success: true,
      features,
    };
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      return { success: true, features: [] };
    }
    return {
      success: false,
      error: "Network error connecting to Mapbox geocoding service.",
    };
  }
}

/**
 * Reverse geocodes coordinates to get the nearest street address / place name.
 */
export async function reverseGeocode(
  lng: number,
  lat: number
): Promise<{ success: true; placeName: string; feature?: GeocodingFeature } | { success: false; error: string }> {
  if (!isMapboxConfigured) {
    return {
      success: false,
      error: "Mapbox public token is not configured.",
    };
  }

  try {
    const params = new URLSearchParams({
      access_token: MAPBOX_PUBLIC_TOKEN,
      country: "us",
      types: "address,place,locality",
      limit: "1",
      language: "en",
    });

    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?${params.toString()}`;

    const res = await fetch(endpoint);
    if (!res.ok) {
      return {
        success: false,
        error: `Reverse geocoding returned status ${res.status}.`,
      };
    }

    const data = (await res.json()) as GeocodingResponse;
    const first = data.features?.[0];

    if (!first) {
      return {
        success: true,
        placeName: `${lat.toFixed(5)}°N, ${Math.abs(lng).toFixed(5)}°W`,
      };
    }

    return {
      success: true,
      placeName: first.place_name,
      feature: first,
    };
  } catch {
    return {
      success: false,
      error: "Network error during reverse geocoding lookup.",
    };
  }
}

/**
 * Checks if a coordinate or geocoding feature is within California.
 */
export function isCaliforniaLocation(
  lng: number,
  lat: number,
  feature?: GeocodingFeature
): boolean {
  if (feature?.context) {
    const hasCa = feature.context.some(
      (c) =>
        (c.id.startsWith("region") && (c.short_code === "US-CA" || c.text.toLowerCase() === "california"))
    );
    if (hasCa) return true;
  }

  // Bounding box fallback
  return (
    lng >= CALIFORNIA_BBOX[0] &&
    lng <= CALIFORNIA_BBOX[2] &&
    lat >= CALIFORNIA_BBOX[1] &&
    lat <= CALIFORNIA_BBOX[3]
  );
}

/**
 * Maps place_type to human-readable precision label.
 */
export function formatPrecisionLabel(placeType: string[] = []): string {
  if (placeType.includes("address")) return "Rooftop / Street Address Match";
  if (placeType.includes("poi")) return "Point of Interest / Landmark";
  if (placeType.includes("postcode")) return "Postal Code Area";
  if (placeType.includes("locality") || placeType.includes("place")) return "City / Locality Area";
  if (placeType.includes("neighborhood")) return "Neighborhood Area";
  return "Approximate Geographic Reference";
}
