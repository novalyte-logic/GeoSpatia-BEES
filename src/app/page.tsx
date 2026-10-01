import { Hero } from "@/components/geospatial/hero";
import { TrustBar } from "@/components/geospatial/trust-bar";
import { WhatItBrings } from "@/components/geospatial/what-it-brings";
import { HowItWorks } from "@/components/geospatial/how-it-works";
import { SamplePreview } from "@/components/geospatial/sample-preview";
import { Pricing } from "@/components/geospatial/pricing";
import { WhoItsFor } from "@/components/geospatial/who-its-for";
import { FinalCta } from "@/components/geospatial/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhatItBrings />
      <HowItWorks />
      <SamplePreview />
      <Pricing />
      <WhoItsFor />
      <FinalCta />
    </>
  );
}
