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
import { SampleSiteMapPreview } from "./sample-site-map-preview";

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
  const [activeSiteIdx, setActiveSiteIdx] = React.useState(0);

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
          eyebrow="Deliverable Architecture & Live GIS Preview"
          title="What a preliminary site intelligence brief covers"
          intro="Every brief is manually prepared for your candidate site. Rather than generating synthetic certainty, the deliverable organizes verifiable public records into nine clear diligence sections — with high-resolution aerials, CAL FIRE hazard overlays, and transmission tie-in paths."
        />

        {/* Live Interactive Mapbox Deliverable Demo Showcase */}
        <div className="mt-10 mb-14 rounded-2xl border border-line bg-card/70 p-4 sm:p-6 shadow-sm">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald/25 bg-emerald/10 px-2.5 py-0.5 text-xs font-mono font-medium text-emerald">
                <span className="size-1.5 rounded-full bg-emerald" />
                INTERACTIVE MAPBOX DELIVERABLE DEMO
              </div>
              <h3 className="mt-1 font-serif text-lg sm:text-xl font-medium text-ink">
                Inspect real candidate parcels, fire hazard zones, and grid tie-ins
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Search any California address or select a sample APN below to test the spatial evidence viewer your team receives in each brief.
              </p>
            </div>
          </div>

          <SampleSiteMapPreview
            activeIndex={activeSiteIdx}
            onSelectIndex={setActiveSiteIdx}
            className="h-[460px] sm:h-[540px] lg:h-[580px]"
          />
        </div>

        {/* 9 Deliverable Sections Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {briefSections.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.number}
                className="surface-card group flex flex-col justify-between p-5 sm:p-6 transition-all duration-200 hover:border-emerald/40 hover:shadow-sm min-w-0"
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
                  <h3 className="mt-3 text-base font-semibold text-ink break-words">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-words">
                    {s.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Deliverable Scope & CTA Bar */}
        <div className="mt-8 sm:mt-10 rounded-xl border border-line bg-card p-4 sm:p-8 min-w-0">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl min-w-0">
              <h4 className="text-base font-semibold text-ink break-words">
                Clear diligence handoff, zero fabricated scores
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground break-words">
                We do not invent customer case studies or display mock sites with
                fake capacity numbers. The brief gives your team a source-backed
                summary of what public records show — and equips you with the exact
                questions to ask formal study engineers and local planning officials.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center shrink-0 w-full sm:w-auto">
              <Button
                asChild
                className="w-full sm:w-auto gap-2 bg-emerald text-emerald-foreground hover:bg-emerald-soft cursor-pointer text-sm sm:text-base h-11 sm:h-12"
              >
                <Link href="/request">
                  Reserve a Paid Site Screen
                  <ArrowRight className="size-4 shrink-0" />
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full sm:w-auto border-line bg-card hover:bg-muted cursor-pointer text-sm sm:text-base h-11 sm:h-12"
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
