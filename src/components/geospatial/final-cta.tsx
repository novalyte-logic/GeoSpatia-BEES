"use client";

import { Section } from "./section";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { TopographicParcelBg } from "./topographic-bg";

export function FinalCta({
  onRequest,
  onSample,
}: {
  onRequest: () => void;
  onSample: () => void;
}) {
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
            Final CTA
          </span>
          <h2 className="mt-3 display-md text-ink text-balance">
            Before deeper diligence, get the evidence organized.
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-muted-foreground text-pretty">
            Send us a candidate California BESS site and tell us what you are
            evaluating. We’ll review whether it fits the current screening scope
            — and if it does, we’ll return a structured preliminary intelligence
            brief with sources, findings, unknowns, and next-step questions.
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
              className="gap-2 border-line bg-card hover:bg-muted"
            >
              <FileText className="size-4" />
              See a Sample Report
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Privacy: we use the information you submit solely to evaluate and
            respond to your request. We don’t sell data and won’t pretend a
            submission succeeded when it hasn’t.
          </p>
        </div>
      </div>
    </Section>
  );
}
