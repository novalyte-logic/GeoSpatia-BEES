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
        eyebrow="Interactive Location Tool"
        title="Explore a candidate location"
        intro="Search any California address or coordinates to inspect your candidate location on an authoritative basemap. You can drag the pin to refine the site position or expand the map across your entire screen."
      />

      <div className="mt-10 mx-auto w-full max-w-[1400px]">
        <InteractiveLocatorMap lazyMount={true} />
      </div>
    </Section>
  );
}
