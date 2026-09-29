/** Shared types + content for the Geospatial Labs marketing site. */

export type ViewId = "home" | "sample-report" | "request";

export const navLinks: { label: string; target: string; view?: ViewId }[] = [
  { label: "Product", target: "product" },
  { label: "Methodology", target: "methodology" },
  { label: "Sample Report", target: "sample-report", view: "sample-report" },
  { label: "Who It’s For", target: "audience" },
  { label: "About", target: "about" },
];

export const footerNav = {
  Product: [
    { label: "What it brings together", target: "product" },
    { label: "How it works", target: "how-it-works" },
    { label: "Sample report", target: "sample-report", view: "sample-report" as const },
    { label: "Request a site screen", target: "request", view: "request" as const },
  ],
  Methodology: [
    { label: "Evidence-first approach", target: "methodology" },
    { label: "Why early screening matters", target: "why-screening" },
    { label: "Source handling", target: "methodology" },
    { label: "Scope & limitations", target: "sample-report", view: "sample-report" as const },
  ],
  Company: [
    { label: "About Geospatial Labs", target: "about" },
    { label: "Who it’s for", target: "audience" },
    { label: "FAQ", target: "faq" },
    { label: "Contact", target: "request", view: "request" as const },
  ],
};
