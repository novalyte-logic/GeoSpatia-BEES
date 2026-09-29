"use client";

import * as React from "react";
import { Section, SectionHeading } from "./section";
import { MethodologyWorkflow } from "./methodology-workflow";
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  HelpCircle,
  AlertTriangle,
  Scale,
  Sparkles,
} from "lucide-react";

export function Methodology() {
  return (
    <Section
      id="methodology"
      className="border-b border-line bg-muted/60 py-20 md:py-24"
    >
      <SectionHeading
        eyebrow="Methodology & Diligence Standards"
        title="Evidence first. Transparent unknowns."
        intro="GeoSpatia Labs executes a disciplined, manually prepared research process. We assemble verifiable public records across agencies, identify material unknowns, and surface discrepancies before deeper capital commitments."
      />

      {/* Interactive Workflow Diagram & Stage Inspector */}
      <div className="mt-12">
        <MethodologyWorkflow />
      </div>

      {/* 5 Core Evidence Principles */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="surface-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
              <FileCheck2 className="size-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-ink">
              1. Source-Referenced Evidence
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Material findings include public source references where available. Source availability varies by jurisdiction, and not all data points may be publicly indexed.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-line-soft font-mono text-[11px] text-emerald">
            Rule: Zero uncited claims
          </div>
        </div>

        <div className="surface-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex size-9 items-center justify-center rounded-lg bg-amber/10 text-amber">
              <HelpCircle className="size-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-ink">
              2. Unknowns Stay Unknown
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We don’t manufacture certainty where the public record is silent. If a noise study or transformer capacity is unlisted, it is labeled Unknown with clear next steps.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-line-soft font-mono text-[11px] text-amber">
            Rule: Zero synthetic certainty
          </div>
        </div>

        <div className="surface-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex size-9 items-center justify-center rounded-lg bg-rose/10 text-rose">
              <AlertTriangle className="size-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-ink">
              3. Conflicts Are Surfaced
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              If the county planning portal shows a permit open while the state clearinghouse lists it as withdrawn, both records are surfaced side-by-side without averaging.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-line-soft font-mono text-[11px] text-rose">
            Rule: Zero smoothing of discrepancies
          </div>
        </div>

        <div className="surface-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex size-9 items-center justify-center rounded-lg bg-azure/10 text-azure">
              <Scale className="size-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-ink">
              4. Fact vs Inference Distinction
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              What is published statutory fact versus what GeoSpatia Labs infers or recommends is clearly demarcated in distinct report sections and confidence tiers.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-line-soft font-mono text-[11px] text-azure">
            Rule: Explicit confidence tiers
          </div>
        </div>

        <div className="surface-card p-6 flex flex-col justify-between sm:col-span-2 lg:col-span-2">
          <div>
            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
              <ShieldCheck className="size-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-ink">
              5. Preliminary Intelligence, Not Final Engineering
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              GeoSpatia Labs arms development teams with early-stage site intelligence to decide whether to advance to option agreements. Final approvals, capacity, and stamps rest with utilities, structural/civil engineers, and regulatory authorities.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-line-soft font-mono text-[11px] text-emerald">
            Rule: Clear legal & diligence boundaries
          </div>
        </div>
      </div>
    </Section>
  );
}
