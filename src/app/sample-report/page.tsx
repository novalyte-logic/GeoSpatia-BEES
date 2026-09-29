import type { Metadata } from "next";
import { SampleReportView } from "@/components/geospatial/sample-report-view";

export const metadata: Metadata = {
  title: "What a Preliminary Site Intelligence Brief Covers",
  description:
    "Explore the nine-part deliverable structure, four-part evidence taxonomy, and source-backed framework included in a GeoSpatia Labs California BESS preliminary brief.",
};

export default function SampleReportPage() {
  return <SampleReportView />;
}
