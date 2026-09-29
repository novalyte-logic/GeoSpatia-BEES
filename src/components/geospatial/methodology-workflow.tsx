"use client";

import * as React from "react";
import {
  Database,
  FileSearch,
  GitBranch,
  ListChecks,
  UserCheck,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Cpu,
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Layers,
  ChevronRight,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type MethodologyStep = {
  id: string;
  number: string;
  title: string;
  shortLabel: string;
  category: "evidence" | "engine" | "validation" | "analysis" | "human" | "brief";
  tier: "Deterministic Evidence" | "Deterministic Rules" | "AI Synthesis" | "Human Oversight" | "Client Deliverable";
  icon: React.ComponentType<{ className?: string }>;
  headline: string;
  summary: string;
  keySourcesOrInputs: string[];
  rulesAndSafeguards: string[];
  aiRole: string;
  humanRole: string;
  exampleFinding: {
    status: "verified" | "conflicting" | "unknown" | "deeper";
    text: string;
    note: string;
  };
};

export const methodologySteps: MethodologyStep[] = [
  {
    id: "intake",
    number: "01",
    title: "Candidate Location & Question Intake",
    shortLabel: "Scope Intake",
    category: "evidence",
    tier: "Deterministic Evidence",
    icon: Database,
    headline: "Review candidate parcel boundaries and developer evaluation priorities.",
    summary:
      "We begin by reviewing the candidate California location provided by the developer — parcel APN, street address, or approximate coordinates — and the specific diligence question they need answered before committing further capital.",
    keySourcesOrInputs: [
      "Candidate parcel boundaries (County Assessor cadastral GIS)",
      "Target developer capacity assumptions (e.g. MW / duration)",
      "Specific developer diligence priorities (interconnection, zoning, permits)",
    ],
    rulesAndSafeguards: [
      "Explicit scope verification: we only accept inquiries fitting our California BESS research capability.",
      "Clear confidentiality: candidate site locations are held confidential and never shared.",
      "Scope and fees confirmed directly before commencing research.",
    ],
    aiRole: "None. Research scope review and intake evaluation are conducted manually by domain specialists.",
    humanRole: "Analysts confirm jurisdiction boundaries and verify public source availability for the candidate area.",
    exampleFinding: {
      status: "verified",
      text: "Candidate parcel located in unincorporated county jurisdiction under local planning authority.",
      note: "Established baseline jurisdiction boundary for subsequent county zoning and state agency inquiries.",
    },
  },
  {
    id: "sources",
    number: "02",
    title: "Public Record & Agency Source Discovery",
    shortLabel: "Source Discovery",
    category: "evidence",
    tier: "Deterministic Evidence",
    icon: FileSearch,
    headline: "Identify relevant, verifiable public repositories and agency filings.",
    summary:
      "We identify available public-source records relevant to the candidate site: utility hosting capacity maps, ISO queue cluster filings, county assessor tax parcel GIS, local zoning ordinances, and state environmental overlays.",
    keySourcesOrInputs: [
      "Regional ISO and utility interconnection queue logs",
      "County planning GIS zoning maps & allowable use matrices",
      "CAL FIRE fire hazard severity maps & FEMA flood rate maps",
      "State environmental databases (CDFW BIOS, wetland inventories)",
      "State energy commission and regulatory power plant registries",
    ],
    rulesAndSafeguards: [
      "Authoritative sources only: statutory records, official agency filings, and public utility maps.",
      "No reliance on unverified internet blogs, message boards, or unvetted summaries.",
      "Every document timestamped and cross-referenced with issuing agency authority.",
    ],
    aiRole: "Assists analysts with text search across large public regulatory filings under manual oversight.",
    humanRole: "Domain analysts identify the exact county planning code sections and utility map layers applicable to the parcel.",
    exampleFinding: {
      status: "verified",
      text: "Nearest utility substation identified with published voltage records in public utility filings.",
      note: "Source verified against public utility infrastructure map and regional ISO queue report.",
    },
  },
  {
    id: "capture",
    number: "03",
    title: "Evidence Extraction & Source Citation",
    shortLabel: "Evidence Extraction",
    category: "validation",
    tier: "Deterministic Rules",
    icon: GitBranch,
    headline: "Extract documented facts and link every finding to its primary source.",
    summary:
      "Every material finding is extracted and cited with its source name, issuing agency, publication date, and public docket or reference number. Fact is separated from inference.",
    keySourcesOrInputs: [
      "Published queue listings and substation connection points",
      "County parcel zoning classification and allowable use definitions",
      "Local planning commission conditional use requirements",
      "Mapped environmental buffer and hazard zone boundaries",
    ],
    rulesAndSafeguards: [
      "Traceability rule: zero uncited claims. Every factual statement must cite its underlying source.",
      "Fact vs. inference separation: statutory facts are kept strictly separate from diligence observations.",
      "Documented dates: every finding reflects the specific date of the underlying public record.",
    ],
    aiRole: "Assists in structuring extracted findings into standardized diligence categories.",
    humanRole: "Cross-checks numerical figures and technical citations against the original agency documents.",
    exampleFinding: {
      status: "verified",
      text: "Parcel is designated under heavy commercial / industrial zoning in county general plan.",
      note: "Referenced directly to county planning department zoning ordinance and allowable use schedule.",
    },
  },
  {
    id: "validation",
    number: "04",
    title: "Uncertainty & Conflict Analysis Gate",
    shortLabel: "Conflict & Unknowns",
    category: "analysis",
    tier: "Deterministic Rules",
    icon: ListChecks,
    headline: "Surface gaps as explicit Unknowns and flag agency discrepancies.",
    summary:
      "Where public records are silent, the item is strictly labeled 'Unknown' rather than inferred. When different agencies show conflicting information, both records are surfaced side-by-side without smoothing.",
    keySourcesOrInputs: [
      "County planning department records vs. state environmental clearinghouse filings",
      "Published utility hosting capacity estimates vs. regional interconnection cluster queue",
      "Parcel boundary records vs. local road right-of-way surveys",
    ],
    rulesAndSafeguards: [
      "Zero synthetic certainty: we never manufacture numbers where public data is absent.",
      "Zero smoothing: discrepancies between agency dockets are surfaced side-by-side.",
      "Unknown preservation: missing information becomes an explicit diligence question.",
    ],
    aiRole: "Identifies text discrepancies between differing agency records for human evaluation.",
    humanRole: "Evaluates whether discrepancies stem from agency reporting lag, permit revisions, or open legal matters.",
    exampleFinding: {
      status: "conflicting",
      text: "Local county portal shows open permit status while state clearinghouse lists prior withdrawal.",
      note: "Both records preserved side-by-side with recommended clarification steps for the developer's land counsel.",
    },
  },
  {
    id: "human",
    number: "05",
    title: "Analyst Review & Quality Assurance",
    shortLabel: "Analyst QA",
    category: "human",
    tier: "Human Oversight",
    icon: UserCheck,
    headline: "Comprehensive review by human energy research analysts.",
    summary:
      "A qualified research analyst reviews every citation, audits all unknowns and conflicts, and translates open questions into actionable inquiries tailored for the client's engineering and legal specialists.",
    keySourcesOrInputs: [
      "Draft Preliminary Site Intelligence Brief",
      "Source citation ledger and document links",
      "Questions for next-stage diligence list",
    ],
    rulesAndSafeguards: [
      "Manual review of every citation and status categorization.",
      "Verification that scope boundaries clearly state what the screen does and does not replace.",
      "Final check to ensure zero fabricated data or unwarranted assumptions.",
    ],
    aiRole: "None. Final review, editorial discretion, and deliverable sign-off are exclusively performed by analysts.",
    humanRole: "Conducts end-to-end quality assurance, audits all source references, and finalizes the deliverable.",
    exampleFinding: {
      status: "verified",
      text: "Analyst confirmed line proximity and drafted specific interconnection study questions for the developer's engineer.",
      note: "Formulated targeted questions regarding cluster study timing and utility pre-application procedures.",
    },
  },
  {
    id: "brief",
    number: "06",
    title: "Preliminary Site Intelligence Brief Delivery",
    shortLabel: "Intelligence Brief",
    category: "brief",
    tier: "Client Deliverable",
    icon: FileText,
    headline: "Structured, decision-ready deliverable with full provenance.",
    summary:
      "The client receives a structured preliminary intelligence brief with verified findings, clear unknowns, documented conflicts, and focused questions to direct next-stage engineering, legal, or environmental diligence.",
    keySourcesOrInputs: [
      "Synthesized preliminary site intelligence brief",
      "Traceable public source reference list",
      "Focused next-stage diligence inquiry list",
    ],
    rulesAndSafeguards: [
      "Clear legal and engineering scope limitations.",
      "No guarantees of interconnection capacity or project feasibility.",
      "Delivered directly to the client development team by email.",
    ],
    aiRole: "None. Delivery and client communication are handled directly by the research team.",
    humanRole: "Delivers the brief and answers questions regarding source references and methodology.",
    exampleFinding: {
      status: "verified",
      text: "Structured deliverable organizing 6 core dimensions with full citations, transparent unknowns, and next-step questions.",
      note: "Enables developer to decide whether to advance to formal option agreements and study deposits.",
    },
  },
];

export function MethodologyWorkflow() {
  const [activeStepIndex, setActiveStepIndex] = React.useState<number>(0);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [viewMode, setViewMode] = React.useState<"architecture" | "comparison">("architecture");

  const activeStep = methodologySteps[activeStepIndex];

  // Auto-cycle timer if playing
  React.useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % methodologySteps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full space-y-8">
      {/* Top Banner: Architecture Philosophy */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-emerald/20 bg-emerald/5 p-4 sm:p-5">
        <div className="flex items-start gap-3.5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald/15 text-emerald">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald">
                Architecture Standard
              </span>
              <span className="rounded-full bg-emerald/15 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald">
                Deterministic First · Generative Second
              </span>
            </div>
            <p className="mt-1 text-sm font-medium text-ink">
              Every finding traces to a public docket or statutory GIS polygon. AI never invents missing data.
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex shrink-0 items-center rounded-lg border border-line bg-card p-1">
          <button
            type="button"
            onClick={() => setViewMode("architecture")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              viewMode === "architecture"
                ? "bg-emerald text-emerald-foreground shadow-xs"
                : "text-muted-foreground hover:text-ink",
            )}
          >
            <Layers className="size-3.5" />
            Process Flow
          </button>
          <button
            type="button"
            onClick={() => setViewMode("comparison")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              viewMode === "comparison"
                ? "bg-emerald text-emerald-foreground shadow-xs"
                : "text-muted-foreground hover:text-ink",
            )}
          >
            <Sparkles className="size-3.5" />
            AI vs Evidence Contrast
          </button>
        </div>
      </div>

      {viewMode === "architecture" ? (
        <>
          {/* Main SVG Interactive Flow Canvas */}
          <div className="surface-card overflow-hidden p-5 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-line-soft pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-block size-2 rounded-full bg-emerald animate-pulse" />
                  <p className="eyebrow text-emerald">Interactive Workflow Pipeline</p>
                </div>
                <h3 className="mt-1 text-lg font-semibold text-ink sm:text-xl">
                  6-Stage Evidence-to-Intelligence Pipeline
                </h3>
                <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
                  Click any stage to inspect the processing rules, AI boundaries, and QA safeguards.
                </p>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-line bg-card px-2.5 py-1.5 text-xs font-medium text-ink hover:bg-muted/50 transition-colors"
                  title={isPlaying ? "Pause automated tour" : "Start automated walkthrough"}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="size-3.5 text-amber" />
                      <span>Pause Tour</span>
                    </>
                  ) : (
                    <>
                      <Play className="size-3.5 text-emerald" />
                      <span>Auto Tour</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStepIndex(0)}
                  className="inline-flex items-center justify-center size-8 rounded-md border border-line bg-card text-muted-foreground hover:text-ink hover:bg-muted/50 transition-colors"
                  title="Reset to Step 01"
                >
                  <RotateCcw className="size-3.5" />
                </button>
              </div>
            </div>

            {/* SVG Diagram Canvas (Desktop & Tablet) */}
            <div className="relative mt-6 hidden md:block">
              <svg
                viewBox="0 0 960 210"
                className="w-full h-auto select-none"
                aria-label="GeoSpatia Labs 6-stage methodology flow"
              >
                <defs>
                  {/* Gradients */}
                  <linearGradient id="pipe-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--emerald)" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="var(--emerald)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="var(--emerald)" stopOpacity="0.4" />
                  </linearGradient>

                  <linearGradient id="active-halo" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--emerald)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--emerald)" stopOpacity="0.05" />
                  </linearGradient>

                  <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Demarcation Background Bands */}
                <g className="opacity-90">
                  {/* Step 1 & 2: Ingestion & Capture */}
                  <rect
                    x="20"
                    y="10"
                    width="290"
                    height="190"
                    rx="12"
                    fill="currentColor"
                    className="text-muted/40"
                    stroke="var(--line-soft)"
                    strokeWidth="1"
                  />
                  <text
                    x="35"
                    y="32"
                    fill="var(--ink-soft)"
                    fontSize="10"
                    fontFamily="inherit"
                    fontWeight="600"
                    letterSpacing="0.08em"
                    className="uppercase"
                  >
                    Phase I · Evidence Ingestion
                  </text>

                  {/* Step 3 & 4: Validation & Analysis */}
                  <rect
                    x="335"
                    y="10"
                    width="290"
                    height="190"
                    rx="12"
                    fill="currentColor"
                    className="text-emerald-tint/15"
                    stroke="var(--emerald)"
                    strokeOpacity="0.25"
                    strokeWidth="1"
                  />
                  <text
                    x="350"
                    y="32"
                    fill="var(--emerald)"
                    fontSize="10"
                    fontFamily="inherit"
                    fontWeight="600"
                    letterSpacing="0.08em"
                    className="uppercase"
                  >
                    Phase II · Validation & Synthesis
                  </text>

                  {/* Step 5 & 6: Human Review & Brief */}
                  <rect
                    x="650"
                    y="10"
                    width="290"
                    height="190"
                    rx="12"
                    fill="currentColor"
                    className="text-muted/40"
                    stroke="var(--line-soft)"
                    strokeWidth="1"
                  />
                  <text
                    x="665"
                    y="32"
                    fill="var(--ink-soft)"
                    fontSize="10"
                    fontFamily="inherit"
                    fontWeight="600"
                    letterSpacing="0.08em"
                    className="uppercase"
                  >
                    Phase III · Human QA & Delivery
                  </text>
                </g>

                {/* Connecting Connecting Flow Pipes */}
                <path
                  d="M 85 110 L 235 110 L 400 110 L 550 110 L 715 110 L 865 110"
                  fill="none"
                  stroke="var(--line)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                <path
                  d="M 85 110 L 235 110 L 400 110 L 550 110 L 715 110 L 865 110"
                  fill="none"
                  stroke="url(#pipe-gradient)"
                  strokeWidth="3"
                  strokeDasharray="8 6"
                  className="animate-[dash_20s_linear_infinite]"
                  strokeLinecap="round"
                />

                {/* Moving Pulse Packets */}
                <circle cx="85" cy="110" r="4" fill="var(--emerald)" filter="url(#glow-filter)">
                  <animate
                    attributeName="cx"
                    values="85;235;400;550;715;865;85"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Interactive Step Nodes */}
                {methodologySteps.map((step, idx) => {
                  // Node X coordinates
                  const nodePositions = [85, 235, 400, 550, 715, 865];
                  const cx = nodePositions[idx];
                  const cy = 110;
                  const isActive = activeStepIndex === idx;

                  return (
                    <g
                      key={step.id}
                      className="cursor-pointer transition-all duration-300 group"
                      onClick={() => {
                        setActiveStepIndex(idx);
                        setIsPlaying(false);
                      }}
                    >
                      {/* Active Halo */}
                      {isActive && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r="44"
                          fill="url(#active-halo)"
                          stroke="var(--emerald)"
                          strokeWidth="1.5"
                          strokeDasharray="4 2"
                          className="animate-spin"
                          style={{ transformOrigin: `${cx}px ${cy}px`, animationDuration: "12s" }}
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isActive ? "32" : "28"}
                        fill="var(--card)"
                        stroke={isActive ? "var(--emerald)" : "var(--line)"}
                        strokeWidth={isActive ? "3" : "1.5"}
                        className="transition-all duration-200 group-hover:stroke-emerald group-hover:scale-105"
                        style={{ transformOrigin: `${cx}px ${cy}px` }}
                        filter={isActive ? "url(#glow-filter)" : undefined}
                      />

                      {/* Inner Node Pill Accent */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r="20"
                        fill={isActive ? "var(--emerald)" : "var(--muted)"}
                        fillOpacity={isActive ? "0.15" : "0.5"}
                        className="transition-colors"
                      />

                      {/* Step Number */}
                      <text
                        x={cx}
                        y={cy - 2}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={isActive ? "var(--emerald)" : "var(--ink)"}
                        fontSize="13"
                        fontFamily="inherit"
                        fontWeight="700"
                        className="pointer-events-none"
                      >
                        {step.number}
                      </text>

                      {/* Step Tier Pill below number */}
                      <text
                        x={cx}
                        y={cy + 13}
                        textAnchor="middle"
                        fill="var(--muted-foreground)"
                        fontSize="8"
                        fontFamily="monospace"
                        fontWeight="600"
                        className="pointer-events-none"
                      >
                        {step.shortLabel.split(" ")[0].toUpperCase()}
                      </text>

                      {/* Node Label Below */}
                      <text
                        x={cx}
                        y={cy + 48}
                        textAnchor="middle"
                        fill={isActive ? "var(--ink)" : "var(--muted-foreground)"}
                        fontSize="11"
                        fontFamily="inherit"
                        fontWeight={isActive ? "600" : "500"}
                        className="transition-colors pointer-events-none"
                      >
                        {step.shortLabel}
                      </text>

                      {/* Safeguard indicator badge */}
                      {idx === 2 && (
                        <g transform={`translate(${cx + 16}, ${cy - 28})`}>
                          <circle cx="0" cy="0" r="7" fill="var(--amber)" fillOpacity="0.2" stroke="var(--amber)" strokeWidth="1" />
                          <text x="0" y="3" textAnchor="middle" fill="var(--amber)" fontSize="9" fontWeight="bold">!</text>
                        </g>
                      )}

                      {idx === 3 && (
                        <g transform={`translate(${cx + 16}, ${cy - 28})`}>
                          <circle cx="0" cy="0" r="7" fill="var(--azure)" fillOpacity="0.2" stroke="var(--azure)" strokeWidth="1" />
                          <text x="0" y="3" textAnchor="middle" fill="var(--azure)" fontSize="8" fontWeight="bold">AI</text>
                        </g>
                      )}

                      {idx === 4 && (
                        <g transform={`translate(${cx + 16}, ${cy - 28})`}>
                          <circle cx="0" cy="0" r="7" fill="var(--emerald)" fillOpacity="0.2" stroke="var(--emerald)" strokeWidth="1" />
                          <text x="0" y="3" textAnchor="middle" fill="var(--emerald)" fontSize="8" fontWeight="bold">QA</text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Mobile / Tablet Step Selector Buttons */}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:hidden">
              {methodologySteps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = activeStepIndex === idx;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      setActiveStepIndex(idx);
                      setIsPlaying(false);
                    }}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border p-2.5 text-left text-xs transition-all",
                      isActive
                        ? "border-emerald bg-emerald/10 text-ink shadow-xs font-semibold"
                        : "border-line bg-card text-muted-foreground hover:bg-muted/40",
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-md font-mono text-[10px]",
                        isActive ? "bg-emerald text-emerald-foreground" : "bg-muted text-muted-foreground",
                      )}
                    >
                      {step.number}
                    </div>
                    <span className="truncate">{step.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Step Navigation Dots */}
            <div className="mt-6 flex items-center justify-between border-t border-line-soft pt-4">
              <button
                type="button"
                disabled={activeStepIndex === 0}
                onClick={() => {
                  setActiveStepIndex((prev) => Math.max(0, prev - 1));
                  setIsPlaying(false);
                }}
                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Previous Stage
              </button>

              <div className="flex items-center gap-1.5">
                {methodologySteps.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setActiveStepIndex(i);
                      setIsPlaying(false);
                    }}
                    className={cn(
                      "size-2 rounded-full transition-all",
                      activeStepIndex === i
                        ? "w-6 bg-emerald"
                        : "bg-line hover:bg-muted-foreground",
                    )}
                    aria-label={`Go to step ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                disabled={activeStepIndex === methodologySteps.length - 1}
                onClick={() => {
                  setActiveStepIndex((prev) => Math.min(methodologySteps.length - 1, prev + 1));
                  setIsPlaying(false);
                }}
                className="inline-flex items-center gap-1 text-xs font-medium text-emerald hover:text-emerald-soft disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next Stage →
              </button>
            </div>
          </div>

          {/* Active Stage Deep-Dive Inspector */}
          <div className="surface-quiet overflow-hidden p-5 sm:p-6 lg:p-7 border-emerald/30 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald/30 bg-emerald/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald">
                    Stage {activeStep.number} of 06
                  </span>
                  <span className="rounded-full border border-line bg-card px-2.5 py-0.5 text-[11px] font-medium text-ink-soft">
                    {activeStep.tier}
                  </span>
                </div>
                <h4 className="mt-2.5 text-xl font-bold text-ink sm:text-2xl">
                  {activeStep.title}
                </h4>
                <p className="mt-1 text-sm font-medium text-emerald">
                  {activeStep.headline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-3xl">
                  {activeStep.summary}
                </p>
              </div>

              {/* Stage Badge Visual */}
              <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-emerald/12 text-emerald border border-emerald/20 self-start">
                <activeStep.icon className="size-7" />
              </div>
            </div>

            {/* 3-Column Inspection Grid */}
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
              {/* Column 1: Inputs & Sources */}
              <div className="rounded-lg border border-line-soft bg-card p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink">
                  <Database className="size-3.5 text-emerald" />
                  <span>Key Inputs & Sources</span>
                </div>
                <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                  {activeStep.keySourcesOrInputs.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald/60" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Safeguards & Boundaries */}
              <div className="rounded-lg border border-line-soft bg-card p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink">
                  <ShieldCheck className="size-3.5 text-amber" />
                  <span>Evidence Integrity Safeguards</span>
                </div>
                <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                  {activeStep.rulesAndSafeguards.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 pt-3 border-t border-line-soft">
                  <div className="text-[11px] leading-tight text-ink-soft">
                    <span className="font-semibold text-ink">AI Scope: </span>
                    {activeStep.aiRole}
                  </div>
                </div>
              </div>

              {/* Column 3: Live Output / Finding Artifact */}
              <div className="rounded-lg border border-emerald/30 bg-emerald/5 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald">
                    <FileText className="size-3.5" />
                    <span>Stage Output Artifact</span>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                      activeStep.exampleFinding.status === "conflicting" && "bg-amber/20 text-amber",
                      activeStep.exampleFinding.status === "unknown" && "bg-muted text-muted-foreground",
                      activeStep.exampleFinding.status === "deeper" && "bg-azure/20 text-azure",
                      activeStep.exampleFinding.status === "verified" && "bg-emerald/20 text-emerald",
                    )}
                  >
                    {activeStep.exampleFinding.status}
                  </span>
                </div>

                <div className="mt-3 rounded-md border border-line bg-card p-3">
                  <p className="text-xs font-semibold text-ink">
                    {activeStep.exampleFinding.text}
                  </p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                    <span className="font-medium text-emerald">Verification: </span>
                    {activeStep.exampleFinding.note}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-ink-soft">
                  <UserCheck className="size-3 text-emerald" />
                  <span>
                    <span className="font-medium text-ink">Human QA: </span>
                    {activeStep.humanRole}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Architecture Comparison View */
        <div className="surface-card p-6 sm:p-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-emerald">Architectural Safeguard Comparison</p>
            <h3 className="mt-2 text-xl font-bold text-ink sm:text-2xl">
              Why Generic LLMs Fail Site Screening — And How We Solve It
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Large Language Models are probabilistic text generators. Real estate and grid infrastructure screening requires statutory certainty and verifiable proof.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Generic LLM Box */}
            <div className="rounded-xl border border-rose/30 bg-rose/5 p-6">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-rose/20 text-rose">
                  <AlertTriangle className="size-4.5" />
                </div>
                <div>
                  <h4 className="font-semibold text-ink">Generic GenAI / Unbounded LLM</h4>
                  <p className="text-xs text-rose font-medium">High commercial hallucination risk</p>
                </div>
              </div>

              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-rose" />
                  <span>
                    <strong className="text-ink">Hallucinates missing data:</strong> If a noise study doesn’t exist, standard LLMs generate plausible sounding decibel limits instead of stating Unknown.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-rose" />
                  <span>
                    <strong className="text-ink">Averages conflicting records:</strong> When county and state dockets conflict, generic AI creates a smooth compromise paragraph, hiding the dispute.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-rose" />
                  <span>
                    <strong className="text-ink">Unverifiable text blocks:</strong> Produces walls of narrative without atomic citations or docket references to underlying county/utility portals.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-rose" />
                  <span>
                    <strong className="text-ink">No human review gate:</strong> Raw model outputs delivered directly without domain engineering oversight.
                  </span>
                </li>
              </ul>
            </div>

            {/* GeoSpatia Labs Architecture Box */}
            <div className="rounded-xl border border-emerald/40 bg-emerald/5 p-6 relative overflow-hidden">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-emerald/20 text-emerald">
                  <ShieldCheck className="size-4.5" />
                </div>
                <div>
                  <h4 className="font-semibold text-ink">GeoSpatia Labs Methodology</h4>
                  <p className="text-xs text-emerald font-semibold">Evidence first · AI second</p>
                </div>
              </div>

              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald" />
                  <span>
                    <strong className="text-ink">Preserves statutory Unknowns:</strong> When public filings are silent, the brief marks the item strictly as <em>Unknown</em> with formal discovery questions.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald" />
                  <span>
                    <strong className="text-ink">Surfaces Conflicts side-by-side:</strong> Discrepant county and state dockets are exposed in full so developers can order legal reconciliation.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald" />
                  <span>
                    <strong className="text-ink">100% Traceable Source Register:</strong> Every claim links to an identifiable public reference (SRC-01 to SRC-12) with portal docket numbers.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald" />
                  <span>
                    <strong className="text-ink">Human-in-the-Loop QA:</strong> Qualified analysts verify every finding and craft actionable next-stage diligence steps before delivery.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
