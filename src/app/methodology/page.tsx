import type { Metadata } from "next";
import { Methodology } from "@/components/geospatial/methodology";
import { WhyScreening } from "@/components/geospatial/why-screening";
import { Faq } from "@/components/geospatial/faq";
import { FinalCta } from "@/components/geospatial/final-cta";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How GeoSpatia Labs handles public sources, unknowns, conflicts, and preliminary site-screening boundaries.",
  alternates: {
    canonical: "https://geospatialabs.com/methodology",
  },
};

export default function MethodologyPage() {
  return (
    <>
      <Methodology />
      <WhyScreening />
      <Faq />
      <FinalCta />
    </>
  );
}
