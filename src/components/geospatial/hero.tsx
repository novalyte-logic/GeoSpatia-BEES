"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FileText,
  MapPin,
  ShieldCheck,
  Lock,
  Check,
  HelpCircle,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import { TopographicParcelBg } from "./topographic-bg";

export function Hero({
  onRequest,
  onSample,
}: {
  onRequest: () => void;
  onSample: () => void;
}) {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line bg-background"
    >
      {/* Background motif */}
      <div className="absolute inset-0 text-ink">
        <TopographicParcelBg variant="hero" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-5 py-16 sm:px-6 md:py-24 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-28">
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
            Geospatial Labs brings together source-backed grid, interconnection,
            parcel, permitting, environmental, and project context to help
            development teams screen candidate sites before committing deeper
            resources.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              onClick={onRequest}
              className="gap-2 bg-emerald text-emerald-foreground shadow-sm hover:bg-emerald-soft"
            >
              Request a Site Screen
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onSample}
              className="gap-2 border-line bg-card/70 backdrop-blur-sm hover:bg-muted"
            >
              <FileText className="size-4" />
              View Sample Report
            </Button>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-emerald" />
            Source-backed research. Clear unknowns. Built for preliminary
            diligence.
          </p>
        </div>

        {/* Report preview visual — original composition, not a screenshot */}
        <div className="lg:col-span-6">
          <HeroReportPreview />
        </div>
      </div>
    </section>
  );
}

/** A stylized, original "preliminary intelligence brief" preview card. */
function HeroReportPreview() {
  return (
    <div className="relative">
      {/* Stacked evidence cards behind — depth cue, only on large screens to avoid clipping on small/medium */}
      <div
        className="absolute -right-4 -top-4 hidden h-[calc(100%+8px)] w-[calc(100%+8px)] rounded-xl border border-line bg-muted/70 shadow-md lg:block"
        aria-hidden="true"
      />
      <div
        className="absolute -right-2 -top-2 hidden h-[calc(100%+4px)] w-[calc(100%+4px)] rounded-xl border border-line-soft bg-card shadow-md lg:block"
        aria-hidden="true"
      />

      <article className="surface-card relative overflow-hidden">
        {/* Report header band */}
        <header className="flex items-center justify-between gap-3 border-b border-line bg-muted/40 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-md bg-emerald/12 text-emerald">
              <FileText className="size-4" />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Preliminary Site Intelligence Brief
              </p>
              <p className="text-sm font-semibold text-ink">
                Site Screen · Illustrative sample
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-amber/30 bg-amber/8 px-2 py-0.5 text-[11px] font-medium text-amber">
            <Lock className="size-3" />
            DEMO DATA
          </span>
        </header>

        {/* Site marker / coordinates strip */}
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
          <div className="flex items-center gap-2 text-sm text-ink">
            <MapPin className="size-3.5 text-emerald" />
            <span className="font-medium">Candidate Site · Parcel 142-08-37</span>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            34.9532°N, 118.1234°W
          </span>
        </div>

        {/* Mini map / parcel illustration */}
        <div className="relative h-44 overflow-hidden border-b border-line bg-muted/30">
          <MiniParcelMap />
        </div>

        {/* Findings list */}
        <div className="divide-y divide-line-soft">
          {miniFindings.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="flex items-start gap-3 px-5 py-3">
                <span
                  className={cn(
                    "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full",
                    f.tone,
                  )}
                >
                  <Icon className="size-3" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">{f.label}</p>
                  <p className="truncate text-xs text-muted-foreground">{f.detail}</p>
                </div>
                <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                  {f.ref}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer of preview */}
        <footer className="flex items-center justify-between border-t border-line bg-muted/40 px-5 py-3">
          <span className="text-xs text-muted-foreground">
            6 evidence cards · 14 sources · 4 unknowns
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald">
            Open full brief
            <ArrowRight className="size-3" />
          </span>
        </footer>
      </article>
    </div>
  );
}

function MiniParcelMap() {
  return (
    <svg
      className="absolute inset-0 h-full w-full text-ink"
      viewBox="0 0 600 220"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="hm-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0 H0 V30" stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.08" fill="none" />
        </pattern>
      </defs>
      <rect width="600" height="220" fill="url(#hm-grid)" />

      {/* Roads */}
      <g stroke="var(--ink)" strokeOpacity="0.18" strokeWidth="2.2" fill="none">
        <path d="M-10 90 L 610 70" />
        <path d="M-10 165 L 610 180" />
        <path d="M220 -10 L 250 230" />
      </g>

      {/* Adjacent parcels */}
      <g stroke="var(--ink)" strokeOpacity="0.14" strokeWidth="1" fill="var(--muted)" fillOpacity="0.5">
        <polygon points="60,40 210,38 212,95 58,98" />
        <polygon points="260,40 410,42 408,98 262,96" />
        <polygon points="420,40 560,42 558,98 418,96" />
        <polygon points="60,180 210,182 212,210 58,210" />
        <polygon points="260,180 410,182 408,210 262,210" />
      </g>

      {/* Subject parcel — highlighted */}
      <polygon
        points="260,110 410,112 408,170 262,168"
        stroke="var(--emerald)"
        strokeWidth="2"
        fill="var(--emerald-tint)"
        fillOpacity="0.65"
      />
      {/* Pin */}
      <g transform="translate(335 140)">
        <circle r="7" fill="var(--emerald)" />
        <circle r="12" stroke="var(--emerald)" strokeWidth="1.4" fill="none" opacity="0.5" />
      </g>
      {/* Substation marker nearby */}
      <g transform="translate(470 60)">
        <rect x="-7" y="-7" width="14" height="14" rx="2" fill="var(--emerald)" fillOpacity="0.8" />
        <text x="0" y="3" textAnchor="middle" fontSize="8" fill="white" fontWeight="700">S</text>
      </g>
      <text x="470" y="44" fontSize="9" fill="var(--muted-foreground)" textAnchor="middle">
        substation (approx.)
      </text>
    </svg>
  );
}

const miniFindings: {
  icon: LucideIcon;
  label: string;
  detail: string;
  ref: string;
  tone: string;
}[] = [
  {
    icon: Check,
    label: "Parcel zoned for utility-scale storage",
    detail: "County zoning inventory lists parcel under heavy industrial use",
    ref: "SRC-03",
    tone: "bg-emerald/12 text-emerald",
  },
  {
    icon: HelpCircle,
    label: "Interconnection queue position — not located",
    detail: "Published queue data did not surface this site under available IDs",
    ref: "SRC-02",
    tone: "bg-muted text-muted-foreground",
  },
  {
    icon: AlertTriangle,
    label: "Conflicting permitting status across sources",
    detail: "County planning shows open CUP; state portal lists withdrawn",
    ref: "SRC-05 · 06",
    tone: "bg-amber/12 text-amber",
  },
  {
    icon: Check,
    label: "Adjacent project activity identified",
    detail: "Operational 50 MW BESS facility sited ~1.4 mi east, 2023 COD",
    ref: "SRC-11",
    tone: "bg-emerald/12 text-emerald",
  },
];
