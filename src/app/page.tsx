import { Hero } from "@/components/geospatial/hero";
import { TrustBar } from "@/components/geospatial/trust-bar";
import { WhatItBrings } from "@/components/geospatial/what-it-brings";
import { HowItWorks } from "@/components/geospatial/how-it-works";
import { CandidateLocatorMap } from "@/components/geospatial/candidate-locator-map";
import { SamplePreview } from "@/components/geospatial/sample-preview";
import { WhoItsFor } from "@/components/geospatial/who-its-for";
import { Methodology } from "@/components/geospatial/methodology";
import { WhyScreening } from "@/components/geospatial/why-screening";
import { Faq } from "@/components/geospatial/faq";
import { FinalCta } from "@/components/geospatial/final-cta";
import { About } from "@/components/geospatial/about";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhatItBrings />
      <HowItWorks />
      <CandidateLocatorMap />
      <SamplePreview />
      <WhoItsFor />
      <Methodology />
      <WhyScreening />
      <Faq />
      <About />
      <FinalCta />
    </>
  );
}
