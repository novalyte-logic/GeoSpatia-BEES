"use client";

import Link from "next/link";
import { ArrowRight, CalendarCheck2, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "./section";

const packages = [
  {
    name: "Single Site Screen",
    price: "$1,500",
    cadence: "per candidate site",
    badge: "Launch offer",
    description:
      "For a team evaluating one California BESS parcel, APN, address, or coordinate set before committing deeper diligence spend.",
    items: [
      "9-section preliminary intelligence brief",
      "Source register with public-record trail",
      "Unknowns, conflicts, and deeper-diligence flags",
      "5-business-day delivery after paid kickoff",
      "Written email handoff with next-step questions",
    ],
  },
  {
    name: "3-Site Triage Pack",
    price: "$3,750",
    cadence: "three candidate sites",
    badge: "Best for shortlists",
    description:
      "For origination and development teams comparing multiple candidate parcels and deciding where to focus engineering, legal, or interconnection bandwidth.",
    items: [
      "Three individual preliminary site screens",
      "Side-by-side evidence-risk comparison",
      "Jurisdiction, zoning, permitting, and environmental flags",
      "Grid/interconnection context from published sources",
      "Prioritized next-stage diligence questions",
    ],
  },
  {
    name: "Pipeline Scout Retainer",
    price: "From $4,000",
    cadence: "per month",
    badge: "Recurring diligence desk",
    description:
      "For teams that need a steady external research desk to organize early evidence across a California BESS candidate pipeline.",
    items: [
      "Up to four screens per month",
      "Ten sourced opportunity leads or project/context records",
      "Monthly written pipeline summary",
      "Reusable source library and decision notes",
      "Priority turnaround on qualified requests",
    ],
  },
];

export function Pricing() {
  return (
    <Section
      id="pricing"
      className="relative overflow-hidden border-b border-line bg-card/35 py-20 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 text-ink opacity-30" aria-hidden="true">
        <div className="dot-bg absolute inset-0 mask-fade-b" />
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Founder-led launch pricing"
              title="Paid preliminary screens, ordered online after preview and scope fit."
              intro="Review the public sample brief, submit a candidate California BESS site, and receive written scope confirmation before payment. No sales call is required; the workflow is handled by email and online checkout."
            />
          </div>
          <div className="surface-card lg:col-span-5 p-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md border border-emerald/30 bg-emerald/10 text-emerald">
                <ShieldCheck className="size-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">First five founder-led screens</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Built manually with source-backed findings, transparent unknowns, and explicit diligence boundaries — no fabricated feasibility scores, capacity guarantees, or required calls.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.name}
              className="surface-card group flex h-full flex-col overflow-hidden p-6 transition-all duration-200 hover:border-emerald/40 hover:shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-emerald/25 bg-emerald/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald">
                  {pkg.badge}
                </span>
                <FileText className="size-4 text-muted-foreground group-hover:text-emerald" />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-ink">{pkg.name}</h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-serif text-3xl font-semibold tracking-tight text-ink md:text-4xl">{pkg.price}</span>
                <span className="text-xs font-medium text-muted-foreground">{pkg.cadence}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {pkg.description}
              </p>

              <ul className="mt-6 flex-1 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {pkg.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-line bg-background/70 p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <CalendarCheck2 className="mt-0.5 size-5 shrink-0 text-emerald" />
              <div>
                <p className="text-sm font-semibold text-ink">Preview-first, no-call payment workflow</p>
                <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  Buyers can inspect the sample brief before ordering. After they submit a candidate site, we confirm scope by email and send a payment link. If it does not fit current California BESS coverage, we decline it before payment.
                </p>
              </div>
            </div>
            <Button
              asChild
              className="gap-2 bg-emerald text-emerald-foreground hover:bg-emerald-soft shrink-0"
            >
              <Link href="/request">
                Reserve a Paid Site Screen
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
