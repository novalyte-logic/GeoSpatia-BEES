import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  MapPinned,
  Network,
  ShieldCheck,
  Siren,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/geospatial/section";
import { RelatedArticles } from "@/components/geospatial/related-articles";

export const metadata: Metadata = {
  title:
    "How California BESS Developers Can Screen Candidate Sites Before Interconnection and CEQA Spend",
  description:
    "A practical framework for California BESS developers evaluating candidate parcels before deeper interconnection, CEQA, permitting, environmental, and engineering spend.",
  keywords: [
    "California BESS site screening",
    "BESS site selection criteria",
    "battery energy storage fatal flaw screening",
    "CAISO interconnection queue BESS",
    "BESS CEQA review",
    "battery storage permitting California",
    "BESS conditional use permit",
    "battery storage environmental constraints",
    "BESS parcel screening",
  ],
  alternates: {
    canonical: "https://geospatialabs.com/blog/bess-site-screening",
  },
  openGraph: {
    title:
      "How California BESS Developers Can Screen Candidate Sites Before Interconnection and CEQA Spend",
    description:
      "A source-backed screening framework for California battery storage development teams comparing candidate parcels before deeper diligence.",
    url: "https://geospatialabs.com/blog/bess-site-screening",
    type: "article",
  },
};

const sourceLinks = [
  {
    label: "CAISO generator interconnection",
    href: "https://www.caiso.com/generation-transmission/generation/generator-interconnection",
  },
  {
    label: "CEQAnet State Clearinghouse",
    href: "https://ceqanet.opr.ca.gov/",
  },
  {
    label: "CPUC CEQA overview",
    href: "https://www.cpuc.ca.gov/ceqa/",
  },
  {
    label: "GO-Biz renewable energy permitting initiative",
    href: "https://static.business.ca.gov/industries/climate-and-clean-energy/go-biz-renewable-energy-permitting-initiative/",
  },
];

const diligenceAreas = [
  {
    title: "Interconnection context",
    body: "Queue position, point of interconnection, utility territory, nearby queued resources, deliverability status, and whether the public queue story matches the parcel strategy.",
  },
  {
    title: "Land use and entitlement path",
    body: "Zoning, conditional use permit triggers, planning commission history, ordinance posture, neighboring uses, and whether the authority having jurisdiction has recent BESS precedent.",
  },
  {
    title: "Environmental and public-record constraints",
    body: "Flood exposure, fire severity, biological resources, cultural review, hazardous materials, drainage, noise, traffic, and whether the likely CEQA path is screening-level or more involved.",
  },
  {
    title: "Project comparables",
    body: "Nearby BESS, solar-plus-storage, and gen-tie projects that reveal how agencies, utilities, residents, and consultants have already reacted in the same local context.",
  },
];

const searchIntentRows = [
  {
    intent: "Can this parcel support a serious storage project?",
    searches:
      "BESS site selection criteria, utility scale battery storage land requirements, battery storage parcel screening",
  },
  {
    intent: "Is the grid story strong enough to keep going?",
    searches:
      "CAISO interconnection queue BESS, BESS point of interconnection screening, substation proximity BESS site selection",
  },
  {
    intent: "What permitting path could this trigger?",
    searches:
      "BESS permitting California, battery energy storage conditional use permit, BESS CEQA review",
  },
  {
    intent: "What could slow or kill the project locally?",
    searches:
      "BESS fatal flaw screening, battery storage environmental constraints, BESS fire code requirements California",
  },
];

const fatalFlawQuestions = [
  "Is the parcel close enough to a plausible point of interconnection to justify deeper review?",
  "Does the surrounding jurisdiction have a clear path for BESS approvals, or is the ordinance environment still unsettled?",
  "Would the project likely require a conditional use permit, planning commission hearing, CEQA review, or additional state process?",
  "Are there nearby projects that reveal queue congestion, public opposition, fire-safety concerns, or agency sensitivity?",
  "Do flood, fire, biological, cultural, hazardous-materials, noise, or access records create early diligence flags?",
  "Is the public-record story clean enough to justify spending engineering, legal, environmental, or interconnection bandwidth?",
];

const redFlags = [
  "A site looks attractive only because it is near a substation, but the public queue around that POI is crowded or unclear.",
  "The local jurisdiction has little BESS precedent, a developing ordinance, or visible community concern around storage facilities.",
  "The CEQA record shows sensitive environmental, fire, drainage, hazardous-materials, or transportation issues that could expand review.",
  "The parcel has access, easement, adjacency, zoning, or land-use conditions that need specialist review before a development team leans in.",
  "The project narrative depends on assumptions that are not yet supported by public records, agency materials, or comparable filings.",
];

export default function BessSiteScreeningPage() {
  return (
    <div className="bg-background">
      <Section className="relative overflow-hidden border-b border-line bg-background py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-45">
          <div className="grid-bg absolute inset-0 mask-fade-b" />
        </div>
        <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald shadow-sm">
              <Network className="size-3.5" />
              California BESS Site Diligence
            </div>
            <h1 className="mt-5 max-w-5xl font-serif text-4xl font-medium leading-tight text-ink text-balance md:text-6xl">
              How California{" "}
              <span className="text-emerald">BESS developers</span> can screen{" "}
              <span className="text-emerald">candidate sites</span> before
              interconnection and <span className="text-emerald">CEQA spend</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Early battery storage development is not only a land search. A
              candidate parcel has to survive grid context, land use approvals,
              CEQA review, environmental constraints, community scrutiny, and
              the practical question every development team asks: is this site
              worth deeper diligence yet?
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="gap-2 bg-emerald text-emerald-foreground hover:bg-emerald-soft">
                <Link href="/#candidate-locator">
                  Preview a Candidate Location
                  <MapPinned className="size-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="gap-2 border-line bg-card hover:bg-muted">
                <Link href="/sample-report">
                  See What a Brief Covers
                  <FileText className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <aside className="surface-card p-5 lg:col-span-4">
            <p className="text-sm font-semibold text-ink">What this guide helps clarify</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex gap-2.5">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald" />
                Which public records are worth checking before expensive diligence.
              </li>
              <li className="flex gap-2.5">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald" />
                What CAISO queue data can and cannot prove about a site.
              </li>
              <li className="flex gap-2.5">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald" />
                How to organize early evidence into a decision-ready screen.
              </li>
            </ul>
          </aside>
        </div>
      </Section>

      <Section className="border-b border-line bg-card/35 py-14 md:py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          <nav className="surface-card h-fit p-5 lg:sticky lg:top-24 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald">
              Article Map
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a href="#why-screen" className="text-muted-foreground hover:text-ink">
                Why screen before spend
              </a>
              <a href="#queue" className="text-muted-foreground hover:text-ink">
                CAISO queue context
              </a>
              <a href="#records" className="text-muted-foreground hover:text-ink">
                CEQA and planning records
              </a>
              <a href="#framework" className="text-muted-foreground hover:text-ink">
                Screening framework
              </a>
              <a href="#handoff" className="text-muted-foreground hover:text-ink">
                Diligence handoff
              </a>
            </div>
          </nav>

          <article className="lg:col-span-9">
            <div className="max-w-4xl space-y-12">
              <section id="why-screen" className="scroll-mt-24">
                <h2 className="font-serif text-3xl font-medium leading-tight text-ink">
                  Why screen a BESS site before heavy diligence?
                </h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
                  <p>
                    A battery energy storage site can look promising on a map and
                    still fail on entitlement risk, queue congestion, site access,
                    environmental review, fire safety, or local political posture.
                    The costliest mistake is not missing a perfect parcel. It is
                    carrying a weak parcel too far before the public evidence has
                    been organized.
                  </p>
                  <p>
                    A preliminary site screen gives development, origination, and
                    interconnection teams a faster way to sort candidate locations.
                    It does not replace engineers, counsel, agency findings, or
                    utility studies. It does make the next conversation sharper by
                    showing what public records already say, what remains unknown,
                    and which questions need specialist review.
                  </p>
                </div>
              </section>

              <section className="scroll-mt-24">
                <h2 className="font-serif text-3xl font-medium leading-tight text-ink">
                  What development teams are really searching for
                </h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
                  <p>
                    The highest-intent searches around California BESS
                    development are rarely broad terms like battery storage.
                    They are workflow questions. A development team is trying to
                    determine whether a candidate site deserves more time,
                    whether a queue position or nearby POI changes the land
                    thesis, and whether the public record suggests a manageable
                    permitting path.
                  </p>
                  <p>
                    That is why useful content should match the real operating
                    language of the buyer: fatal flaw screening, CAISO queue
                    context, CEQA review, conditional use permits, substation
                    proximity, environmental constraints, and evidence-backed
                    diligence handoff.
                  </p>
                </div>
                <div className="mt-6 overflow-hidden rounded-lg border border-line bg-card">
                  <div className="grid grid-cols-1 border-b border-line bg-muted/60 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink md:grid-cols-2">
                    <span>Buyer question</span>
                    <span className="hidden md:block">Search language</span>
                  </div>
                  {searchIntentRows.map((row) => (
                    <div
                      key={row.intent}
                      className="grid grid-cols-1 gap-2 border-b border-line px-4 py-4 last:border-b-0 md:grid-cols-2"
                    >
                      <p className="text-sm font-medium text-ink">{row.intent}</p>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {row.searches}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="queue" className="scroll-mt-24">
                <h2 className="font-serif text-3xl font-medium leading-tight text-ink">
                  What CAISO queue data can tell you, and what it cannot
                </h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
                  <p>
                    The CAISO generator interconnection queue is one of the first
                    official records worth checking for California storage
                    development. It can show project names, queue positions,
                    technology, megawatts, county, utility, point of
                    interconnection, study status, online-date fields, and
                    interconnection agreement status.
                  </p>
                  <p>
                    That is useful evidence, but it is not a site feasibility
                    answer. A queue record does not prove land control, local
                    approval, environmental clearance, final cost, available
                    capacity, or whether a nearby parcel has a clean path. Queue
                    data is a starting layer. It has to be read next to CEQA
                    filings, city and county records, parcel context, project
                    comparables, and utility-facing diligence.
                  </p>
                </div>
              </section>

              <section id="records" className="scroll-mt-24">
                <h2 className="font-serif text-3xl font-medium leading-tight text-ink">
                  CEQA and planning records often reveal the real development
                  questions
                </h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
                  <p>
                    CEQAnet, city planning portals, county agendas, notices of
                    intent, mitigated negative declarations, environmental impact
                    reports, and planning commission packets often contain the
                    practical details a project team needs: applicant names,
                    lead-agency contacts, parcels, site addresses, reviewing
                    agencies, public-comment windows, local approvals, and the
                    issues already flagged for review.
                  </p>
                  <p>
                    For BESS projects, these records can surface the risk areas
                    that do not show up in a simple parcel search: fire department
                    posture, hazardous-materials concerns, water and drainage,
                    noise, truck routing, biological resources, cultural review,
                    flood mapping, local opposition, and whether a conditional use
                    permit or additional state process may be involved.
                  </p>
                </div>
              </section>

              <section className="scroll-mt-24">
                <h2 className="font-serif text-3xl font-medium leading-tight text-ink">
                  The official-source workflow for a preliminary screen
                </h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
                  <p>
                    A strong preliminary screen should begin with official and
                    source-backed material before it reaches broader market
                    commentary. The first pass usually starts with CAISO and
                    utility-facing interconnection context, then moves into
                    CEQAnet, city or county planning portals, staff reports,
                    hearing notices, parcel records, FEMA flood mapping, CAL FIRE
                    mapping, and other public agency layers that can affect BESS
                    development.
                  </p>
                  <p>
                    The purpose is not to create a final approval opinion. The
                    purpose is to reduce ambiguity. If the public record already
                    shows a conditional use permit path, a known mitigation
                    pattern, a local ordinance issue, or a nearby comparable
                    project, that context should be visible before the team
                    spends heavily on the wrong site.
                  </p>
                </div>
              </section>

              <section id="framework" className="scroll-mt-24">
                <h2 className="font-serif text-3xl font-medium leading-tight text-ink">
                  A practical preliminary screening framework
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
                  Before a site receives deeper engineering or legal spend, the
                  public-record screen should make four things visible.
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {diligenceAreas.map((area) => (
                    <div key={area.title} className="surface-card p-5">
                      <h3 className="text-base font-semibold text-ink">
                        {area.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {area.body}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="scroll-mt-24">
                <h2 className="font-serif text-3xl font-medium leading-tight text-ink">
                  Six fatal-flaw questions to ask before a site moves forward
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
                  These are not final feasibility questions. They are triage
                  questions that help a team decide whether a parcel deserves the
                  next level of diligence.
                </p>
                <ol className="mt-6 space-y-3">
                  {fatalFlawQuestions.map((question, index) => (
                    <li
                      key={question}
                      className="flex gap-4 rounded-lg border border-line bg-card p-4"
                    >
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-emerald/30 bg-emerald/10 font-mono text-xs font-semibold text-emerald">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm leading-7 text-muted-foreground">
                        {question}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="scroll-mt-24">
                <h2 className="font-serif text-3xl font-medium leading-tight text-ink">
                  Red flags that deserve a closer look
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
                  A red flag is not always a reason to abandon a site. It is a
                  reason to stop treating the site as clean until the right
                  specialist has looked at the issue.
                </p>
                <div className="mt-6 space-y-3">
                  {redFlags.map((flag) => (
                    <div
                      key={flag}
                      className="flex gap-3 rounded-lg border border-line bg-background p-4"
                    >
                      <Siren className="mt-1 size-4 shrink-0 text-amber" />
                      <p className="text-sm leading-7 text-muted-foreground">
                        {flag}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="handoff" className="scroll-mt-24">
                <h2 className="font-serif text-3xl font-medium leading-tight text-ink">
                  The goal is not certainty. The goal is a better diligence
                  handoff.
                </h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
                  <p>
                    Early site screening should avoid false precision. A parcel
                    is not automatically viable because it is near a substation,
                    and it is not automatically dead because one public layer is
                    messy. The useful deliverable is a sourced brief that
                    separates verified records, unknowns, conflicts, and deeper
                    diligence questions.
                  </p>
                  <p>
                    That is the role of a GeoSpatia preliminary site screen. We
                    assemble the public evidence around a candidate California
                    BESS site, organize the record trail, and highlight the
                    questions your team can take to engineers, counsel, planning
                    staff, utility contacts, or environmental consultants.
                  </p>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <Link
                    href="/#candidate-locator"
                    className="rounded-lg border border-line bg-card p-5 transition-colors hover:border-emerald/40"
                  >
                    <MapPinned className="size-5 text-emerald" />
                    <h3 className="mt-3 text-sm font-semibold text-ink">
                      Preview a location
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Search or drag the map to the candidate parcel context.
                    </p>
                  </Link>
                  <Link
                    href="/sample-report"
                    className="rounded-lg border border-line bg-card p-5 transition-colors hover:border-emerald/40"
                  >
                    <FileText className="size-5 text-emerald" />
                    <h3 className="mt-3 text-sm font-semibold text-ink">
                      Review the brief structure
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      See the nine-part evidence framework used in a screen.
                    </p>
                  </Link>
                  <Link
                    href="/request"
                    className="rounded-lg border border-line bg-card p-5 transition-colors hover:border-emerald/40"
                  >
                    <ArrowRight className="size-5 text-emerald" />
                    <h3 className="mt-3 text-sm font-semibold text-ink">
                      Request scope review
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Submit a candidate site and confirm fit before payment.
                    </p>
                  </Link>
                </div>
                <div className="mt-8 rounded-lg border border-line bg-background p-5 sm:p-6">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        Have a candidate parcel, APN, address, or coordinate set?
                      </p>
                      <p className="mt-1 max-w-2xl text-sm leading-7 text-muted-foreground">
                        Preview the location on the map, then submit it for scope
                        review. If it fits the current California BESS coverage,
                        GeoSpatia confirms the research scope before any payment
                        step.
                      </p>
                    </div>
                    <Button asChild className="gap-2 bg-emerald text-emerald-foreground hover:bg-emerald-soft">
                      <Link href="/request">
                        Submit a Candidate Site
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </section>

              <section className="scroll-mt-24">
                <div className="rounded-lg border border-line bg-muted/50 p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <Siren className="mt-1 size-5 shrink-0 text-amber" />
                    <div>
                      <h2 className="text-base font-semibold text-ink">
                        Preliminary research boundary
                      </h2>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        GeoSpatia site screens are preliminary research products.
                        They are not engineering, legal, agency, utility, or
                        financial determinations. Final feasibility, capacity,
                        interconnection cost, permit outcome, and entitlement
                        status remain with the relevant utilities, agencies,
                        engineers, consultants, and legal professionals.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ink">
                  Public sources worth checking
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {sourceLinks.map((source) => (
                    <a
                      key={source.href}
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-line bg-card p-4 text-sm font-medium text-muted-foreground transition-colors hover:border-emerald/40 hover:text-ink"
                    >
                      {source.label}
                    </a>
                  ))}
                </div>
              </section>

              <RelatedArticles currentSlug="bess-site-screening" />
            </div>
          </article>
        </div>
      </Section>
    </div>
  );
}
