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
  ExternalLink,
  BookOpen,
  Calendar,
} from "lucide-react";
import { TopographicParcelBg } from "./topographic-bg";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export function SampleReportView() {
  const [activeTab, setActiveTab] = React.useState<"guide" | "example">("example");

  React.useEffect(() => {
    trackEvent("sample_brief_view");
  }, []);

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

          {/* View Mode Switcher */}
          <div className="inline-flex items-center rounded-lg border border-line bg-muted/50 p-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("example")}
              className={cn(
                "rounded-md px-3 py-1.5 font-medium transition-all cursor-pointer flex items-center gap-1.5",
                activeTab === "example"
                  ? "bg-card text-emerald shadow-xs border border-line-soft font-semibold"
                  : "text-muted-foreground hover:text-ink"
              )}
            >
              <BookOpen className="size-3.5" />
              <span>Public-Record Worked Example</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("guide")}
              className={cn(
                "rounded-md px-3 py-1.5 font-medium transition-all cursor-pointer flex items-center gap-1.5",
                activeTab === "guide"
                  ? "bg-card text-emerald shadow-xs border border-line-soft font-semibold"
                  : "text-muted-foreground hover:text-ink"
              )}
            >
              <ListChecks className="size-3.5" />
              <span>Deliverable Guide (9 Sections)</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              size="sm"
              asChild
              className="gap-2 bg-emerald text-emerald-foreground hover:bg-emerald-soft cursor-pointer text-xs"
            >
              <Link href="/request">
                Request a Site Screen
                <ArrowRight className="size-3.5" />
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
        <div className="relative mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-6 lg:px-10 xl:px-16 lg:py-14">
          <span className="eyebrow inline-flex items-center gap-2 text-emerald">
            <span className="h-px w-5 bg-emerald/50" />
            {activeTab === "example"
              ? "Authoritative Worked Demonstration"
              : "Deliverable Guide & Structure"}
          </span>
          <h1 className="mt-3 display-md text-ink text-balance">
            {activeTab === "example"
              ? "Worked Example: Gates 230kV Hub Preliminary Brief"
              : "What a preliminary site intelligence brief covers."}
          </h1>
          <p className="mt-3 max-w-3xl text-[1.0625rem] leading-relaxed text-muted-foreground text-pretty">
            {activeTab === "example"
              ? "A complete, evidence-backed demonstration of our 9-part brief for a real California energy node. Every material finding is tied directly to public statutory sources, with explicit unknowns, agency conflicts, and next-stage diligence steps."
              : "Explore the exact nine-part framework and four-part evidence taxonomy applied by GeoSpatia Labs when screening candidate California BESS sites before major engineering spend."}
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-6 lg:px-10 xl:px-16">
        {/* ========================================================================= */}
        {/* TAB 1: WORKED EXAMPLE (GATES SUBSTATION DEMONSTRATION BRIEF)             */}
        {/* ========================================================================= */}
        {activeTab === "example" && (
          <div className="space-y-10">
            {/* Prominent Demonstration & Scope Notice */}
            <div className="rounded-xl border border-amber/40 bg-amber/5 p-5 sm:p-6 text-ink">
              <div className="flex items-start gap-3">
                <AlertTriangle className="size-5 text-amber shrink-0 mt-0.5" />
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <p className="font-bold text-ink uppercase tracking-wider text-xs text-amber">
                    Public-Record Demonstration Brief — Not a Client Engagement
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    This sample report is an authoritative, public-record demonstration prepared by GeoSpatia Labs to illustrate deliverable structure, factual sourcing, and our 4-part evidence classification. It was compiled strictly from publicly accessible California agency records and does not represent a past or active developer engagement.
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Notice: GeoSpatia Labs provides preliminary decision intelligence. We do not provide final engineering designs, guarantee interconnection capacity or queue feasibility, make utility determinations, render legal opinions, or issue environmental clearance.
                  </p>
                </div>
              </div>
            </div>

            {/* Candidate Metadata Summary Card */}
            <section className="surface-card border border-line p-6 rounded-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald">
                    Demonstration Candidate Site
                  </span>
                  <h2 className="text-xl font-bold text-ink mt-0.5">
                    Gates 230kV / 500kV Substation Vicinity (Fresno County)
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Unincorporated Fresno County, California · Approx. 36.142° N, 120.088° W
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md border border-line bg-muted/60 px-2.5 py-1 text-xs font-medium text-ink">
                    <Layers className="size-3.5 text-emerald" />
                    Target: 150 MW / 600 MWh Standalone BESS
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md border border-line bg-muted/60 px-2.5 py-1 text-xs font-medium text-ink">
                    <Calendar className="size-3.5 text-muted-foreground" />
                    Assembled: September 2026
                  </span>
                </div>
              </div>

              {/* Distinguishing Facts From Analysis */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-line-soft bg-muted/30 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-emerald" />
                    Documented Statutory Facts
                  </h4>
                  <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                    <li>• Jurisdiction: Unincorporated Fresno County.</li>
                    <li>• Zoning: AE-20 (Exclusive Agricultural, 20-acre minimum).</li>
                    <li>• Substation: PG&E Gates Substation operating 230kV & 500kV buses.</li>
                    <li>• Fire Zone: CAL FIRE Moderate Fire Hazard Severity Zone (LRA).</li>
                    <li>• Flood Zone: FEMA FIRM Zone X (minimal flood hazard area).</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-line-soft bg-muted/30 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-1.5">
                    <Info className="size-4 text-azure" />
                    GeoSpatia Labs Preliminary Synthesis
                  </h4>
                  <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                    <li>• Grid: Major bulk power node, but local cluster queue is heavily congested.</li>
                    <li>• Entitlement: Storage requires a County Conditional Use Permit (CUP).</li>
                    <li>• Land Risk: Williamson Act agricultural preserve contract requires non-renewal check.</li>
                    <li>• Action: Do not purchase land option before verifying deliverability allocation.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* The 9 Sourced Sections with 4-Part Evidence Classification */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-ink">
                Evidence-Backed Section Findings & Citations
              </h3>

              {/* Section 01 */}
              <article className="surface-card border border-line rounded-xl p-6">
                <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald">SECTION 01</span>
                    <h4 className="text-base font-semibold text-ink">Candidate-Site Overview & Geographic Context</h4>
                  </div>
                  <span className="rounded-full bg-emerald/10 border border-emerald/30 px-2.5 py-0.5 text-[11px] font-semibold text-emerald">
                    VERIFIED
                  </span>
                </div>
                <div className="mt-4 space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-ink">Finding:</strong> The candidate parcel area is located in unincorporated Fresno County, approximately 4.5 miles southwest of the City of Huron and immediately adjacent to the PG&E Gates Substation. Terrain is flat Central Valley agricultural lowland (elevation ~380 ft ASL).
                  </p>
                  <p>
                    <strong className="text-ink">Preserved Unknown:</strong> Specific landowner willingness, private ground lease rates, and subsurface mineral/water rights are non-public and remain <span className="font-semibold text-ink">UNKNOWN</span> until direct developer-owner discussion.
                  </p>
                  <div className="mt-3 rounded border border-line-soft bg-muted/40 p-3 text-xs">
                    <p className="font-semibold text-ink">Statutory Source References:</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      • USGS 7.5-Minute Quadrangle (Huron, CA); Fresno County General Plan Land Use Element, Map LU-1.
                    </p>
                  </div>
                </div>
              </article>

              {/* Section 02 */}
              <article className="surface-card border border-line rounded-xl p-6">
                <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald">SECTION 02</span>
                    <h4 className="text-base font-semibold text-ink">Grid & Interconnection Context</h4>
                  </div>
                  <span className="rounded-full bg-azure/10 border border-azure/30 px-2.5 py-0.5 text-[11px] font-semibold text-azure">
                    DEEPER DILIGENCE
                  </span>
                </div>
                <div className="mt-4 space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-ink">Finding:</strong> Gates Substation is an existing major bulk transmission substation in the PG&E Fresno transmission area, terminating both 500 kV circuits (Path 15 corridor) and 230 kV regional transmission lines.
                  </p>
                  <p>
                    <strong className="text-ink">Interconnection Queue Status:</strong> The CAISO public interconnection queue records multiple active, queued, and operational battery storage projects at or near the Gates 230 kV and 500 kV buses (including Queue Positions #1346, #1534, and Cluster 14/15 requests).
                  </p>
                  <p>
                    <strong className="text-ink">Diligence Warning:</strong> Proximity to high-voltage transmission does not guarantee available interconnection capacity. CAISO Cluster Deliverability Studies indicate significant local transmission network upgrades are triggered by Cluster 14/15 queue volumes. Specific available deliverability requires formal CAISO Cluster study participation.
                  </p>
                  <div className="mt-3 rounded border border-line-soft bg-muted/40 p-3 text-xs">
                    <p className="font-semibold text-ink">Statutory Source References:</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      • California ISO (CAISO) Public Queue (Cluster Window Data, updated monthly, accessed September 2026); CAISO 2023-2024 Transmission Plan, Section 3.4.3 (Fresno Area Upgrades).
                    </p>
                  </div>
                </div>
              </article>

              {/* Section 03 */}
              <article className="surface-card border border-line rounded-xl p-6">
                <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald">SECTION 03</span>
                    <h4 className="text-base font-semibold text-ink">Parcel, Cadastral & Zoning Context</h4>
                  </div>
                  <span className="rounded-full bg-emerald/10 border border-emerald/30 px-2.5 py-0.5 text-[11px] font-semibold text-emerald">
                    VERIFIED
                  </span>
                </div>
                <div className="mt-4 space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-ink">Finding:</strong> The area is zoned <span className="font-semibold text-ink">AE-20 (Exclusive Agricultural District, 20-acre minimum parcel size)</span> under the Fresno County Zoning Ordinance. Electrical substations and major utility installations are permitted in the AE-20 district subject to obtaining an approved Conditional Use Permit (CUP).
                  </p>
                  <p>
                    <strong className="text-ink">Cadastral Boundary Note:</strong> County Assessor digital parcel GIS lines reflect cadastral tax boundaries and do not substitute for a licensed land boundary survey or recorded ALTA title policy.
                  </p>
                  <div className="mt-3 rounded border border-line-soft bg-muted/40 p-3 text-xs">
                    <p className="font-semibold text-ink">Statutory Source References:</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      • Fresno County Ordinance Code, Title 8 - Planning and Zoning, Chapter 816 "AE-20 Exclusive Agricultural District", Section 816.3 (Uses Permitted Subject to Conditional Use Permit); Fresno County Assessor Cadastral GIS Roll.
                    </p>
                  </div>
                </div>
              </article>

              {/* Section 04 */}
              <article className="surface-card border border-line rounded-xl p-6">
                <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald">SECTION 04</span>
                    <h4 className="text-base font-semibold text-ink">Permitting, Discretionary Approvals & CEQA Signals</h4>
                  </div>
                  <span className="rounded-full bg-azure/10 border border-azure/30 px-2.5 py-0.5 text-[11px] font-semibold text-azure">
                    DEEPER DILIGENCE
                  </span>
                </div>
                <div className="mt-4 space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-ink">Finding:</strong> Standalone battery storage projects in Fresno County AE-20 zoning require a discretionary Conditional Use Permit (CUP) reviewed by the Fresno County Planning Commission. Environmental review under the California Environmental Quality Act (CEQA) typically proceeds via an Initial Study leading to a Mitigated Negative Declaration (MND).
                  </p>
                  <p>
                    <strong className="text-ink">Key Permitting Condition:</strong> Fresno County requires site plan approval with dedicated defensible setbacks, hazardous materials business plan (HMBP) approval through Fresno County Environmental Health Division, and coordination with Fresno County Fire Protection District.
                  </p>
                  <div className="mt-3 rounded border border-line-soft bg-muted/40 p-3 text-xs">
                    <p className="font-semibold text-ink">Statutory Source References:</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      • Fresno County Planning Commission Entitlement Guidelines; California Environmental Quality Act (CEQA) Guidelines (14 CCR § 15000 et seq.).
                    </p>
                  </div>
                </div>
              </article>

              {/* Section 05 */}
              <article className="surface-card border border-line rounded-xl p-6">
                <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald">SECTION 05</span>
                    <h4 className="text-base font-semibold text-ink">Environmental Overlays, Fire & Flood Hazards</h4>
                  </div>
                  <span className="rounded-full bg-amber/10 border border-amber/30 px-2.5 py-0.5 text-[11px] font-semibold text-amber">
                    CONFLICTING / DEEPER DILIGENCE
                  </span>
                </div>
                <div className="mt-4 space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-ink">Fire Hazard:</strong> Classified as Moderate Fire Hazard Severity Zone in the Local Responsibility Area (LRA) by CAL FIRE. It is not situated in a Very High Fire Hazard Severity Zone (VHFHSZ).
                  </p>
                  <p>
                    <strong className="text-ink">Flood Risk:</strong> FEMA FIRM Panel 06019C2575H identifies the site as <span className="font-semibold text-ink">Zone X (Area of Minimal Flood Hazard)</span>, outside the 100-year and 500-year special flood hazard zones.
                  </p>
                  <p>
                    <strong className="text-ink">Agricultural Preserve (Williamson Act) Conflict:</strong> Many parcels surrounding Gates Substation are subject to California Land Conservation Act (Williamson Act) contracts. Converting active Williamson Act land to non-agricultural utility infrastructure requires either verification of a recorded Notice of Non-Renewal (which takes 9 years to complete) or approval of a contract cancellation by the Board of Supervisors under California Government Code § 51282. This is a critical diligence item.
                  </p>
                  <div className="mt-3 rounded border border-line-soft bg-muted/40 p-3 text-xs">
                    <p className="font-semibold text-ink">Statutory Source References:</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      • CAL FIRE Fire Hazard Severity Zone Viewer (PRC 4201-4204); FEMA Flood Insurance Rate Map Panel 06019C2575H; California Department of Conservation Division of Land Resource Protection (Williamson Act GIS Portal).
                    </p>
                  </div>
                </div>
              </article>

              {/* Section 06 */}
              <article className="surface-card border border-line rounded-xl p-6">
                <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald">SECTION 06</span>
                    <h4 className="text-base font-semibold text-ink">Relevant Nearby Project Activity</h4>
                  </div>
                  <span className="rounded-full bg-emerald/10 border border-emerald/30 px-2.5 py-0.5 text-[11px] font-semibold text-emerald">
                    VERIFIED
                  </span>
                </div>
                <div className="mt-4 space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-ink">Operational Comps:</strong> The Gates Energy Storage project (approx. 250 MW BESS) is operational nearby, confirming precedent for utility-scale battery storage approvals at this node. Large solar installations (e.g. Westlands Solar Park phases) operate to the north and east.
                  </p>
                  <p>
                    <strong className="text-ink">Commercial Implication:</strong> Precedent confirms local agency familiarization with battery energy storage technology, though cumulative environmental impacts (thermal runaway hazard review, local fire department capacity) receive heightened scrutiny.
                  </p>
                  <div className="mt-3 rounded border border-line-soft bg-muted/40 p-3 text-xs">
                    <p className="font-semibold text-ink">Statutory Source References:</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      • California Energy Commission (CEC) Energy Storage Database; CAISO Master Generating Capability Register.
                    </p>
                  </div>
                </div>
              </article>

              {/* Section 07 */}
              <article className="surface-card border border-line rounded-xl p-6">
                <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald">SECTION 07</span>
                    <h4 className="text-base font-semibold text-ink">4-Part Evidence Taxonomy Breakdown</h4>
                  </div>
                  <span className="rounded-full bg-muted border border-line px-2.5 py-0.5 text-[11px] font-semibold text-ink">
                    TAXONOMY
                  </span>
                </div>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-line text-muted-foreground">
                        <th className="py-2 pr-4 font-semibold">Evidence Status</th>
                        <th className="py-2 pr-4 font-semibold">Criteria</th>
                        <th className="py-2 font-semibold">Example Application in Gates Brief</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line-soft text-muted-foreground">
                      <tr>
                        <td className="py-2.5 pr-4 font-semibold text-emerald">VERIFIED</td>
                        <td className="py-2.5 pr-4">Documented in identified statutory public filing with timestamp</td>
                        <td className="py-2.5 text-ink">Zoning is AE-20 (Fresno County Code § 816); Substation is 230/500kV</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 pr-4 font-semibold text-ink">UNKNOWN</td>
                        <td className="py-2.5 pr-4">Agency records are silent or unindexed; explicitly preserved as unknown</td>
                        <td className="py-2.5 text-ink">Specific landowner lease expectation; local private easement encumbrances</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 pr-4 font-semibold text-amber">CONFLICTING</td>
                        <td className="py-2.5 pr-4">Authoritative records disagree; surfaced transparently without smoothing</td>
                        <td className="py-2.5 text-ink">Assessor cadastral parcel line vs actual fenced perimeter and transmission corridor</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 pr-4 font-semibold text-azure">DEEPER DILIGENCE</td>
                        <td className="py-2.5 pr-4">Published signal indicates potential constraint requiring specialist review</td>
                        <td className="py-2.5 text-ink">Williamson Act contract non-renewal status; CAISO cluster deliverability upgrades</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>

              {/* Section 08 */}
              <article className="surface-card border border-line rounded-xl p-6">
                <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald">SECTION 08</span>
                    <h4 className="text-base font-semibold text-ink">Authoritative Source Bibliography</h4>
                  </div>
                  <span className="rounded-full bg-emerald/10 border border-emerald/30 px-2.5 py-0.5 text-[11px] font-semibold text-emerald">
                    TRACEABLE
                  </span>
                </div>
                <div className="mt-4 space-y-2.5 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="size-1.5 rounded-full bg-emerald shrink-0 mt-1.5" />
                    <div>
                      <strong className="text-ink">California ISO (CAISO):</strong> Public Interconnection Queue & 2023-2024 Transmission Plan (Fresno Area Assessment, Section 3.4). Retrieval Date: September 2026.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="size-1.5 rounded-full bg-emerald shrink-0 mt-1.5" />
                    <div>
                      <strong className="text-ink">County of Fresno:</strong> Ordinance Code Title 8 (Planning and Zoning), Chapter 816 "AE-20 Exclusive Agricultural District"; General Plan Map LU-1.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="size-1.5 rounded-full bg-emerald shrink-0 mt-1.5" />
                    <div>
                      <strong className="text-ink">Office of the State Fire Marshal (CAL FIRE):</strong> Fire Hazard Severity Zone Map (California PRC § 4201-4204).
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="size-1.5 rounded-full bg-emerald shrink-0 mt-1.5" />
                    <div>
                      <strong className="text-ink">Federal Emergency Management Agency (FEMA):</strong> Flood Insurance Rate Map (FIRM) Panel 06019C2575H.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="size-1.5 rounded-full bg-emerald shrink-0 mt-1.5" />
                    <div>
                      <strong className="text-ink">California Department of Conservation:</strong> Division of Land Resource Protection, Williamson Act Contract Database.
                    </div>
                  </div>
                </div>
              </article>

              {/* Section 09 */}
              <article className="surface-card border border-line rounded-xl p-6">
                <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald">SECTION 09</span>
                    <h4 className="text-base font-semibold text-ink">Actionable Next-Stage Diligence Questions</h4>
                  </div>
                  <span className="rounded-full bg-emerald/10 border border-emerald/30 px-2.5 py-0.5 text-[11px] font-semibold text-emerald">
                    HANDOFF
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-lg border border-line-soft bg-muted/30 p-3.5 space-y-1.5">
                    <h5 className="font-bold text-xs text-ink flex items-center gap-1.5">
                      <Layers className="size-3.5 text-emerald" />
                      For Electrical Engineer
                    </h5>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      1. Check CAISO Cluster 14/15 Phase II study reports for Gates 230kV bus headroom.
                      <br />
                      2. Confirm whether direct gen-tie must cross existing 500kV right-of-ways.
                    </p>
                  </div>

                  <div className="rounded-lg border border-line-soft bg-muted/30 p-3.5 space-y-1.5">
                    <h5 className="font-bold text-xs text-ink flex items-center gap-1.5">
                      <Scale className="size-3.5 text-amber" />
                      For Land-Use Counsel
                    </h5>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      1. Confirm Williamson Act contract status and check if Notice of Non-Renewal is filed.
                      <br />
                      2. Review Fresno County CUP submittal requirements for BESS setbacks and sound walls.
                    </p>
                  </div>

                  <div className="rounded-lg border border-line-soft bg-muted/30 p-3.5 space-y-1.5">
                    <h5 className="font-bold text-xs text-ink flex items-center gap-1.5">
                      <Leaf className="size-3.5 text-emerald" />
                      For Environmental Biologist
                    </h5>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      1. Run California Natural Diversity Database (CNDDB) check for San Joaquin kit fox buffers.
                      <br />
                      2. Confirm agricultural soil classification for prime farmland conversion review.
                    </p>
                  </div>
                </div>
              </article>
            </div>

            {/* Bottom Request CTA */}
            <div className="rounded-xl border border-emerald/30 bg-emerald/5 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-ink">
                  Evaluate your California BESS candidate location
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
                  We prepare bespoke, source-backed preliminary intelligence briefs for specific candidate parcels across California. Submit your location to begin.
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
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: DELIVERABLE GUIDE (9 REPORT SECTIONS OVERVIEW)                     */}
        {/* ========================================================================= */}
        {activeTab === "guide" && (
          <div className="space-y-12">
            {/* 4-Part Evidence Taxonomy Callout */}
            <section className="surface-card overflow-hidden border border-line p-6 sm:p-8 rounded-xl">
              <div className="max-w-3xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald">
                  Core Diligence Rule
                </span>
                <h2 className="mt-1 text-xl font-bold text-ink">
                  The 4-Part Evidence Classification Framework
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Every finding in a GeoSpatia Labs brief is strictly tagged with one of four
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
                      className="surface-card flex flex-col justify-between p-6 border border-line hover:border-emerald/40 transition-colors rounded-xl"
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
            <section className="rounded-xl border border-line bg-muted/50 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <Scale className="size-6 shrink-0 text-amber mt-1" />
                <div>
                  <h3 className="text-base font-semibold text-ink">
                    Clear Scope & Diligence Boundaries
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    GeoSpatia Labs provides preliminary research and decision intelligence
                    designed to organize public information before deeper expenditure.
                    GeoSpatia Labs does not provide final engineering designs, guarantee
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
            <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-emerald/30 bg-emerald/5 p-6 sm:flex-row sm:p-8">
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
          </div>
        )}
      </main>
    </div>
  );
}
