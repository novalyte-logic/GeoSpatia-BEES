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
  Activity,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  MapPin,
  Zap,
} from "lucide-react";
import { TopographicParcelBg } from "./topographic-bg";

const deliverablePreviews = [
  {
    label: "BESS site screen",
    title: "Preliminary BESS site-screen preview",
    icon: BatteryCharging,
    site: "Candidate BESS parcel · Review-stage screen",
    summary:
      "Candidate parcel context, approval signals, and development-risk indicators organized into a concise diligence preview.",
    signals: [
      { label: "Land-use compatibility", value: "Early signal", tone: "good" },
      { label: "CEQA / review complexity", value: "Watch item", tone: "watch" },
      { label: "Fire code visibility", value: "Priority", tone: "risk" },
      { label: "Grid-adjacent fit", value: "Favorable", tone: "good" },
    ],
    risks: [
      "Emergency-response narrative should be prepared early.",
      "Interconnection context needs utility and queue validation.",
      "Access, drainage, and nearby receptors should be checked before deeper spend.",
    ],
    grid: "Nearby substation / transmission context · capacity not claimed",
    status: "Source-backed preview",
  },
  {
    label: "Solar + storage screen",
    title: "Solar + storage parcel preview",
    icon: SunMedium,
    site: "Hybrid shortlist parcel · Land and grid context",
    summary:
      "Structured look at acreage, land-use fit, transmission adjacency, constraints, and questions to validate before layout work.",
    signals: [
      { label: "Developable area", value: "Needs check", tone: "watch" },
      { label: "Transmission adjacency", value: "Favorable", tone: "good" },
      { label: "Slope / drainage", value: "Watch item", tone: "watch" },
      { label: "Entitlement comparables", value: "Visible", tone: "good" },
    ],
    risks: [
      "Parcel aggregation and setbacks may drive usable acreage.",
      "Environmental constraints should be separated from layout assumptions.",
      "Hybrid interconnection path needs queue and utility review.",
    ],
    grid: "Transmission corridor and collector-substation context · needs validation",
    status: "Evidence gaps separated",
  },
  {
    label: "EV charging screen",
    title: "Fleet charging site preview",
    icon: PlugZap,
    site: "Depot / corridor candidate · Utility and access screen",
    summary:
      "Site access, utility context, surrounding demand generators, zoning signals, and upgrade-risk questions in one view.",
    signals: [
      { label: "Access / frontage", value: "Favorable", tone: "good" },
      { label: "Load-serving context", value: "Needs check", tone: "watch" },
      { label: "Fleet demand signal", value: "Visible", tone: "good" },
      { label: "Upgrade risk", value: "Priority", tone: "risk" },
    ],
    risks: [
      "Distribution upgrade exposure should be screened early.",
      "Ingress, queuing, and fleet circulation can reshape site viability.",
      "Local permitting questions should be separated from power questions.",
    ],
    grid: "Distribution and substation proximity context · load study still required",
    status: "Next-step questions drafted",
  },
  {
    label: "Grid-adjacent land screen",
    title: "Grid-adjacent land preview",
    icon: Layers3,
    site: "Transmission-adjacent parcel cluster",
    summary:
      "A source-backed early screen that turns scattered GIS, agency, and project records into a focused decision packet.",
    signals: [
      { label: "Parcel cluster fit", value: "Early signal", tone: "good" },
      { label: "Planning pathway", value: "Needs check", tone: "watch" },
      { label: "Nearby constraints", value: "Watch item", tone: "watch" },
      { label: "Comparable activity", value: "Visible", tone: "good" },
    ],
    risks: [
      "Grid adjacency does not equal available interconnection capacity.",
      "Land-use compatibility should be checked before outreach.",
      "Comparable projects can reveal likely review friction.",
    ],
    grid: "Transmission-adjacent parcel cluster · source-backed context only",
    status: "Decision packet preview",
  },
];

const toneClass = {
  good: "border-emerald/25 bg-emerald/10 text-emerald",
  watch: "border-amber-300/40 bg-amber-100/60 text-amber-800",
  risk: "border-rose-300/40 bg-rose-100/70 text-rose-800",
} as const;

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
      <div className="absolute inset-0 text-ink overflow-hidden pointer-events-none" aria-hidden="true">
        <TopographicParcelBg variant="hero" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-8 px-4 min-[375px]:px-5 py-12 sm:px-6 md:py-20 lg:grid-cols-12 lg:gap-12 lg:px-10 xl:px-16 lg:py-24">
        {/* Copy */}
        <div className="lg:col-span-6 min-w-0">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-card/80 px-3 py-1.5 text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[0.06em] min-[390px]:tracking-[0.14em] text-emerald shadow-sm backdrop-blur-sm">
            <span className="size-1.5 shrink-0 rounded-full bg-emerald" />
            <span className="truncate min-[420px]:whitespace-normal break-words">
              Preliminary Site Intelligence for Energy Development
            </span>
          </div>

          <h1 className="mt-4 sm:mt-5 display-xl text-ink text-balance break-words">
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

          <p className="mt-4 sm:mt-6 max-w-xl text-[0.9375rem] sm:text-[1.0625rem] leading-relaxed text-muted-foreground text-pretty">
            GeoSpatia Labs brings together source-backed grid, interconnection,
            parcel, permitting, environmental, and project context into a
            manually prepared brief — helping California BESS development teams
            screen candidate sites before committing deeper engineering or legal
            spend.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto gap-2 bg-emerald text-emerald-foreground shadow-sm hover:bg-emerald-soft cursor-pointer text-sm sm:text-base h-11 sm:h-12"
            >
              <Link href="/request">
                Reserve a Paid Site Screen
                <ArrowRight className="size-4 shrink-0" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto gap-2 border-line bg-card/70 backdrop-blur-sm hover:bg-muted cursor-pointer text-sm sm:text-base h-11 sm:h-12"
            >
              <Link href="/sample-report">
                <FileText className="size-4 shrink-0" />
                What a Brief Covers
              </Link>
            </Button>
          </div>

          <div className="mt-5 sm:mt-6 flex flex-col gap-2 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-center min-[480px]:gap-4 text-xs text-muted-foreground">
            <div className="inline-flex max-w-full items-center gap-1.5">
              <ShieldCheck className="size-4 shrink-0 text-emerald" />
              <span className="break-words">Launch pricing from $1,500/site · Scope reviewed first</span>
            </div>
            <div className="inline-flex max-w-full items-center gap-1.5">
              <Compass className="size-4 shrink-0 text-emerald" />
              <span className="break-words">Search or drag map pin to evaluate candidate sites</span>
            </div>
          </div>
        </div>

        {/* Right side: rotating deliverable preview */}
        <div className="lg:col-span-6 w-full min-w-0">
          <div className="relative">
            <div
              className="absolute -right-3 -top-3 hidden h-[calc(100%+6px)] w-[calc(100%+6px)] rounded-xl border border-line bg-muted/60 shadow-sm lg:block"
              aria-hidden="true"
            />
            <div className="surface-card relative overflow-hidden p-3.5 shadow-sm sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3.5 sm:pb-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald">
                    Customer sample preview
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                    Approval signals, risk indicators, and next diligence questions.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full border border-emerald/25 bg-emerald/10 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-medium text-emerald">
                  <span className="size-1.5 rounded-full bg-emerald" />
                  Rotating sample
                </div>
              </div>

              <div className="mt-3.5 sm:mt-4 overflow-hidden rounded-lg border border-line bg-background">
                <div className="border-b border-line bg-[#063b31] p-3.5 text-white sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-medium text-emerald-100">
                        <Icon className="size-3.5 shrink-0" />
                        <span className="truncate">{preview.label}</span>
                      </div>
                      <h2 className="mt-3 sm:mt-4 font-serif text-xl sm:text-2xl lg:text-3xl font-medium leading-tight text-balance">
                        {preview.title}
                      </h2>
                      <p className="mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-emerald-100/85">
                        {preview.summary}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-md border border-white/15 bg-white/10 px-2 py-1 font-mono text-[10px] text-emerald-100">
                      PREVIEW
                    </span>
                  </div>
                </div>

                <div className="grid gap-3.5 p-3.5 sm:gap-4 sm:p-5 xl:grid-cols-[0.86fr_1.14fr]">
                  <div className="space-y-3 sm:space-y-4 min-w-0">
                    <div className="rounded-lg border border-line bg-card p-3 sm:p-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        <MapPin className="size-3.5 text-emerald shrink-0" />
                        Site Context
                      </div>
                      <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold leading-snug sm:leading-6 text-ink break-words">
                        {preview.site}
                      </p>
                      <div className="mt-2 sm:mt-3 space-y-1.5 text-xs leading-5 text-muted-foreground">
                        <p>Review path: CEQA / local planning context</p>
                        <p>Stage: preliminary screening preview</p>
                        <p>Output: source-backed watch items</p>
                      </div>
                    </div>

                    <div className="relative h-32 sm:h-44 overflow-hidden rounded-lg border border-line bg-muted shadow-inner">
                      <div
                        className="absolute inset-0 opacity-35"
                        style={{
                          backgroundImage:
                            "radial-gradient(currentColor 1px, transparent 1px)",
                          backgroundSize: "14px 14px",
                        }}
                      />
                      <div className="absolute inset-x-0 top-1/2 h-px -rotate-12 bg-emerald/60" />
                      <div className="absolute left-[18%] top-[30%] h-14 w-20 sm:h-16 sm:w-24 rotate-[-7deg] rounded border-2 border-emerald bg-emerald/15 shadow-sm" />
                      <div className="absolute right-[20%] top-[22%] flex size-7 sm:size-8 items-center justify-center rounded-full border-2 border-background bg-sky-600 text-white shadow-sm">
                        <Zap className="size-3.5 sm:size-4" />
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 rounded-md border border-line bg-background/90 p-1.5 sm:p-2 text-[9.5px] sm:text-[10px] text-muted-foreground shadow-sm backdrop-blur">
                        <div className="flex items-center justify-between gap-2 min-w-0">
                          <span className="truncate">{preview.grid}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4 min-w-0">
                    <div className="grid grid-cols-2 gap-2">
                      {preview.signals.map((signal) => (
                        <div
                          key={signal.label}
                          className="rounded-md border border-line bg-card p-2 sm:p-3 min-w-0"
                        >
                          <p className="text-[11px] sm:text-xs font-medium leading-tight sm:leading-5 text-muted-foreground truncate">
                            {signal.label}
                          </p>
                          <span
                            className={[
                              "mt-1.5 inline-flex rounded-full border px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold",
                              toneClass[signal.tone as keyof typeof toneClass],
                            ].join(" ")}
                          >
                            {signal.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg border border-line bg-card p-3 sm:p-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        <Activity className="size-3.5 text-emerald shrink-0" />
                        Development-Risk Indicators
                      </div>
                      <div className="mt-2.5 space-y-1.5 sm:mt-3 sm:space-y-2">
                        {preview.risks.map((risk) => (
                          <div
                            key={risk}
                            className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                          >
                            <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-amber-600" />
                            <span className="break-words">{risk}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border border-line bg-muted/50 p-3 sm:p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <CheckCircle2 className="size-4 text-emerald shrink-0" />
                          <span className="text-xs sm:text-sm font-semibold text-ink truncate">
                            {preview.status}
                          </span>
                        </div>
                        <span className="shrink-0 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                          sample
                        </span>
                      </div>
                      <div className="mt-2 sm:mt-3 h-1.5 sm:h-2 overflow-hidden rounded-full bg-line">
                        <div
                          className="h-full rounded-full bg-emerald transition-all duration-500"
                          style={{
                            width: `${((activePreview + 1) / deliverablePreviews.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-line bg-muted/30 p-3 sm:p-4">
                  <div className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                    <HelpCircle className="mt-0.5 size-3.5 shrink-0 text-emerald" />
                    <span className="break-words">
                      Preview language stays preliminary: no guaranteed
                      interconnection capacity, no final engineering conclusion,
                      and no approval prediction.
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3.5 sm:mt-4 grid grid-cols-4 gap-2">
                {deliverablePreviews.map((item, index) => {
                  const PreviewIcon = item.icon;
                  const active = index === activePreview;

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setActivePreview(index)}
                      className={[
                        "flex min-h-11 sm:min-h-14 items-center justify-center rounded-md border transition-colors cursor-pointer",
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
