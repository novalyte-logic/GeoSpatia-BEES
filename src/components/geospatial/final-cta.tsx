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
      <div className="absolute inset-0 text-ink" aria-hidden="true">
        <TopographicParcelBg variant="soft" />
      </div>

      <div className="surface-card relative mx-auto w-full max-w-4xl overflow-hidden px-6 py-12 sm:px-12 sm:py-14">
        <div className="absolute right-0 top-0 -mr-20 -mt-20 size-56 rounded-full bg-emerald/8 blur-2xl" aria-hidden="true" />

        <div className="relative">
          <span className="eyebrow inline-flex items-center gap-2 text-emerald">
            <span className="h-px w-5 bg-emerald/50" />
            Founder-led launch offer
          </span>
          <h2 className="mt-3 display-md text-ink text-balance">
            Before option spend, get the public evidence organized.
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-muted-foreground text-pretty">
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
              className="gap-2 bg-emerald text-emerald-foreground shadow-sm hover:bg-emerald-soft"
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
              className="gap-2 border-line bg-card hover:bg-muted"
            >
              <Link href="/sample-report">
                <FileText className="size-4" />
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
