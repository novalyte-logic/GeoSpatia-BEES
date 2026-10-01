"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FileText,
  ShieldCheck,
  Compass,
  BatteryCharging,
  SunMedium,
  PlugZap,
  Layers3,
} from "lucide-react";
import { TopographicParcelBg } from "./topographic-bg";

const deliverablePreviews = [
  {
    label: "BESS site screen",
    title: "What deserves the deeper look?",
    icon: BatteryCharging,
    site: "Covina Reliability-style BESS candidate",
    summary:
      "Preliminary public-record screen across POI context, CEQA posture, zoning, fire-safety signals, and next diligence questions.",
    signals: [
      "CAISO and utility-facing queue context",
      "CEQA and planning-record pathway",
      "Fire, flood, access, and nearby-project flags",
    ],
    status: "Ready for scope review",
  },
  {
    label: "Solar + storage screen",
    title: "Can the parcel support a hybrid thesis?",
    icon: SunMedium,
    site: "Solar-plus-storage shortlist parcel",
    summary:
      "Structured look at land use, project comparables, transmission adjacency, environmental constraints, and source-backed unknowns.",
    signals: [
      "Solar and BESS entitlement comparables",
      "Parcel, acreage, and jurisdiction context",
      "Environmental and public-agency review cues",
    ],
    status: "Evidence gaps separated",
  },
  {
    label: "EV charging screen",
    title: "Does location context support the use case?",
    icon: PlugZap,
    site: "Fleet or corridor charging candidate",
    summary:
      "Preliminary screen of site access, utility context, surrounding demand generators, zoning signals, and permitting questions.",
    signals: [
      "Access, frontage, and land-use checks",
      "Utility and substation proximity context",
      "Questions for power, civil, and permitting teams",
    ],
    status: "Next-step questions drafted",
  },
  {
    label: "Grid-adjacent land screen",
    title: "Is the land worth diligence bandwidth?",
    icon: Layers3,
    site: "Transmission-adjacent parcel cluster",
    summary:
      "A source-backed brief that turns scattered GIS, agency, and project records into a focused early-stage decision packet.",
    signals: [
      "Public source register",
      "Unknowns and conflicts highlighted",
      "Comparable project activity summarized",
    ],
    status: "Decision packet preview",
  },
];

export function Hero() {
  const [activePreview, setActivePreview] = React.useState(0);
  const preview = deliverablePreviews[activePreview];
  const Icon = preview.icon;

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setActivePreview((current) => (current + 1) % deliverablePreviews.length);
    }, 5000);

    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line bg-background"
    >
      {/* Background motif */}
      <div className="absolute inset-0 text-ink">
        <TopographicParcelBg variant="hero" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-10 px-5 py-16 sm:px-6 md:py-20 lg:grid-cols-12 lg:gap-12 lg:px-10 xl:px-16 lg:py-24">
        {/* Copy */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-emerald shadow-sm backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-emerald" />
            Preliminary Site Intelligence for Energy Development
          </div>

          <h1 className="mt-5 display-xl text-ink text-balance">
            Know what deserves
            <br className="hidden sm:block" />{" "}
            <span className="relative inline-block text-emerald">
              a deeper look
              <span
                className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-emerald/30"
                aria-hidden="true"
              />
              <span
                className="absolute -bottom-1 left-0 h-1.5 w-2/3 rounded-full bg-emerald/80"
                aria-hidden="true"
              />
            </span>
            .
          </h1>

          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground text-pretty">
            GeoSpatia Labs brings together source-backed grid, interconnection,
            parcel, permitting, environmental, and project context into a
            manually prepared brief — helping California BESS development teams
            screen candidate sites before committing deeper engineering or legal
            spend.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              asChild
              className="gap-2 bg-emerald text-emerald-foreground shadow-sm hover:bg-emerald-soft cursor-pointer"
            >
              <Link href="/request">
                Reserve a Paid Site Screen
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="gap-2 border-line bg-card/70 backdrop-blur-sm hover:bg-muted cursor-pointer"
            >
              <Link href="/sample-report">
                <FileText className="size-4" />
                What a Brief Covers
              </Link>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-emerald" />
              Launch pricing from $1,500/site · Scope reviewed first
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Compass className="size-4 text-emerald" />
              Search or drag map pin to evaluate candidate sites
            </span>
          </div>
        </div>

        {/* Right side: rotating deliverable preview */}
        <div className="lg:col-span-6 w-full">
          <div className="relative min-h-[560px]">
            <div
              className="absolute -right-3 -top-3 hidden h-[calc(100%+6px)] w-[calc(100%+6px)] rounded-xl border border-line bg-muted/60 shadow-sm lg:block"
              aria-hidden="true"
            />
            <div className="surface-card relative overflow-hidden p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald">
                    Sample deliverable canvas
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Rotating preview of what a paid screen gives back.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full border border-emerald/25 bg-emerald/10 px-2.5 py-1 text-xs font-medium text-emerald">
                  <span className="size-1.5 rounded-full bg-emerald" />
                  Live sample
                </div>
              </div>

              <div className="mt-5 rounded-lg border border-line bg-background p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      <Icon className="size-3.5 text-emerald" />
                      {preview.label}
                    </div>
                    <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-ink text-balance">
                      {preview.title}
                    </h2>
                    <p className="mt-2 text-sm font-medium text-ink-soft">
                      {preview.site}
                    </p>
                  </div>
                  <span className="rounded-md border border-line bg-muted px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                    PREVIEW
                  </span>
                </div>

                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  {preview.summary}
                </p>

                <div className="mt-5 grid gap-3">
                  {preview.signals.map((signal) => (
                    <div
                      key={signal}
                      className="flex items-start gap-3 rounded-md border border-line-soft bg-card p-3"
                    >
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald" />
                      <span className="text-sm leading-6 text-muted-foreground">
                        {signal}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-lg border border-line bg-muted/50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Screen status
                    </span>
                    <span className="text-sm font-semibold text-ink">
                      {preview.status}
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full rounded-full bg-emerald transition-all duration-500"
                      style={{
                        width: `${((activePreview + 1) / deliverablePreviews.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-4 gap-2">
                {deliverablePreviews.map((item, index) => {
                  const PreviewIcon = item.icon;
                  const active = index === activePreview;

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setActivePreview(index)}
                      className={[
                        "flex min-h-14 items-center justify-center rounded-md border transition-colors",
                        active
                          ? "border-emerald/40 bg-emerald/10 text-emerald"
                          : "border-line bg-card text-muted-foreground hover:text-ink",
                      ].join(" ")}
                      aria-label={`Show ${item.label} preview`}
                    >
                      <PreviewIcon className="size-4" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
