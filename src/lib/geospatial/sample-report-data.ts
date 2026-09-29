/**
 * Illustrative sample data for the Geospatial Labs Sample Site Intelligence Brief.
 *
 * GUARDRAILS — this is DEMO data only:
 *  - No real customer, company, person, or testimonial.
 *  - No real permit numbers, real parcel APNs from a real county, real grid
 *    capacity values, or real published study results.
 *  - Source names use realistic public-source categories but the specific
 *    references are illustrative placeholders (SRC-01 ... SRC-12).
 *  - Every finding carries a status and a source ref — the UI is built so
 *    real source-backed data can replace this demo data later without
 *    structural change.
 *
 * Replace `DEMO_*` values with sourced data when shipping a real brief.
 */

import type { FindingStatus } from "@/components/geospatial/status-pill";

export type Source = {
  refId: string;
  name: string;
  type: string;
  note?: string;
};

export type Finding = {
  id: string;
  dimension: string;
  claim: string;
  status: FindingStatus;
  sourceRefs: string[];
};

export type NextQuestion = {
  area: string;
  question: string;
  why: string;
};

export const sources: Source[] = [
  { refId: "SRC-01", name: "CAISO interconnection queue (public)", type: "ISO / utility", note: "Public queue listing — illustrative snapshot" },
  { refId: "SRC-02", name: "Investor-owned utility interconnection portal", type: "Utility", note: "Public-facing interconnection page — illustrative" },
  { refId: "SRC-03", name: "County assessor / parcel GIS", type: "Parcel / GIS", note: "APN, acreage, owner of record — illustrative" },
  { refId: "SRC-04", name: "County planning GIS / zoning layer", type: "Planning", note: "Zoning + overlay districts — illustrative" },
  { refId: "SRC-05", name: "County planning permit portal", type: "Permitting", note: "Open CUP record — illustrative" },
  { refId: "SRC-06", name: "State permitting / project portal", type: "Permitting", note: "Conflicting withdrawn-status record — illustrative" },
  { refId: "SRC-07", name: "CDFW BIOS sensitive habitat overlay", type: "Environmental", note: "Public habitat overlay — illustrative" },
  { refId: "SRC-08", name: "Cal-Adapt fire severity / climate layers", type: "Environmental", note: "High fire severity zone — illustrative" },
  { refId: "SRC-09", name: "CEC energy storage project database", type: "Project activity", note: "Nearby project listing — illustrative" },
  { refId: "SRC-10", name: "EIA-860M monthly generator inventory", type: "Project activity", note: "Operating BESS nearby — illustrative" },
  { refId: "SRC-11", name: "County recorder / recorded plats", type: "Parcel", note: "Parcel subdivision history — illustrative" },
  { refId: "SRC-12", name: "CPUC jurisdictional boundary map", type: "Jurisdiction", note: "IOU service territory — illustrative" },
];

export const sampleBrief = {
  isIllustrative: true,
  title: "Preliminary Site Intelligence Brief",
  subtitle: "California BESS · Single-site screening",
  preparedFor: "Illustrative sample — not a real engagement",
  preparedOn: "Illustrative · {today}",
  version: "Demo v0.1",
  confidentiality: "Illustrative sample — for demonstration only",

  executiveSummary: [
    "This brief is an illustrative sample built on demo data. It is not a customer engagement and does not reflect any real site, company, permit, or grid capacity value.",
    "The structure follows what a paid Geospatial Labs site screen would deliver: source-backed findings, clearly labeled statuses (Verified / Unknown / Conflicting / Requires deeper diligence), a source register, and next-step diligence questions.",
    "Findings are organized by dimension: candidate site, project/use assumptions, utility & jurisdiction, grid/interconnection, parcel/site, permitting/planning, environmental/siting, and relevant project activity.",
    "Where public-source information was not located, the finding is marked Unknown. Where two sources disagreed, the finding is marked Conflicting. Source facts are separated from Geospatial Labs analysis.",
  ],

  candidateSite: {
    label: "Illustrative candidate site",
    apn: "142-08-37 (illustrative)",
    coords: "34.9532°N, 118.1234°W (illustrative)",
    acreage: "~22 acres (illustrative)",
    jurisdiction: "Unincorporated county (illustrative)",
    nearestTown: "Illustrative census-designated place (~6 mi)",
    access: "Existing county road frontage on east boundary (illustrative)",
  },

  projectAssumptions: {
    use: "Utility-scale battery-energy-storage system (BESS)",
    size: "~20 MW / ~80 MWh (illustrative assumption provided by requester)",
    duration: "4-hour duration (assumed)",
    stage: "Pre-application screening — no study submitted",
    note: "Assumptions are illustrative. A real brief restates the requester's stated use and does not infer project parameters that were not provided.",
  },

  utility: {
    territory: "Investor-owned utility (IOU) service territory — illustrative",
    jurisdiction: "CPUC jurisdictional boundary (illustrative)",
    substation: "Nearest mapped substation ~0.4 mi east (approx., illustrative)",
    sourceRefs: ["SRC-02", "SRC-12"],
  },

  interconnection: {
    queuePosition: "Not located in public queue data for this site (illustrative)",
    publishedCapacity: "Not located in public sources (illustrative)",
    nearbyLine: "Mapped 115 kV line within ~0.5 mi (illustrative)",
    note: "Published interconnection information may be incomplete, stale, or refer to a different project at a nearby parcel. Final queue position, capacity, and feasibility are determined through the formal utility/ISO interconnection study process.",
    sourceRefs: ["SRC-01", "SRC-02"],
  },

  parcel: {
    zoning: "Heavy industrial use — eligible for utility-scale storage per county zoning inventory (illustrative)",
    overlays: "No mapped Williamson Act contract; one scenic corridor overlay along road frontage (illustrative)",
    ownership: "Private, fee simple — illustrative owner of record",
    accessNote: "Existing county road frontage on east boundary; ingress/egress easement not verified (illustrative)",
    sourceRefs: ["SRC-03", "SRC-04", "SRC-11"],
  },

  permitting: {
    countyCup: "Conditional Use Permit appears open in county planning portal (illustrative)",
    statePortal: "State permitting portal shows the project as withdrawn (illustrative)",
    note: "Sources conflict. This does not mean either record is wrong — it may reflect a filing retraction, a duplicate, or stale data. Verify directly with the county planning department and the state portal before relying on either.",
    sourceRefs: ["SRC-05", "SRC-06"],
  },

  environmental: {
    fire: "High fire severity zone per mapped state layer (illustrative)",
    habitat: "Adjacent parcel overlaps sensitive habitat overlay — subject parcel itself does not (illustrative)",
    flood: "Not within a mapped 100-year flood zone (illustrative)",
    noise: "No published noise study located (Unknown)",
    note: "Environmental findings reflect mapped public datasets only and are not an environmental site assessment, biological survey, or formal constraint determination.",
    sourceRefs: ["SRC-07", "SRC-08"],
  },

  projectActivity: {
    operating: "Operational 50 MW BESS facility sited ~1.4 mi east, 2023 COD (illustrative)",
    queued: "One queued project in same substation cluster under a different developer name (illustrative)",
    note: "Project activity is included only where a public record could be located. We do not infer or include rumored projects.",
    sourceRefs: ["SRC-09", "SRC-10"],
  },

  findings: [
    { id: "F-01", dimension: "Candidate site", claim: "Parcels, acreage, and jurisdiction consistent across county assessor and planning GIS.", status: "verified", sourceRefs: ["SRC-03", "SRC-04"] },
    { id: "F-02", dimension: "Project / use", claim: "Requester-stated use: ~20 MW / ~80 MWh 4-hour BESS; no formal application filed.", status: "verified", sourceRefs: [] },
    { id: "F-03", dimension: "Utility / jurisdiction", claim: "Site within an IOU service territory and CPUC jurisdictional boundary.", status: "verified", sourceRefs: ["SRC-12", "SRC-02"] },
    { id: "F-04", dimension: "Interconnection", claim: "Nearest mapped substation ~0.4 mi east (approx.); queue position for this site not located.", status: "deeper", sourceRefs: ["SRC-01", "SRC-02"] },
    { id: "F-05", dimension: "Parcel / site", claim: "Zoned heavy industrial; eligible for utility-scale storage per county zoning inventory.", status: "verified", sourceRefs: ["SRC-03", "SRC-04"] },
    { id: "F-06", dimension: "Parcel / site", claim: "No Williamson Act contract recorded; scenic corridor overlay along road frontage.", status: "verified", sourceRefs: ["SRC-11"] },
    { id: "F-07", dimension: "Permitting", claim: "County planning portal shows CUP open; state portal shows withdrawn — conflict.", status: "conflicting", sourceRefs: ["SRC-05", "SRC-06"] },
    { id: "F-08", dimension: "Environmental / siting", claim: "Subject parcel within high fire severity zone (mapped state layer).", status: "verified", sourceRefs: ["SRC-08"] },
    { id: "F-09", dimension: "Environmental / siting", claim: "Adjacent parcel overlaps sensitive habitat overlay; subject parcel itself does not.", status: "verified", sourceRefs: ["SRC-07"] },
    { id: "F-10", dimension: "Environmental / siting", claim: "No published noise study located.", status: "unknown", sourceRefs: [] },
    { id: "F-11", dimension: "Project activity", claim: "Operational 50 MW BESS ~1.4 mi east, 2023 COD (public record).", status: "verified", sourceRefs: ["SRC-09", "SRC-10"] },
    { id: "F-12", dimension: "Project activity", claim: "Queued project in same substation cluster under a different developer name.", status: "verified", sourceRefs: ["SRC-01"] },
    { id: "F-13", dimension: "Interconnection", claim: "Published capacity figure for nearest substation not located.", status: "unknown", sourceRefs: [] },
    { id: "F-14", dimension: "Grid / interconnection", claim: "Mapped 115 kV line within ~0.5 mi — alignment and ownership to be verified.", status: "deeper", sourceRefs: ["SRC-02"] },
  ] satisfies Finding[],

  nextQuestions: [
    {
      area: "Interconnection",
      question: "Has any party filed a pre-application or full interconnection request for this parcel or an adjacent parcel?",
      why: "Public queue data did not surface a current record. The conflict between county and state permitting portals may indicate a retracted or transferred application.",
    },
    {
      area: "Permitting",
      question: "Confirm directly with the county planning department whether the CUP is open, suspended, or withdrawn — and reconcile with the state portal record.",
      why: "Two public sources disagree. Both may be partially correct (e.g., a withdrawal at the state level that the county has not yet reflected).",
    },
    {
      area: "Environmental / siting",
      question: "Commission a fire-hardened design review and a biological constraints survey before option spend.",
      why: "High fire severity zone plus adjacent sensitive-habitat overlay materially affects design, cost, and timeline — even where the subject parcel itself is not constrained.",
    },
    {
      area: "Parcel / access",
      question: "Verify ingress/egress easement, road frontage adequacy, and any scenic-corridor setback along the east boundary.",
      why: "Existing road frontage is mapped but easement status was not located. Scenic corridor overlay may impose design constraints on access roads.",
    },
    {
      area: "Project activity",
      question: "Identify the developer of the queued project in the same substation cluster and confirm whether it competes for the same queue capacity.",
      why: "Adjacent and queued projects can materially affect interconnection cost and timeline, even on separate parcels.",
    },
  ] satisfies NextQuestion[],

  scopeLimitations: [
    "This is an illustrative sample built on demo data. It is not a customer engagement and does not reflect any real site, company, permit, or grid capacity value.",
    "Geospatial Labs provides preliminary research and decision intelligence. It does not replace formal engineering, utility studies, interconnection studies, legal advice, environmental consulting, or agency determinations.",
    "Published information may be incomplete, directional, stale, or subject to change. Final feasibility, cost, capacity, approvals, and requirements are determined through the appropriate utility, engineering, agency, and formal study processes.",
    "Findings reflect public-source information available at the time of screening. They are not a real-time view and do not guarantee current grid headroom, queue position, or permitting status.",
    "Unknown and Conflicting statuses are intentional: they indicate that the public record was not located or disagreed. They are not failures of the brief — they are the brief surfacing what needs to be pursued next.",
  ],
};

export function getSourceByRef(refId: string): Source | undefined {
  return sources.find((s) => s.refId === refId);
}
