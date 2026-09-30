"use client";

import * as React from "react";
import Link from "next/link";
import { Section, SectionHeading } from "./section";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FileText,
  MapPin,
  Layers,
  Compass,
  AlertTriangle,
  Leaf,
  Activity,
  Tags,
  HelpCircle,
  Stethoscope,
  CheckCircle2,
} from "lucide-react";

const briefSections = [
  {
    number: "01",
    icon: MapPin,
    title: "Candidate-Site Overview",
    description:
      "Synthesizes candidate location details, assessor parcel identification, general plan designations, and primary developer assumptions for the evaluation.",
  },
  {
    number: "02",
    icon: Layers,
    title: "Grid & Interconnection Context",
    description:
      "Reviews published utility substation proximity, transmission line corridors, known queue filings in the cluster, and published hosting capacity signals.",
  },
  {
    number: "03",
    icon: Compass,
    title: "Parcel & Jurisdiction Context",
    description:
      "Documents cadastral parcel boundaries, local municipal or unincorporated county jurisdiction, underlying zoning classifications, and overlay districts.",
  },
  {
    number: "04",
    icon: AlertTriangle,
    title: "Permitting & Planning Signals",
    description:
      "Searches county and municipal planning repositories for conditional use permit (CUP) requirements, hearing records, and discretionary approvals.",
  },
  {
    number: "05",
    icon: Leaf,
    title: "Environmental & Siting Considerations",
    description:
      "Reviews state environmental databases, mapped flood hazard layers (FEMA), CAL FIRE severity zones, and identified biological or wetland buffer intersections.",
  },
  {
    number: "06",
    icon: Activity,
    title: "Relevant Project Activity",
    description:
      "Catalogs documented operating, queued, or withdrawn energy storage and generation projects within the immediate cluster or substation catchment area.",
  },
  {
    number: "07",
    icon: Tags,
    title: "Evidence Classification Framework",
    description:
      "Every piece of information is explicitly categorized into Verified by Public Record, Unknown in Available Data, Conflicting Across Agencies, or Deeper Diligence Needed.",
  },
  {
    number: "08",
    icon: FileText,
    title: "Identified Source References",
    description:
      "Compiles a complete bibliography of statutory records, agency portals, GIS layers, and filings used in the brief with timestamps and publication dates.",
  },
  {
    number: "09",
    icon: Stethoscope,
    title: "Questions for Next-Stage Diligence",
    description:
      "Translates open questions and flagged conflicts into actionable, specific inquiries for your electrical engineers, legal counsel, and environmental consultants.",
  },
];

export function SamplePreview() {
  return (
    <Section
      id="sample-report-preview"
      className="relative overflow-hidden border-b border-line bg-background py-20 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 text-ink opacity-40">
        <div className="dot-bg absolute inset-0 mask-fade-b" />
      </div>

      <div className="relative">
        <SectionHeading
          eyebrow="Deliverable Architecture"
          title="What a preliminary site intelligence brief covers"
          intro="Every brief is manually prepared for your candidate site. Rather than generating synthetic certainty, the deliverable organizes verifiable public records into nine clear diligence sections."
        />

        {/* 9 Deliverable Sections Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {briefSections.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.number}
                className="surface-card group flex flex-col justify-between p-6 transition-all duration-200 hover:border-emerald/40 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-emerald">
                      Section {s.number}
                    </span>
                    <div className="flex size-8 items-center justify-center rounded-md border border-line-soft bg-muted/40 text-muted-foreground group-hover:text-emerald group-hover:bg-emerald/10 transition-colors">
                      <Icon className="size-4" />
                    </div>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Deliverable Scope & CTA Bar */}
        <div className="mt-10 rounded-xl border border-line bg-card p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h4 className="text-base font-semibold text-ink">
                Clear diligence handoff, zero fabricated scores
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                We do not invent customer case studies or display mock sites with
                fake capacity numbers. The brief gives your team a source-backed
                summary of what public records show — and equips you with the exact
                questions to ask formal study engineers and local planning officials.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center shrink-0">
              <Button
                asChild
                className="gap-2 bg-emerald text-emerald-foreground hover:bg-emerald-soft cursor-pointer"
              >
                <Link href="/request">
                  Reserve a Paid Site Screen
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-line bg-card hover:bg-muted cursor-pointer"
              >
                <Link href="/sample-report">
                  View Detailed Brief Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
