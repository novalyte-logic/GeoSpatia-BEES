"use client";

import { Section, SectionHeading } from "./section";
import { cn } from "@/lib/utils";
import {
  BatteryCharging,
  Building2,
  Workflow,
  SearchCheck,
} from "lucide-react";

const audiences = [
  {
    icon: BatteryCharging,
    title: "Battery storage developers",
    detail:
      "Teams screening multiple candidate California BESS sites and deciding which deserve interconnection, engineering, and acquisition spend.",
    use: "Use it to short-list sites before deploying limited development bandwidth.",
  },
  {
    icon: Building2,
    title: "Project development teams",
    detail:
      "Development leads coordinating origination, engineering, land, and permitting across a pipeline of early-stage opportunities.",
    use: "Use it to align internal teams on what’s known, what’s missing, and what to do next.",
  },
  {
    icon: Workflow,
    title: "Interconnection / origination teams",
    detail:
      "Teams that need to triage queue position, substation proximity, and published interconnection signals across a set of candidates.",
    use: "Use it to organize published ISO/utility context before commissioning formal studies.",
  },
  {
    icon: SearchCheck,
    title: "Site acquisition & diligence teams",
    detail:
      "Teams assembling site context for land decisions, investment reviews, or portfolio triage — where early evidence matters.",
    use: "Use it to surface material unknowns and conflicts before option spend or capital commitment.",
  },
];

export function WhoItsFor() {
  return (
    <Section
      id="audience"
      className="border-b border-line bg-background py-20 md:py-24"
    >
      <SectionHeading
        eyebrow="Who it’s for"
        title="Built for teams making expensive site decisions"
        intro="The initial launch serves California BESS developers and the teams around them. As coverage expands, the same evidence structure extends to adjacent infrastructure use cases."
      />

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {audiences.map((a) => {
          const Icon = a.icon;
          return (
            <article
              key={a.title}
              className="surface-card group flex flex-col gap-4 p-6 transition-shadow hover:shadow-md"
            >
              <div
                className={cn(
                  "flex size-11 items-center justify-center rounded-lg border border-emerald/25 bg-emerald/8 text-emerald",
                )}
              >
                <Icon className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold leading-snug text-ink">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {a.detail}
                </p>
              </div>
              <div className="mt-auto rounded-lg border border-line-soft bg-muted/40 px-4 py-3">
                <p className="text-[13px] leading-relaxed text-ink-soft">
                  <span className="font-medium text-ink">{a.use}</span>
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        <span className="font-medium text-ink">Scope note:</span> at launch,
        GeoSpatia Labs focuses on California battery-energy-storage screening.
        Other geographies, technologies, and use cases are added deliberately —
        not implied.
      </p>
    </Section>
  );
}
