import { Section, SectionHeading } from "./section";
import { BrandMark } from "./brand";

export function About() {
  return (
    <Section
      id="about"
      className="border-b border-line bg-background py-20 md:py-24"
    >
      <SectionHeading
        eyebrow="About"
        title="Building an evidence-first research workflow"
        intro="GeoSpatia Labs is a small, focused effort to build an evidence-first research workflow for early infrastructure development decisions — starting with California battery-energy-storage site screening."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="surface-card flex h-full flex-col gap-5 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <BrandMark size={40} />
              <div>
                <p className="text-base font-semibold text-ink">
                  GeoSpatia <span className="text-emerald">Labs</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Preliminary site intelligence for energy development
                </p>
              </div>
            </div>

            <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                GeoSpatia Labs is building an evidence-first research workflow
                for early infrastructure development decisions. The starting
                point is a real, repeated problem: development teams evaluate
                many candidate sites, and the relevant public information is
                scattered across agencies, utilities, filings, maps, and
                documents.
              </p>
              <p>
                The first product is a preliminary site screen — a structured
                brief that organizes grid, interconnection, parcel, permitting,
                environmental, and project context into source-backed findings.
                Unknown information stays unknown. Conflicting information is
                flagged. Source facts are clearly distinguished from analysis.
              </p>
              <p>
                We are deliberately modest about what we claim. We don’t publish
                customer names, invented site counts, or proprietary coverage
                figures we can’t stand behind. The Sample Report shows the
                structure of a paid screen using illustrative data.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="surface-quiet flex h-full flex-col gap-4 p-6 sm:p-8">
            <h3 className="text-base font-semibold text-ink">
              What we won’t claim
            </h3>
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              {[
                "That we replace engineering, utility studies, or agency determinations.",
                "That we guarantee interconnection capacity, feasibility, cost, or approvals.",
                "That we know real-time grid headroom without an authoritative source for it.",
                "That we offer nationwide coverage at launch (we don’t — California BESS today).",
                "Customer logos, testimonials, or case studies we cannot substantiate.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto rounded-lg border border-emerald/25 bg-emerald/8 p-4">
              <p className="text-sm font-medium text-ink">
                What we will claim
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                That a source-backed preliminary screen helps teams focus deeper
                diligence where it’s most warranted — and exposes open questions
                earlier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
