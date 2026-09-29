"use client";

import * as React from "react";
import { Section, SectionHeading } from "./section";
import { Button } from "@/components/ui/button";
import { StatusPill, type FindingStatus } from "./status-pill";
import {
  ArrowRight,
  FileText,
  MapPin,
  Lock,
  ChevronRight,
} from "lucide-react";

const previewRows: {
  dimension: string;
  finding: string;
  status: FindingStatus;
  source: string;
}[] = [
  {
    dimension: "Candidate site",
    finding: "Parcel 142-08-37 · ~22 acres · unincorporated county",
    status: "verified",
    source: "SRC-03",
  },
  {
    dimension: "Utility / jurisdiction",
    finding: "IOU service territory · county planning jurisdiction",
    status: "verified",
    source: "SRC-04",
  },
  {
    dimension: "Interconnection",
    finding: "Substation ~0.4 mi east (approx.) — queue position not located",
    status: "deeper",
    source: "SRC-02",
  },
  {
    dimension: "Permitting",
    finding: "CUP open in county portal; state portal shows withdrawn",
    status: "conflicting",
    source: "SRC-05 / 06",
  },
  {
    dimension: "Environmental",
    finding: "High fire severity zone — additional review likely",
    status: "verified",
    source: "SRC-08",
  },
  {
    dimension: "Project activity",
    finding: "Operational 50 MW BESS ~1.4 mi east (2023 COD)",
    status: "verified",
    source: "SRC-11",
  },
];

export function SamplePreview({ onOpen }: { onOpen: () => void }) {
  return (
    <Section
      id="sample-report-preview"
      className="relative overflow-hidden border-b border-line bg-background py-20 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 text-ink opacity-60">
        <div className="dot-bg absolute inset-0 mask-fade-b" />
      </div>

      <div className="relative">
        <SectionHeading
          eyebrow="Sample report preview"
          title="See what a paid preliminary site screen looks like"
          intro="This is an illustrative sample built on demo data — not a real customer, site, or result. It shows the structure and evidence-handling that real source-backed briefs follow."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Report mock */}
          <div className="lg:col-span-7">
            <article className="surface-card overflow-hidden">
              <header className="flex items-center justify-between gap-3 border-b border-line bg-muted/40 px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-md bg-emerald/12 text-emerald">
                    <FileText className="size-4" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      Preliminary Site Intelligence Brief
                    </p>
                    <p className="text-sm font-semibold text-ink">
                      Illustrative sample · California BESS
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-amber/30 bg-amber/8 px-2 py-0.5 text-[11px] font-medium text-amber">
                  <Lock className="size-3" />
                  DEMO DATA
                </span>
              </header>

              <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
                <div className="flex items-center gap-2 text-sm text-ink">
                  <MapPin className="size-3.5 text-emerald" />
                  <span className="font-medium">Candidate Site · Parcel 142-08-37</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  34.9532°N, 118.1234°W
                </span>
              </div>

              <div className="overflow-x-auto scroll-elegant -mx-1 px-1">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-line text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                      <th className="px-5 py-2.5 font-medium">Dimension</th>
                      <th className="px-5 py-2.5 font-medium">Finding</th>
                      <th className="px-5 py-2.5 font-medium">Status</th>
                      <th className="px-5 py-2.5 font-medium">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-soft">
                    {previewRows.map((row) => (
                      <tr key={row.dimension} className="hover:bg-muted/40">
                        <td className="px-5 py-3 align-top font-medium text-ink">
                          {row.dimension}
                        </td>
                        <td className="px-5 py-3 align-top text-muted-foreground">
                          {row.finding}
                        </td>
                        <td className="px-5 py-3 align-top">
                          <StatusPill status={row.status} />
                        </td>
                        <td className="px-5 py-3 align-top font-mono text-xs text-ink-soft">
                          {row.source}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile swipe hint */}
              <div className="-mt-1 flex items-center justify-center gap-1.5 border-t border-line bg-muted/40 px-5 py-1.5 text-[11px] text-muted-foreground sm:hidden">
                <span className="size-1.5 rounded-full bg-emerald/50" />
                Swipe to view all columns →
              </div>

              <footer className="flex items-center justify-between border-t border-line bg-muted/40 px-5 py-3 text-xs text-muted-foreground">
                <span>6 evidence cards · 14 sources · 4 unknowns · 1 conflict</span>
                <button
                  type="button"
                  onClick={onOpen}
                  className="inline-flex items-center gap-1 font-medium text-emerald hover:text-emerald-soft"
                >
                  Open full brief <ArrowRight className="size-3" />
                </button>
              </footer>
            </article>
          </div>

          {/* Side: what you get + CTA */}
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col gap-5">
              <div className="surface-quiet p-5">
                <h3 className="text-base font-semibold text-ink">
                  What a full brief includes
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  {[
                    "Executive summary",
                    "Candidate site overview",
                    "Project / use assumptions",
                    "Utility & jurisdiction context",
                    "Published grid / interconnection context",
                    "Parcel / site context",
                    "Permitting / planning context",
                    "Environmental / siting context",
                    "Relevant project signals",
                    "Findings table (Verified / Unknown / Conflicting / Deeper)",
                    "Source register",
                    "Questions for next-stage diligence",
                    "Scope & limitations statement",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <ChevronRight className="mt-0.5 size-4 shrink-0 text-emerald" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="surface-card flex flex-1 flex-col justify-between gap-4 p-5">
                <div>
                  <p className="text-sm font-medium text-ink">
                    The full sample brief shows every finding next to its
                    source — including what couldn’t be located.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    No real customers, no fabricated capacity numbers, no
                    testimonials. Just the structure your paid screen would
                    follow.
                  </p>
                </div>
                <Button
                  onClick={onOpen}
                  className="gap-2 bg-emerald text-emerald-foreground hover:bg-emerald-soft"
                >
                  View full sample report
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
