"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  FileText,
  MapPin,
  Layers,
  Compass,
  AlertTriangle,
  Leaf,
  Activity,
  CheckCircle2,
  HelpCircle,
  Stethoscope,
  Info,
  Scale,
  ListChecks,
} from "lucide-react";
import { TopographicParcelBg } from "./topographic-bg";

export function SampleReportView() {
  const briefSections = [
    {
      id: "candidate-overview",
      num: "01",
      icon: MapPin,
      title: "Candidate-Site Overview",
      focus: "Baseline location facts and developer evaluation assumptions",
      whatItCovers: [
        "Identified county, municipality, or unincorporated jurisdiction boundary.",
        "Candidate parcel identification (APN or geographic bounding box).",
        "Estimated gross acreage and land use designation in county general plan.",
        "Developer project assumptions: target capacity, duration, and planned technology type.",
      ],
      valueForDiligence:
        "Establishes a single, unambiguous baseline for all subsequent agency and utility inquiries, ensuring teams evaluate identical parcel boundaries.",
    },
    {
      id: "grid-interconnection",
      num: "02",
      icon: Layers,
      title: "Grid & Interconnection Context",
      focus: "Published utility filings, nearby substations, and regional queue context",
      whatItCovers: [
        "Proximity and published nameplate voltage of nearby substations.",
        "Published transmission corridors and line voltages adjacent to the parcel.",
        "Active, queued, and withdrawn interconnection cluster filings in the local substation area.",
        "Published utility hosting capacity (e.g. ICA/RAM portals) where publicly accessible.",
      ],
      valueForDiligence:
        "Identifies whether published records indicate immediate queue congestion or line proximity before spending on formal interconnection study deposits.",
    },
    {
      id: "parcel-jurisdiction",
      num: "03",
      icon: Compass,
      title: "Parcel & Jurisdiction Context",
      focus: "Cadastral data, underlying zoning, and local planning authority",
      whatItCovers: [
        "County Assessor cadastral parcel boundaries and tax roll status.",
        "Local zoning classification (e.g. Heavy Industrial, Commercial, Agricultural).",
        "Applicable municipal or county zoning code definitions for battery energy storage.",
        "Special overlay districts (airport influence zones, military airspace, specific plan areas).",
      ],
      valueForDiligence:
        "Reveals whether storage is an allowable by-right use, requires a Conditional Use Permit (CUP), or faces zoning prohibitions.",
    },
    {
      id: "permitting-planning",
      num: "04",
      icon: AlertTriangle,
      title: "Permitting & Planning Signals",
      focus: "Discretionary permit history, planning commission records, and local ordinances",
      whatItCovers: [
        "Published planning commission agendas and conditional use permit history on the parcel.",
        "Discretionary permit requirements established by local ordinance for utility-scale batteries.",
        "Historical CEQA/NEPA filings on the parcel or immediately adjacent land.",
        "Local battery safety and setback ordinances adopted by the municipal jurisdiction.",
      ],
      valueForDiligence:
        "Surfaces local discretionary hurdles and entitlement history early, avoiding sites with prior permit revocations or contentious public hearings.",
    },
    {
      id: "environmental-siting",
      num: "05",
      icon: Leaf,
      title: "Environmental & Siting Considerations",
      focus: "Public statutory environmental overlays, hazard zones, and biological layers",
      whatItCovers: [
        "CAL FIRE Fire Hazard Severity Zone (FHSZ) classifications.",
        "FEMA Flood Insurance Rate Map (FIRM) 100-year and 500-year flood zone designations.",
        "State biological diversity database records (e.g. CDFW BIOS) within the parcel buffer.",
        "Wetland and waterway inventories (National Wetlands Inventory / USGS National Hydrography).",
      ],
      valueForDiligence:
        "Flags potential CEQA environmental study triggers, high fire mitigation requirements, or wetland avoidance buffers before land commitments.",
    },
    {
      id: "project-activity",
      num: "06",
      icon: Activity,
      title: "Relevant Nearby Project Activity",
      focus: "Documented operating, queued, or retired clean energy facilities",
      whatItCovers: [
        "Operating utility-scale battery energy storage systems within the substation catchment area.",
        "Published energy commission and regulatory filings for nearby storage projects.",
        "Recently withdrawn or canceled projects that indicate local grid or permitting headwinds.",
        "Published commercial operation dates (COD) for comparable operational assets.",
      ],
      valueForDiligence:
        "Provides commercial context on whether neighboring developers have successfully navigated local entitlements and achieved interconnection.",
    },
    {
      id: "evidence-framework",
      num: "07",
      icon: CheckCircle2,
      title: "4-Part Evidence Taxonomy",
      focus: "Rigorous classification separating fact from inference and uncertainty",
      whatItCovers: [
        "Verified by Public Record: supported by authoritative timestamped filings.",
        "Documented Unknown: public records are silent or unindexed; explicitly labeled rather than guessed.",
        "Agency Conflict: discrepancy between two official repositories surfaced without smoothing.",
        "Deeper Diligence Needed: published signal suggests an issue requiring specialist inspection.",
      ],
      valueForDiligence:
        "Eliminates synthetic certainty. Developers know exactly what is backed by citation versus what requires investigation.",
    },
    {
      id: "source-references",
      num: "08",
      icon: FileText,
      title: "Identified Source References",
      focus: "Comprehensive, traceable statutory bibliography",
      whatItCovers: [
        "Exact document titles, docket numbers, and agency issuing authorities.",
        "Public access URLs, portals, and GIS data layer endpoints.",
        "Publication, effective, and extraction timestamps.",
        "Excerpts and verbatim citations supporting critical findings.",
      ],
      valueForDiligence:
        "Allows internal diligence teams and outside counsel to immediately verify and inspect the primary documents without re-doing research.",
    },
    {
      id: "diligence-handoff",
      num: "09",
      icon: Stethoscope,
      title: "Questions for Next-Stage Diligence",
      focus: "Targeted diligence questions tailored for specialist review",
      whatItCovers: [
        "Specific inquiries for electrical and interconnection engineers (queue cluster status, hosting capacity).",
        "Targeted questions for municipal land-use and CEQA counsel (ordinance interpretation, zoning variance).",
        "Action items for environmental consultants (targeted species surveys, wetland delineations).",
        "Inquiries for utility distribution and transmission planning representatives.",
      ],
      valueForDiligence:
        "Accelerates formal study kickoffs by providing your technical and legal specialists with high-value, pre-structured inquiry lists.",
    },
  ];

  return (
    <div className="bg-background">
      {/* Top return bar */}
      <div className="sticky top-16 z-30 border-b border-line bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-3 px-5 py-3 sm:px-6 lg:px-10 xl:px-16">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="gap-2 text-muted-foreground hover:text-ink cursor-pointer"
          >
            <Link href="/">
              <ArrowLeft className="size-4" />
              Back to overview
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5 text-emerald" />
              Manually prepared · Source-backed
            </span>
            <Button
              size="sm"
              asChild
              className="gap-2 bg-emerald text-emerald-foreground hover:bg-emerald-soft cursor-pointer"
            >
              <Link href="/request">
                Request a Site Screen
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Header Band */}
      <header className="relative overflow-hidden border-b border-line bg-background">
        <div className="absolute inset-0 text-ink" aria-hidden="true">
          <TopographicParcelBg variant="soft" />
        </div>
        <div className="relative mx-auto w-full max-w-[1600px] px-5 py-12 sm:px-6 lg:px-10 xl:px-16 lg:py-16">
          <span className="eyebrow inline-flex items-center gap-2 text-emerald">
            <span className="h-px w-5 bg-emerald/50" />
            Deliverable Guide & Scope
          </span>
          <h1 className="mt-3 display-md text-ink text-balance">
            What a preliminary site intelligence brief covers.
          </h1>
          <p className="mt-4 max-w-3xl text-[1.0625rem] leading-relaxed text-muted-foreground text-pretty">
            When you engage Geospatial Labs for a candidate California BESS site,
            we prepare a structured intelligence brief drawn from published,
            verifiable public records. Here is the exact nine-part framework used
            to organize findings, unknowns, and next-stage diligence.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-[1600px] px-5 py-12 sm:px-6 lg:px-10 xl:px-16">
        {/* 4-Part Evidence Taxonomy Callout */}
        <section className="surface-card mb-12 overflow-hidden border border-line p-6 sm:p-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald">
              Core Diligence Rule
            </span>
            <h2 className="mt-1 text-xl font-bold text-ink">
              The 4-Part Evidence Classification Framework
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Every finding in a Geospatial Labs brief is strictly tagged with one of four
              evidentiary statuses. We do not blend inferred commentary with statutory fact.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-emerald/30 bg-emerald/5 p-4">
              <div className="flex items-center gap-2 text-emerald font-semibold text-sm">
                <CheckCircle2 className="size-4" />
                Verified
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Documented in an identified public record (assessor roll, utility filing, published ordinance) with citation.
              </p>
            </div>

            <div className="rounded-lg border border-line bg-muted/40 p-4">
              <div className="flex items-center gap-2 text-muted-foreground font-semibold text-sm">
                <HelpCircle className="size-4" />
                Unknown
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Public repositories do not disclose this data point. Stays unknown rather than manufactured into certainty.
              </p>
            </div>

            <div className="rounded-lg border border-amber/30 bg-amber/5 p-4">
              <div className="flex items-center gap-2 text-amber font-semibold text-sm">
                <AlertTriangle className="size-4" />
                Conflicting
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Two authoritative agencies show differing records (e.g. county portal vs state clearinghouse). Surfaced side-by-side.
              </p>
            </div>

            <div className="rounded-lg border border-azure/30 bg-azure/5 p-4">
              <div className="flex items-center gap-2 text-azure font-semibold text-sm">
                <Info className="size-4" />
                Deeper Diligence
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                A public signal indicates potential risk that warrants formal investigation by engineers or legal counsel.
              </p>
            </div>
          </div>
        </section>

        {/* 9 Detailed Sections */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-ink">
              The 9 Deliverable Sections
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              How public records are assembled and structured in every site intelligence brief.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {briefSections.map((sec) => {
              const Icon = sec.icon;
              return (
                <article
                  key={sec.id}
                  className="surface-card flex flex-col justify-between p-6 border border-line hover:border-emerald/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-emerald">
                        SECTION {sec.num}
                      </span>
                      <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <Icon className="size-4" />
                      </div>
                    </div>

                    <h3 className="mt-3 text-lg font-semibold text-ink">
                      {sec.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-emerald">
                      {sec.focus}
                    </p>

                    <div className="mt-4 border-t border-line-soft pt-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        What is synthesized:
                      </p>
                      <ul className="space-y-1.5 text-xs text-muted-foreground leading-relaxed">
                        {sec.whatItCovers.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1 size-1 shrink-0 rounded-full bg-emerald" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 rounded border border-line-soft bg-muted/40 p-3">
                    <p className="text-[11px] text-ink-soft leading-relaxed">
                      <span className="font-semibold text-ink">Diligence value: </span>
                      {sec.valueForDiligence}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Clear Boundaries & Legal Notice */}
        <section className="mt-16 rounded-xl border border-line bg-muted/50 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <Scale className="size-6 shrink-0 text-amber mt-1" />
            <div>
              <h3 className="text-base font-semibold text-ink">
                Clear Scope & Diligence Boundaries
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Geospatial Labs provides preliminary research and decision intelligence
                designed to organize public information before deeper expenditure.
                Geospatial Labs does not provide final engineering designs, guarantee
                interconnection capacity or queue feasibility, make utility determinations,
                render legal opinions, or issue environmental clearance.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Final project feasibility, cost, capacity, and approvals remain strictly
                within the domain of relevant electric utilities, regional ISOs,
                municipal agencies, and licensed professional engineers.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-xl border border-emerald/30 bg-emerald/5 p-6 sm:flex-row sm:p-8">
          <div>
            <h3 className="text-lg font-semibold text-ink">
              Ready to evaluate a California BESS site?
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Submit your candidate location and evaluation question. We will review
              scope and confirm details before any research begins.
            </p>
          </div>
          <Button
            size="lg"
            asChild
            className="gap-2 bg-emerald text-emerald-foreground hover:bg-emerald-soft shrink-0 cursor-pointer"
          >
            <Link href="/request">
              Request a Site Screen
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
