"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FileText,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { TopographicParcelBg } from "./topographic-bg";
import { InteractiveLocatorMap } from "./interactive-locator-map";

export function Hero() {
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
            Geospatial Labs brings together source-backed grid, interconnection,
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
                Request a Site Screen
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
              Source-backed research · Transparent unknowns
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Compass className="size-4 text-emerald" />
              Search or drag map pin to evaluate candidate sites
            </span>
          </div>
        </div>

        {/* Right side: Real Interactive Expandable Mapbox */}
        <div className="lg:col-span-6 w-full">
          <div className="relative">
            {/* Visual background depth layer */}
            <div
              className="absolute -right-3 -top-3 hidden h-[calc(100%+6px)] w-[calc(100%+6px)] rounded-xl border border-line bg-muted/60 shadow-sm lg:block"
              aria-hidden="true"
            />
            <InteractiveLocatorMap />
          </div>
        </div>
      </div>
    </section>
  );
}
