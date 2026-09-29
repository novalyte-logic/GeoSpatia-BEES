"use client";

import { Section, SectionHeading } from "./section";
import {
  Database,
  FileSearch,
  ListChecks,
  GitBranch,
  UserCheck,
  FileText,
  ArrowRight,
} from "lucide-react";

const flow = [
  {
    icon: Database,
    label: "Authoritative / identified sources",
    detail: "Public ISO, utility, agency, GIS, planning, and project records.",
  },
  {
    icon: FileSearch,
    label: "Evidence capture",
    detail: "Relevant facts pulled, dated, and tagged to a specific source.",
  },
  {
    icon: GitBranch,
    label: "Validation",
    detail: "Cross-check across sources. Conflicts flagged, not smoothed over.",
  },
  {
    icon: ListChecks,
    label: "Structured analysis",
    detail: "Organized into dimensions: grid, parcel, permitting, environment, project.",
  },
  {
    icon: UserCheck,
    label: "Human review",
    detail: "A person reviews the assembled evidence and the brief before delivery.",
  },
  {
    icon: FileText,
    label: "Preliminary intelligence brief",
    detail: "Findings, sources, unknowns, conflicts, and next-step questions.",
  },
];

export function Methodology() {
  return (
    <Section
      id="methodology"
      className="border-b border-line bg-muted py-20 md:py-24"
    >
      <SectionHeading
        eyebrow="Methodology"
        title="Evidence first. AI second."
        intro="AI can accelerate research. It should not become the source of truth. Geospatial Labs is built around identifiable source evidence, structured validation, and transparent unknowns."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Principles */}
        <div className="lg:col-span-5">
          <div className="surface-card flex h-full flex-col gap-4 p-6">
            <h3 className="text-lg font-semibold text-ink">
              How we keep AI in its place
            </h3>
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald" />
                <span>
                  <span className="font-medium text-ink">
                    AI organizes and analyzes.
                  </span>{" "}
                  Important findings remain traceable to their underlying
                  sources.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald" />
                <span>
                  <span className="font-medium text-ink">
                    Unknown information stays unknown.
                  </span>{" "}
                  We don’t manufacture certainty where the public record is
                  silent.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald" />
                <span>
                  <span className="font-medium text-ink">
                    Conflicts are surfaced, not averaged.
                  </span>{" "}
                  If two sources disagree, you see both.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald" />
                <span>
                  <span className="font-medium text-ink">
                    Source facts and analysis are distinguished.
                  </span>{" "}
                  What’s published vs. what Geospatial Labs infers is clearly
                  labeled.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald" />
                <span>
                  <span className="font-medium text-ink">
                    Preliminary, not final.
                  </span>{" "}
                  Final feasibility and approvals rest with the relevant
                  utilities, agencies, engineers, and authorities.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Flow */}
        <div className="lg:col-span-7">
          <div className="surface-quiet h-full p-6">
            <h3 className="text-base font-semibold text-ink">
              The evidence flow
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              From identified sources to a reviewed preliminary brief.
            </p>
            <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {flow.map((f, i) => {
                const Icon = f.icon;
                return (
                  <li
                    key={f.label}
                    className="group relative flex items-start gap-3 rounded-lg border border-line-soft bg-card p-4 transition-shadow hover:shadow-sm"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-emerald/10 text-emerald">
                      <Icon className="size-4.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-semibold text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm font-semibold text-ink">
                          {f.label}
                        </p>
                      </div>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                        {f.detail}
                      </p>
                    </div>
                    {i < flow.length - 1 && (i + 1) % 2 === 0 && (
                      <ArrowRight
                        className="absolute -top-3 left-1/2 size-4 -translate-x-1/2 rotate-90 text-emerald/50 sm:hidden"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                );
              })}
            </ol>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ArrowRight className="size-3.5 text-emerald" />
              <span>
                Each stage preserves the link between finding and source.
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
