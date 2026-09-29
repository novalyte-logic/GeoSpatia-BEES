import type { Metadata } from "next";
import { RequestFormView } from "@/components/geospatial/request-form-view";

export const metadata: Metadata = {
  title: "Request a Preliminary Site Screen",
  description:
    "Request a professional preliminary diligence site screen for a candidate California BESS site before committing deeper engineering or interconnection resources.",
};

export default function RequestPage() {
  return <RequestFormView />;
}
