import { Section, SectionHeading } from "./section";
import {
  Layers,
  MapPinned,
  Filter,
  HelpCircle,
} from "lucide-react";

const points = [
  {
    icon: Layers,
    title: "Teams evaluate many possibilities",
    detail:
      "Development pipelines hold more candidates than teams can thoroughly diligence at once. Where the early evidence is weak, that deserves to be visible.",
  },
  {
    icon: MapPinned,
    title: "Relevant evidence is fragmented",
    detail:
      "The facts that matter to a site decision sit across ISO queue filings, county assessor GIS, planning portals, environmental datasets, and project records — not in one place.",
  },
  {
    icon: Filter,
    title: "Organizing evidence earlier focuses diligence",
    detail:
      "When the relevant public information is assembled up front, deeper engineering, interconnection, legal, environmental, and permitting work can be directed where it is most warranted.",
  },
  {
    icon: HelpCircle,
    title: "Surface the questions sooner",
    detail:
      "Most early-stage risk is unknown-unknown risk. A source-backed screen makes the open questions explicit, so they can be pursued deliberately rather than discovered late.",
  },
];

export function WhyScreening() {
  return (
    <Section
      id="why-screening"
      className="border-b border-line bg-background py-20 md:py-24"
    >
      <SectionHeading
        eyebrow="Why early screening matters"
        title="Less research friction. Earlier questions."
        intro="GeoSpatia Labs is designed to reduce the cost of organizing early evidence — so teams can focus deeper diligence where it’s most warranted. No inflated savings claims, just a cleaner starting point."
      />

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {points.map((p) => {
          const Icon = p.icon;
          return (
            <article
              key={p.title}
              className="surface-card flex gap-5 p-6"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-emerald/25 bg-card text-emerald">
                <Icon className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.detail}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        <span className="font-medium text-ink">No implied savings figures.</span>{" "}
        We do not quote ROI, dollar savings, or timeline reductions. The value is
        in organizing the right evidence earlier — not in a headline number we
        can’t source.
      </p>
    </Section>
  );
}
