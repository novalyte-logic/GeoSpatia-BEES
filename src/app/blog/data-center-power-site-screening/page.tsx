import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  FileText,
  MapPinned,
  ServerCog,
  ShieldCheck,
  Siren,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/geospatial/section";
import { RelatedArticles } from "@/components/geospatial/related-articles";

export const metadata: Metadata = {
  title:
    "How AI Data Center Teams Can Screen Power-Constrained Sites Before Committing to Land",
  description:
    "A preliminary screening framework for AI infrastructure teams evaluating power availability, grid context, permitting risk, and site constraints.",
  keywords: [
    "AI data center site selection",
    "data center power availability",
    "power constrained site screening",
    "data center interconnection diligence",
    "AI infrastructure land screening",
    "grid adjacent data center sites",
  ],
  alternates: {
    canonical: "https://geospatialabs.com/blog/data-center-power-site-screening",
  },
  openGraph: {
    title:
      "How AI Data Center Teams Can Screen Power-Constrained Sites Before Committing to Land",
    description:
      "A practical public-record screen for AI infrastructure teams comparing power-constrained sites before deeper diligence.",
    url: "https://geospatialabs.com/blog/data-center-power-site-screening",
    type: "article",
  },
};

const powerQuestions = [
  "What public transmission, substation, and utility context exists near the candidate site?",
  "Does the jurisdiction have land-use, zoning, or entitlement posture compatible with large-load infrastructure?",
  "Are there nearby energy, industrial, logistics, or data-center projects that reveal local precedent?",
  "What environmental, water, flood, fire, access, or community constraints appear in public records?",
  "Which assumptions require utility, engineering, legal, environmental, or real-estate specialist review?",
];

export default function DataCenterPowerSiteScreeningPage() {
  return (
    <div className="bg-background">
      <Section className="relative overflow-hidden border-b border-line bg-background py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-45">
          <div className="grid-bg absolute inset-0 mask-fade-b" />
        </div>
        <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald shadow-sm">
              <ServerCog className="size-3.5" />
              AI Data Center Power Diligence
            </div>
            <h1 className="mt-5 max-w-5xl font-serif text-4xl font-medium leading-tight text-ink text-balance md:text-6xl">
              How <span className="text-emerald">AI data center</span> teams
              can screen power-constrained sites before{" "}
              <span className="text-emerald">committing to land</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              For AI infrastructure, the site question is increasingly a power
              question. A parcel can look attractive from a real-estate lens and
              still fail on utility context, transmission constraints,
              permitting risk, water, access, or community acceptance.
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
            <Building2 className="size-5 text-emerald" />
            <p className="mt-3 text-sm font-semibold text-ink">
              Power-first land diligence
            </p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Early screening should combine grid-adjacent context, land-use
              posture, public agency records, and constraints before a site is
              treated as viable.
            </p>
          </aside>
        </div>
      </Section>

      <Section className="border-b border-line bg-card/35 py-14 md:py-16">
        <article className="mx-auto max-w-4xl space-y-12">
          <section>
            <h2 className="font-serif text-3xl font-medium leading-tight text-ink">
              The new data center bottleneck is not only land.
            </h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
              <p>
                AI workloads have changed the shape of data-center site
                selection. The strongest site is not simply the cheapest parcel
                with good fiber and road access. It is the site where land,
                utility context, permitting, water, environmental constraints,
                and community posture can support the scale and timing of the
                load.
              </p>
              <p>
                Public records cannot replace utility studies or engineering
                review. They can, however, help a team avoid treating every
                grid-adjacent parcel as equally plausible. The screen turns
                scattered agency, GIS, planning, and infrastructure signals into
                a preliminary decision packet.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-medium leading-tight text-ink">
              Questions to answer before deeper diligence
            </h2>
            <div className="mt-6 grid gap-3">
              {powerQuestions.map((question) => (
                <div key={question} className="flex gap-3 rounded-lg border border-line bg-card p-4">
                  <ShieldCheck className="mt-1 size-4 shrink-0 text-emerald" />
                  <p className="text-sm leading-7 text-muted-foreground">
                    {question}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-medium leading-tight text-ink">
              A preliminary power-site screen creates a better handoff.
            </h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
              <p>
                For AI data center teams, a useful early screen should not claim
                power availability. It should show what the public record
                supports, what it does not show, and which questions should go
                to utilities, engineers, counsel, permitting consultants, or
                local planning staff.
              </p>
              <p>
                That distinction is what makes the work commercially useful.
                The team does not need synthetic certainty. It needs a clear
                source trail, visible unknowns, and a cleaner basis for deciding
                which site deserves scarce diligence bandwidth.
              </p>
            </div>
          </section>

          <section>
            <div className="rounded-lg border border-line bg-background p-5 sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Evaluating a power-constrained land opportunity?
                  </p>
                  <p className="mt-1 max-w-2xl text-sm leading-7 text-muted-foreground">
                    Submit a candidate location for scope review. GeoSpatia can
                    confirm whether the source coverage supports a preliminary
                    screen before any payment step.
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
                  Preliminary site screens are not utility capacity,
                  engineering, legal, financial, or agency determinations. They
                  organize public evidence and questions for qualified next-stage
                  diligence.
                </p>
              </div>
            </div>
          </section>

          <RelatedArticles currentSlug="data-center-power-site-screening" />
        </article>
      </Section>
    </div>
  );
}
