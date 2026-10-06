"use client";

import { Section, SectionHeading } from "./section";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Provide the site",
    detail:
      "Send us a candidate California BESS location — address, APN, parcel, or coordinates. Tell us what you’re evaluating.",
    tag: "Takes minutes",
  },
  {
    n: "02",
    title: "We gather and reconcile evidence",
    detail:
      "GeoSpatia Labs pulls relevant public-source evidence across grid, parcel, permitting, environmental, and project layers — and reconciles it.",
    tag: "Identified sources only",
  },
  {
    n: "03",
    title: "Receive a structured brief",
    detail:
      "You get a preliminary intelligence brief: findings, sources, unknowns, conflicts, and next-step questions — clearly separated from analysis.",
    tag: "Structured + traceable",
  },
  {
    n: "04",
    title: "Decide where to go deeper",
    detail:
      "Use the brief to direct deeper engineering, interconnection, legal, environmental, or permitting work where it’s actually warranted.",
    tag: "Focus your diligence",
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      className="border-b border-line bg-muted py-20 md:py-24"
    >
      <SectionHeading
        eyebrow="How it works"
        title="From candidate site to organized evidence"
        intro="A focused four-step workflow. We handle the research friction so your team can spend time on the decisions that matter."
      />

      <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li
            key={s.n}
            className="relative flex flex-col gap-3 bg-card p-5 sm:p-6 min-w-0"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-medium text-emerald">
                {s.n}
              </span>
              <span className="rounded-full border border-line-soft bg-muted/60 px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.1em] text-ink-soft">
                {s.tag}
              </span>
            </div>
            <h3 className="text-lg font-semibold leading-snug text-ink break-words">
              {s.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground break-words">
              {s.detail}
            </p>
            {i < steps.length - 1 && (
              <ArrowRight
                className="absolute -right-3 top-1/2 hidden size-5 -translate-y-1/2 rounded-full border border-line bg-card text-emerald lg:block"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
