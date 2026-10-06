"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  CreditCard,
  FileText,
  Loader2,
  Lock,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "./section";
import type { PricingPackageId } from "@/lib/stripe";

interface PricingPackageItem {
  id: PricingPackageId;
  name: string;
  price: string;
  cadence: string;
  badge: string;
  buttonLabel: string;
  description: string;
  items: string[];
}

const packages: PricingPackageItem[] = [
  {
    id: "single-screen",
    name: "Single Site Screen",
    price: "$1,500",
    cadence: "per candidate site",
    badge: "Launch offer",
    buttonLabel: "Order Single Screen",
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
    id: "triage-pack",
    name: "3-Site Triage Pack",
    price: "$3,750",
    cadence: "three candidate sites",
    badge: "Best for shortlists",
    buttonLabel: "Order 3-Site Pack",
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
    id: "pipeline-retainer",
    name: "Pipeline Scout Retainer",
    price: "From $4,000",
    cadence: "per month",
    badge: "Recurring diligence desk",
    buttonLabel: "Start Monthly Retainer",
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

function CheckoutBanner() {
  const searchParams = useSearchParams();
  const checkoutStatus = searchParams?.get("checkout");

  if (!checkoutStatus) return null;

  if (checkoutStatus === "success") {
    return (
      <div className="mb-8 rounded-xl border border-emerald/40 bg-emerald/10 p-5 text-ink">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald" />
          <div>
            <p className="text-base font-semibold text-emerald">
              Payment confirmed! Your diligence order is received.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              A receipt and kickoff brief have been dispatched to your email. Our research desk will confirm your candidate parcel scope and begin analysis immediately.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (checkoutStatus === "cancelled") {
    return (
      <div className="mb-8 rounded-xl border border-line bg-card/70 p-4 text-ink">
        <div className="flex items-center gap-3">
          <XCircle className="size-5 shrink-0 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Checkout was cancelled. Your card was not charged. You can resume checkout anytime or submit candidate coordinates for scope review first.
          </p>
        </div>
      </div>
    );
  }

  return null;
}

export function Pricing() {
  const [loadingPkg, setLoadingPkg] = React.useState<PricingPackageId | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleCheckout = async (pkgId: PricingPackageId) => {
    if (loadingPkg) return;
    setErrorMsg(null);
    setLoadingPkg(pkgId);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: pkgId }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        url?: string;
        error?: string;
      };

      if (!res.ok || !data.ok || !data.url) {
        setErrorMsg(
          data.error ||
            "Unable to start checkout right now. Please try again or reach out to admin@geospatialabs.com."
        );
        return;
      }

      // Redirect to Stripe hosted checkout page
      window.location.href = data.url;
    } catch {
      setErrorMsg(
        "A network connection error occurred while contacting the checkout service. Please try again."
      );
    } finally {
      setLoadingPkg(null);
    }
  };

  return (
    <Section
      id="pricing"
      className="relative overflow-hidden border-b border-line bg-card/35 py-20 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 text-ink opacity-30" aria-hidden="true">
        <div className="dot-bg absolute inset-0 mask-fade-b" />
      </div>

      <div className="relative">
        {/* Checkout feedback banner with Suspense fallback */}
        <React.Suspense fallback={null}>
          <CheckoutBanner />
        </React.Suspense>

        {errorMsg && (
          <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Founder-led launch pricing"
              title="Paid preliminary screens, ordered online via Stripe or reserved after scope fit."
              intro="Review the public sample brief, order directly online with live credit card / Apple Pay checkout, or submit a candidate site first to confirm coverage before payment."
            />
          </div>
          <div className="surface-card lg:col-span-5 p-4 sm:p-5 min-w-0">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md border border-emerald/30 bg-emerald/10 text-emerald">
                <ShieldCheck className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">First five founder-led screens</p>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground break-words">
                  Built manually with source-backed findings, transparent unknowns, and explicit diligence boundaries — no fabricated feasibility scores, capacity guarantees, or required calls.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {packages.map((pkg) => {
            const isLoading = loadingPkg === pkg.id;
            return (
              <article
                key={pkg.id}
                className="surface-card group flex h-full flex-col overflow-hidden p-5 sm:p-6 transition-all duration-200 hover:border-emerald/40 hover:shadow-sm min-w-0"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-emerald/25 bg-emerald/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald">
                    {pkg.badge}
                  </span>
                  <FileText className="size-4 text-muted-foreground group-hover:text-emerald" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-ink break-words">{pkg.name}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                    {pkg.price}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">{pkg.cadence}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground break-words">
                  {pkg.description}
                </p>

                <div className="mt-6 flex flex-col gap-2.5">
                  <Button
                    type="button"
                    onClick={() => handleCheckout(pkg.id)}
                    disabled={Boolean(loadingPkg)}
                    className="w-full gap-2 bg-emerald text-emerald-foreground hover:bg-emerald-soft cursor-pointer text-sm font-medium h-10 shadow-sm"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="size-4 animate-spin shrink-0" />
                        Connecting Stripe...
                      </>
                    ) : (
                      <>
                        <CreditCard className="size-4 shrink-0" />
                        {pkg.buttonLabel}
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-between px-1 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Lock className="size-3 text-emerald" />
                      Encrypted via Stripe
                    </span>
                    <Link
                      href={`/request?package=${pkg.id}`}
                      className="hover:text-ink underline underline-offset-2 transition-colors"
                    >
                      Scope fit first
                    </Link>
                  </div>
                </div>

                <div className="my-6 border-t border-line/60" />

                <ul className="flex-1 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald" />
                      <span className="break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-line bg-background/70 p-4 sm:p-6 min-w-0">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3 min-w-0">
              <CalendarCheck2 className="mt-0.5 size-5 shrink-0 text-emerald" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">Preview-first or instant checkout workflow</p>
                <p className="mt-1 max-w-3xl text-xs sm:text-sm leading-relaxed text-muted-foreground break-words">
                  Developers can order directly with live card / Apple Pay checkout, or submit their candidate parcel first to receive written scope confirmation before any payment. If candidate geography falls outside California BESS coverage, inquiries are declined with no fee.
                </p>
              </div>
            </div>
            <Button
              asChild
              className="w-full sm:w-auto gap-2 bg-emerald text-emerald-foreground hover:bg-emerald-soft shrink-0 cursor-pointer text-sm sm:text-base h-11 sm:h-12"
            >
              <Link href="/request">
                Reserve a Paid Site Screen
                <ArrowRight className="size-4 shrink-0" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
