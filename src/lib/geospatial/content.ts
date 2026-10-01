/** Shared types + content for the GeoSpatia Labs marketing site. */

export type ViewId = "home" | "sample-report" | "request";

export const navLinks: { label: string; href: string; target?: string }[] = [
  { label: "Product", href: "/#product", target: "product" },
  { label: "Methodology", href: "/#methodology", target: "methodology" },
  { label: "Blog", href: "/blog" },
  { label: "What a Brief Covers", href: "/sample-report" },
  { label: "Pricing", href: "/#pricing", target: "pricing" },
  { label: "Who It's For", href: "/#audience", target: "audience" },
  { label: "About", href: "/#about", target: "about" },
];

export const footerNav = {
  Product: [
    { label: "What it brings together", href: "/#product" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "What a brief covers", href: "/sample-report" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Reserve a paid screen", href: "/request" },
  ],
  Methodology: [
    { label: "Blog", href: "/blog" },
    { label: "BESS site screening guide", href: "/blog/bess-site-screening" },
    { label: "Evidence-first approach", href: "/#methodology" },
    { label: "Why early screening matters", href: "/#why-screening" },
    { label: "Source handling", href: "/#methodology" },
    { label: "Scope & limitations", href: "/sample-report#scope" },
  ],
  Company: [
    { label: "About GeoSpatia Labs", href: "/#about" },
    { label: "Who it's for", href: "/#audience" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/request" },
  ],
};
