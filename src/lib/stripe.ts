import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-02-24.acacia" as any,
    })
  : null;

export type PricingPackageId = "single-screen" | "triage-pack" | "pipeline-retainer";

export interface PackageDefinition {
  id: PricingPackageId;
  name: string;
  priceDisplay: string;
  amountCents: number;
  cadence: string;
  badge: string;
  mode: "payment" | "subscription";
  description: string;
  items: string[];
}

export const PRICING_PACKAGES: Record<PricingPackageId, PackageDefinition> = {
  "single-screen": {
    id: "single-screen",
    name: "Single Site Screen",
    priceDisplay: "$1,500",
    amountCents: 150000, // $1,500.00
    cadence: "per candidate site",
    badge: "Launch offer",
    mode: "payment",
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
  "triage-pack": {
    id: "triage-pack",
    name: "3-Site Triage Pack",
    priceDisplay: "$3,750",
    amountCents: 375000, // $3,750.00
    cadence: "three candidate sites",
    badge: "Best for shortlists",
    mode: "payment",
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
  "pipeline-retainer": {
    id: "pipeline-retainer",
    name: "Pipeline Scout Retainer",
    priceDisplay: "$4,000",
    amountCents: 400000, // $4,000.00 / month
    cadence: "per month",
    badge: "Recurring diligence desk",
    mode: "subscription",
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
};
