import type { Metadata } from "next";
import { WhoItsFor } from "@/components/geospatial/who-its-for";
import { WhatItBrings } from "@/components/geospatial/what-it-brings";
import { FinalCta } from "@/components/geospatial/final-cta";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "Use cases for GeoSpatia Labs preliminary site screens across BESS, solar-plus-storage, EV charging, and grid-adjacent land diligence.",
  alternates: {
    canonical: "https://geospatialabs.com/use-cases",
  },
};

export default function UseCasesPage() {
  return (
    <>
      <WhoItsFor />
      <WhatItBrings />
      <FinalCta />
    </>
  );
}
