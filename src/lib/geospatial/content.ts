/** Shared types + content for the GeoSpatia Labs marketing site. */

export type ViewId = "home" | "sample-report" | "request";

export const navLinks: { label: string; href: string; target?: string }[] = [
  { label: "Product", href: "/product" },
  { label: "Methodology", href: "/methodology" },
  { label: "Blog", href: "/blog" },
  { label: "What a Brief Covers", href: "/sample-report" },
  { label: "Pricing", href: "/pricing" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "About", href: "/about" },
];

export const footerNav = {
  Product: [
    { label: "Product overview", href: "/product" },
    { label: "How it works", href: "/product#how-it-works" },
    { label: "What a brief covers", href: "/sample-report" },
    { label: "Pricing", href: "/pricing" },
    { label: "Reserve a paid screen", href: "/request" },
  ],
  Methodology: [
    { label: "Blog", href: "/blog" },
    { label: "BESS site screening guide", href: "/blog/bess-site-screening" },
    { label: "Evidence-first approach", href: "/methodology" },
    { label: "Why early screening matters", href: "/methodology#why-screening" },
    { label: "Source handling", href: "/methodology" },
    { label: "Scope & limitations", href: "/sample-report#scope" },
  ],
  Company: [
    { label: "About GeoSpatia Labs", href: "/about" },
    { label: "Use cases", href: "/use-cases" },
    { label: "FAQ", href: "/methodology#faq" },
    { label: "Contact", href: "/request" },
  ],
};
