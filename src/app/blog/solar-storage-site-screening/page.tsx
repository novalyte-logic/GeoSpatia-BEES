import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  MapPinned,
  ShieldCheck,
  Siren,
  SunMedium,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/geospatial/section";
import { RelatedArticles } from "@/components/geospatial/related-articles";

export const metadata: Metadata = {
  title:
    "How Solar + Storage Developers Can Screen Hybrid Sites Before Land and Interconnection Decisions",
  description:
    "A source-backed diligence workflow for hybrid solar and storage teams comparing parcels, POIs, permitting paths, and environmental constraints.",
  keywords: [
    "solar storage site screening",
    "solar plus storage site selection",
    "hybrid solar BESS interconnection",
    "solar storage permitting California",
    "solar plus storage CEQA",
    "renewable energy parcel screening",
  ],
  alternates: {
    canonical: "https://geospatialabs.com/blog/solar-storage-site-screening",
  },
  openGraph: {
    title:
      "How Solar + Storage Developers Can Screen Hybrid Sites Before Land and Interconnection Decisions",
    description:
      "A practical screening framework for hybrid solar and storage teams comparing candidate parcels before deeper diligence.",
    url: "https://geospatialabs.com/blog/solar-storage-site-screening",
    type: "article",
  },
};

const screenAreas = [
  "Interconnection posture and whether the hybrid project has a credible POI story.",
  "Parcel size, shape, access, slope, and whether storage equipment changes the land thesis.",
  "Local permitting path, including CUP triggers, public hearing history, and CEQA expectations.",
  "Environmental constraints such as flood, habitat, cultural, agricultural, and fire overlays.",
  "Nearby solar, storage, transmission, and gen-tie activity that can reveal agency precedent.",
];

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
    label: "California Energy Commission siting resources",
    href: "https://www.energy.ca.gov/about/divisions-and-offices/siting-environmental-protection-transmission",
  },
  {
    label: "GO-Biz renewable energy permitting initiative",
    href: "https://static.business.ca.gov/industries/climate-and-clean-energy/go-biz-renewable-energy-permitting-initiative/",
  },
];

export default function SolarStorageSiteScreeningPage() {
  return (
    <div className="bg-background">
      <Section className="relative overflow-hidden border-b border-line bg-background py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-45">
          <div className="grid-bg absolute inset-0 mask-fade-b" />
        </div>
        <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald shadow-sm">
              <SunMedium className="size-3.5" />
              Solar + Storage Site Diligence
            </div>
            <h1 className="mt-5 max-w-5xl font-serif text-4xl font-medium leading-tight text-ink text-balance md:text-6xl">
              How <span className="text-emerald">solar + storage</span> teams
              can screen hybrid sites before land and{" "}
              <span className="text-emerald">interconnection decisions</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              A hybrid site is not just a solar parcel with batteries attached.
              Storage changes the equipment footprint, fire-safety questions,
              interconnection strategy, entitlement path, and the public-record
              evidence a development team should review before committing
              serious diligence bandwidth.
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
                  See Brief Structure
                  <FileText className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <aside className="surface-card p-5 lg:col-span-4">
            <p className="text-sm font-semibold text-ink">Why hybrid screens are different</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Solar + storage diligence has to reconcile generation, storage,
              land use, queue strategy, permitting posture, and environmental
              constraints in one early decision packet.
            </p>
          </aside>
        </div>
      </Section>

      <Section className="border-b border-line bg-card/35 py-14 md:py-16">
        <article className="mx-auto max-w-4xl space-y-12">
          <section>
            <h2 className="font-serif text-3xl font-medium leading-tight text-ink">
              The early hybrid question is not only acreage.
            </h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
              <p>
                A parcel can have attractive solar irradiance, a willing
                landowner, and apparent proximity to transmission, yet still
                struggle once storage, gen-tie design, fire access, CEQA review,
                and local entitlement posture are added to the picture. Hybrid
                projects create more ways for a site to be promising and more
                ways for the same site to become expensive to carry.
              </p>
              <p>
                Preliminary screening gives development teams a way to organize
                the public evidence before the project becomes a full
                engineering, legal, environmental, or interconnection exercise.
                The goal is to make the next diligence spend more focused, not
                to pretend public records can answer every technical question.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-medium leading-tight text-ink">
              What should a solar + storage screen assemble?
            </h2>
            <div className="mt-6 grid gap-3">
              {screenAreas.map((area) => (
                <div key={area} className="flex gap-3 rounded-lg border border-line bg-card p-4">
                  <ShieldCheck className="mt-1 size-4 shrink-0 text-emerald" />
                  <p className="text-sm leading-7 text-muted-foreground">{area}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-medium leading-tight text-ink">
              The hidden risk is carrying a weak site too long.
            </h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
              <p>
                Hybrid developers often compare sites across imperfect
                information: land availability, interconnection assumptions,
                queue congestion, local opposition risk, site access, and
                environmental constraints. A preliminary screen helps separate
                what is verified in public records from what is still an
                assumption.
              </p>
              <p>
                That distinction matters because a team can spend weeks
                advancing a site that already shows warning signs in CEQA
                filings, county records, utility-facing queue context, or nearby
                project precedent. Early evidence does not eliminate risk, but it
                keeps risk visible.
              </p>
            </div>
          </section>

          <section>
            <div className="rounded-lg border border-line bg-background p-5 sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Comparing hybrid solar + storage candidates?
                  </p>
                  <p className="mt-1 max-w-2xl text-sm leading-7 text-muted-foreground">
                    Submit a parcel, APN, address, or coordinate set. GeoSpatia
                    can review whether the current source coverage supports a
                    preliminary screen before any payment step.
                  </p>
                </div>
                <Button asChild className="gap-2 bg-emerald text-emerald-foreground hover:bg-emerald-soft">
                  <Link href="/request">
                    Request Scope Review
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <section>
            <div className="rounded-lg border border-line bg-muted/50 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Siren className="mt-1 size-5 shrink-0 text-amber" />
                <p className="text-sm leading-7 text-muted-foreground">
                  Preliminary site screens are not engineering, legal, utility,
                  or agency determinations. Final project feasibility and
                  approvals remain with qualified professionals and relevant
                  authorities.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold text-ink">Public sources worth checking</h2>
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

          <RelatedArticles currentSlug="solar-storage-site-screening" />
        </article>
      </Section>
    </div>
  );
}
