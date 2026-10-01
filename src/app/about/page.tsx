import type { Metadata } from "next";
import { About } from "@/components/geospatial/about";
import { TrustBar } from "@/components/geospatial/trust-bar";
import { FinalCta } from "@/components/geospatial/final-cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "About GeoSpatia Labs and the source-backed research workflow behind preliminary site intelligence screens.",
  alternates: {
    canonical: "https://geospatialabs.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <About />
      <TrustBar />
      <FinalCta />
    </>
  );
}
