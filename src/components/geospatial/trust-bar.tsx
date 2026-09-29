import { cn } from "@/lib/utils";

/**
 * Trust bar — sits under hero. Calm, factual positioning line plus
 * four short trust signals. No fake customer logos or made-up metrics.
 */
export function TrustBar({ className }: { className?: string }) {
  const signals = [
    {
      title: "Built for early development decisions",
      detail:
        "Designed for the point in diligence when teams are still deciding where to focus — not for final engineering.",
    },
    {
      title: "Source-backed by default",
      detail:
        "Findings reference identified public sources. Unknowns stay unknown rather than manufactured into certainty.",
    },
    {
      title: "California BESS today",
      detail:
        "Initial launch wedge is California battery-energy-storage site screening. Coverage expands deliberately.",
    },
    {
      title: "Preliminary, not final",
      detail:
        "Replaces nothing from licensed engineers, utilities, or agencies. It organizes what to ask next.",
    },
  ];
  return (
    <section className={cn("border-b border-line bg-background", className)}>
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-[0.14em] text-emerald">
          What you’re actually getting
        </p>
        <div className="mt-7 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {signals.map((s) => (
            <div
              key={s.title}
              className="flex flex-col gap-2 bg-card px-5 py-5"
            >
              <h3 className="text-sm font-semibold leading-snug text-ink">
                {s.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                {s.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
