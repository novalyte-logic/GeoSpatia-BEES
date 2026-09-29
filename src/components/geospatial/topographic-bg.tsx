import { cn } from "@/lib/utils";

/**
 * TopographicParcelBg — an original SVG composition of:
 *  - faint contour rings (topographic feel)
 *  - a few parcel-like polygons with coordinate pins
 *  - a sparse grid
 * Designed to sit behind the hero and section bands as a quiet,
 * credible "geospatial evidence" motif. No neon, no glassmorphism.
 */
export function TopographicParcelBg({
  className,
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "soft" | "grid";
}) {
  if (variant === "grid") {
    return (
      <svg
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="gl-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0 H0 V40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.08" />
          </pattern>
          <radialGradient id="gl-grid-fade" cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gl-grid)" />
        <rect width="100%" height="100%" fill="url(#gl-grid-fade)" />
      </svg>
    );
  }

  const contourOpacity = variant === "soft" ? 0.05 : 0.09;
  const parcelOpacity = variant === "soft" ? 0.06 : 0.1;

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="gl-hero-glow" cx="78%" cy="18%" r="55%">
          <stop offset="0%" stopColor="var(--emerald)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--emerald)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gl-fade-r" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--background)" stopOpacity="1" />
          <stop offset="22%" stopColor="var(--background)" stopOpacity="0.85" />
          <stop offset="60%" stopColor="var(--background)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--background)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gl-fade-b" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--background)" stopOpacity="1" />
          <stop offset="40%" stopColor="var(--background)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--background)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Soft emerald glow top-right */}
      <rect width="1200" height="700" fill="url(#gl-hero-glow)" />

      {/* Grid */}
      <g stroke="var(--ink)" strokeOpacity={0.04} strokeWidth="0.6">
        {Array.from({ length: 31 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="700" />
        ))}
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 40} x2="1200" y2={i * 40} />
        ))}
      </g>

      {/* Topographic contour rings — clustered, calm */}
      <g
        transform="translate(900 180)"
        stroke="var(--emerald)"
        strokeOpacity={contourOpacity}
        fill="none"
        strokeWidth="1"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="0"
            rx={60 + i * 22}
            ry={40 + i * 16}
            transform="rotate(-12)"
          />
        ))}
      </g>
      <g
        transform="translate(180 540)"
        stroke="var(--ink)"
        strokeOpacity={contourOpacity}
        fill="none"
        strokeWidth="1"
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <ellipse key={i} cx="0" cy="0" rx={50 + i * 20} ry={32 + i * 14} />
        ))}
      </g>

      {/* Parcel-like polygons with coordinate pins */}
      <g
        stroke="var(--ink)"
        strokeOpacity={parcelOpacity}
        strokeWidth="1.2"
        fill="var(--emerald-tint)"
        fillOpacity="0.25"
      >
        <polygon points="820,120 940,140 960,240 850,260 790,200" />
        <polygon points="970,300 1060,290 1080,380 990,400" />
        <polygon points="120,300 220,290 240,380 150,400 100,360" />
      </g>

      {/* Coordinate pins on parcels */}
      <g fill="var(--emerald)" fillOpacity="0.55">
        <circle cx="884" cy="188" r="3" />
        <circle cx="1023" cy="343" r="3" />
        <circle cx="172" cy="343" r="3" />
      </g>
      <g stroke="var(--emerald)" strokeOpacity="0.45" strokeWidth="1" fill="none">
        <circle cx="884" cy="188" r="7" />
        <circle cx="1023" cy="343" r="7" />
        <circle cx="172" cy="343" r="7" />
      </g>

      {/* Right + bottom fades so content reads cleanly */}
      <rect width="1200" height="700" fill="url(#gl-fade-r)" />
      <rect width="1200" height="700" fill="url(#gl-fade-b)" />
    </svg>
  );
}
