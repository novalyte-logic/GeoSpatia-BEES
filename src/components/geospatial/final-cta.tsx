"use client";

import Link from "next/link";
import { Section } from "./section";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { TopographicParcelBg } from "./topographic-bg";

export function FinalCta() {
  return (
    <Section
      id="final-cta"
      className="relative overflow-hidden bg-background py-20 md:py-24"
    >
      <div className="absolute inset-0 text-ink overflow-hidden pointer-events-none" aria-hidden="true">
        <TopographicParcelBg variant="soft" />
      </div>

      <div className="surface-card relative mx-auto w-full max-w-4xl overflow-hidden px-5 py-10 sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute top-0 right-0 sm:-top-10 sm:-right-10 size-44 rounded-full bg-emerald/8 blur-2xl max-w-full" aria-hidden="true" />

        <div className="relative">
          <span className="eyebrow inline-flex items-center gap-2 text-emerald">
            <span className="h-px w-5 bg-emerald/50" />
            Founder-led launch offer
          </span>
          <h2 className="mt-3 display-md text-ink text-balance break-words">
            Before option spend, get the public evidence organized.
          </h2>
          <p className="mt-4 max-w-2xl text-[0.9375rem] sm:text-[1.0625rem] leading-relaxed text-muted-foreground text-pretty">
            Send us a candidate California BESS site and tell us what you are
            evaluating. They can inspect the public sample brief first. If the
            site fits current scope, we confirm the paid screen by email and
            deliver a structured brief with sources, findings, unknowns,
            conflicts, and next-step questions — no call required.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
              className="w-full sm:w-auto gap-2 border-line bg-card hover:bg-muted cursor-pointer text-sm sm:text-base h-11 sm:h-12"
            >
              <Link href="/sample-report">
                <FileText className="size-4 shrink-0" />
                What a Brief Covers
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Launch pricing begins at $1,500/site. We review scope first; payment
            is handled after written confirmation, not through a sales call.
          </p>
        </div>
      </div>
    </Section>
  );
}
