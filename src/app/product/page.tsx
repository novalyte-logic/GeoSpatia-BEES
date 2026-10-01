import type { Metadata } from "next";
import { WhatItBrings } from "@/components/geospatial/what-it-brings";
import { HowItWorks } from "@/components/geospatial/how-it-works";
import { CandidateLocatorMap } from "@/components/geospatial/candidate-locator-map";
import { SamplePreview } from "@/components/geospatial/sample-preview";
import { FinalCta } from "@/components/geospatial/final-cta";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Explore how GeoSpatia Labs turns scattered public records into source-backed preliminary site intelligence screens.",
  alternates: {
    canonical: "https://geospatialabs.com/product",
  },
};

export default function ProductPage() {
  return (
    <>
      <WhatItBrings />
      <HowItWorks />
      <CandidateLocatorMap />
      <SamplePreview />
      <FinalCta />
    </>
  );
}
