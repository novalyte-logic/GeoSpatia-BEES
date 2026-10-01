export const blogPosts = [
  {
    slug: "bess-site-screening",
    href: "/blog/bess-site-screening",
    eyebrow: "California BESS Site Diligence",
    title:
      "How California BESS Developers Can Screen Candidate Sites Before Interconnection and CEQA Spend",
    description:
      "A practical framework for California BESS developers evaluating candidate parcels before deeper interconnection, CEQA, permitting, environmental, and engineering spend.",
    vertical: "Battery storage",
    readTime: "12 min read",
  },
  {
    slug: "solar-storage-site-screening",
    href: "/blog/solar-storage-site-screening",
    eyebrow: "Solar + Storage Site Diligence",
    title:
      "How Solar + Storage Developers Can Screen Hybrid Sites Before Land and Interconnection Decisions",
    description:
      "A source-backed diligence workflow for hybrid solar and storage teams comparing parcels, POIs, permitting paths, and environmental constraints.",
    vertical: "Solar + storage",
    readTime: "9 min read",
  },
  {
    slug: "data-center-power-site-screening",
    href: "/blog/data-center-power-site-screening",
    eyebrow: "AI Data Center Power Diligence",
    title:
      "How AI Data Center Teams Can Screen Power-Constrained Sites Before Committing to Land",
    description:
      "A preliminary screening framework for AI infrastructure teams evaluating power availability, grid context, permitting risk, and site constraints.",
    vertical: "AI data centers",
    readTime: "9 min read",
  },
] as const;

export type BlogSlug = (typeof blogPosts)[number]["slug"];

export function getRelatedPosts(currentSlug: BlogSlug) {
  return blogPosts.filter((post) => post.slug !== currentSlug);
}
