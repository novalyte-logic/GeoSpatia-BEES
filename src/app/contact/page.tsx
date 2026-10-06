import type { Metadata } from "next";
import { RequestFormView } from "@/components/geospatial/request-form-view";

export const metadata: Metadata = {
  title: "Contact GeoSpatia Labs | Inquiries & Site Screening",
  description:
    "Get in touch with the GeoSpatia Labs team or submit a preliminary California BESS candidate site for diligence review.",
  alternates: {
    canonical: "https://geospatialabs.com/contact",
  },
};

export default function ContactPage() {
  return <RequestFormView />;
}
