"use client";

import { Section, SectionHeading } from "./section";
import { EvidenceCard } from "./evidence-card";
import { TopographicParcelBg } from "./topographic-bg";

const dimensions = [
  {
    category: "Grid & Interconnection",
    finding: "Published interconnection context, assembled",
    detail:
      "Queue position, nearby substations, transmission corridors, and published capacity signals — drawn from public ISO/utility filings where available.",
    sources: [
      { name: "ISO interconnection queue", refId: "SRC-01" },
      { name: "Utility public filings", refId: "SRC-02" },
    ],
    status: "deeper" as const,
  },
  {
    category: "Parcel & Jurisdiction",
    finding: "Parcel, zoning, and jurisdiction basics",
    detail:
      "APN, ownership, acreage, zoning designation, jurisdiction boundaries, and overlay districts compiled from county assessor and planning records.",
    sources: [
      { name: "County assessor", refId: "SRC-03" },
      { name: "County planning GIS", refId: "SRC-04" },
    ],
    status: "verified" as const,
  },
  {
    category: "Permitting & Planning",
    finding: "Permitting and planning signals",
    detail:
      "Conditional use, reclamation, site plan, and historical permit activity pulled from planning department portals where published online.",
    sources: [
      { name: "County planning portal", refId: "SRC-05" },
      { name: "State permitting portal", refId: "SRC-06" },
    ],
    status: "conflicting" as const,
  },
  {
    category: "Environmental / Siting",
    finding: "Environmental and siting considerations",
    detail:
      "Sensitive habitat overlays, fire severity zones, flood zones, agricultural designations, and known site constraints from mapped public datasets.",
    sources: [
      { name: "CDFW BIOS", refId: "SRC-07" },
      { name: "Cal-Adapt", refId: "SRC-08" },
    ],
    status: "verified" as const,
  },
  {
    category: "Project Activity",
    finding: "Relevant nearby project activity",
    detail:
      "Operating, queued, and recently withdrawn projects near the site — sourced only where a public record exists. No inferred or rumored projects.",
    sources: [
      { name: "CEC project database", refId: "SRC-09" },
      { name: "EIA-860M", refId: "SRC-10" },
    ],
    status: "verified" as const,
  },
  {
    category: "Source Trail & Unknowns",
    finding: "Source trail and unresolved questions",
    detail:
      "Every finding carries its source. Missing data is flagged as Unknown; conflicting data is flagged as Conflicting. Questions for next-stage diligence are listed.",
    sources: [
      { name: "Source register", refId: "SRC-REG" },
    ],
    status: "verified" as const,
  },
];

export function WhatItBrings() {
  return (
    <Section
      id="product"
      className="relative overflow-hidden border-b border-line bg-background py-20 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 text-ink" aria-hidden="true">
        <TopographicParcelBg variant="soft" />
      </div>

      <div className="relative">
        <SectionHeading
          eyebrow="What a site screen brings together"
          title="One preliminary screen, six evidence dimensions"
          intro="A site screen organizes the relevant evidence scattered across agencies, utilities, filings, and maps — into a single source-backed brief. Findings are traceable; unknowns are clear."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dimensions.map((d) => (
            <EvidenceCard key={d.category} {...d} />
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          <span className="font-medium text-ink">Scope note:</span> source
          availability varies by site and jurisdiction. The exact source set is
          determined during screening; findings that cannot be sourced remain
          Unknown rather than inferred.
        </p>
      </div>
    </Section>
  );
}
