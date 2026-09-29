import { cn } from "@/lib/utils";

/**
 * Geospatial Labs brand mark.
 * A parcel-like hexagonal polygon with an interior coordinate cross,
 * signalling geospatial + evidence + grid. Original composition.
 */
export function BrandMark({
  className,
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-emerald", className)}
      aria-hidden="true"
    >
      {/* Parcel outline */}
      <path
        d="M16 2.2 L27.2 9 V21 L16 29.8 L4.8 21 V9 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="var(--emerald-tint)"
        fillOpacity="0.55"
      />
      {/* Inner parcel subdivision lines */}
      <path
        d="M16 2.2 V29.8 M4.8 9 H27.2"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeOpacity="0.45"
        strokeLinejoin="round"
      />
      {/* Coordinate marker */}
      <circle cx="16" cy="15" r="2.6" fill="currentColor" />
      <circle cx="16" cy="15" r="5.4" stroke="currentColor" strokeWidth="0.9" fill="none" />
    </svg>
  );
}

export function Logo({
  className,
  onNavigateHome,
}: {
  className?: string;
  onNavigateHome?: () => void;
}) {
  const Comp = onNavigateHome ? "button" : "div";
  return (
    <Comp
      type={onNavigateHome ? "button" : undefined}
      onClick={onNavigateHome}
      className={cn(
        "group inline-flex items-center gap-2.5 text-left",
        onNavigateHome && "cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        className,
      )}
      aria-label="Geospatial Labs — home"
    >
      <BrandMark size={30} className="transition-transform duration-500 group-hover:rotate-[8deg]" />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-tight text-ink">
          Geospatial Labs
        </span>
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Site Intelligence
        </span>
      </span>
    </Comp>
  );
}
