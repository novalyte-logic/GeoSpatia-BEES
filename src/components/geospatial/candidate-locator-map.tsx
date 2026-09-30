"use client";

import * as React from "react";
import { Section, SectionHeading } from "./section";
import { InteractiveLocatorMap } from "./interactive-locator-map";

export function CandidateLocatorMap() {
  return (
    <Section
      id="candidate-locator"
      className="border-b border-line bg-muted/30 py-20 md:py-24"
    >
      <SectionHeading
        eyebrow="Pre-order site preview"
        title="Let buyers inspect the site before they order"
        intro="Search a California address or coordinates, inspect satellite/topographic context, drag the pin to refine the candidate location, then continue into the no-call order flow with the location prefilled."
      />

      <div className="mt-10 mx-auto w-full max-w-[1400px]">
        <InteractiveLocatorMap lazyMount={true} />
      </div>
    </Section>
  );
}
