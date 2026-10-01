import type { Metadata } from "next";
import { Pricing } from "@/components/geospatial/pricing";
import { SamplePreview } from "@/components/geospatial/sample-preview";
import { FinalCta } from "@/components/geospatial/final-cta";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Founder-led launch pricing for GeoSpatia Labs preliminary site screens, with scope review before payment.",
  alternates: {
    canonical: "https://geospatialabs.com/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      <Pricing />
      <SamplePreview />
      <FinalCta />
    </>
  );
}
