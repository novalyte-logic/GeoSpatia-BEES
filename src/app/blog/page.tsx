import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import { Section } from "@/components/geospatial/section";
import { blogPosts } from "@/lib/geospatial/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "GeoSpatia Labs field notes on BESS, solar-plus-storage, AI data center power, interconnection, permitting, and preliminary site diligence.",
  alternates: {
    canonical: "https://geospatialabs.com/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="bg-background">
      <Section className="relative overflow-hidden border-b border-line bg-background py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-45">
          <div className="grid-bg absolute inset-0 mask-fade-b" />
        </div>
        <div className="relative max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald shadow-sm">
            <BookOpenText className="size-3.5" />
            GeoSpatia Blog
          </div>
          <h1 className="mt-5 font-serif text-4xl font-medium leading-tight text-ink text-balance md:text-6xl">
            Field notes on energy, land, grid, and site diligence.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Practical guides for development teams comparing candidate parcels
            before deeper interconnection, permitting, engineering, legal, or
            environmental spend.
          </p>
        </div>
      </Section>

      <Section className="border-b border-line bg-card/35 py-14 md:py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={post.href}
              className="surface-card group flex h-full flex-col p-6 transition-colors hover:border-emerald/40"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-emerald/25 bg-emerald/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald">
                  {post.vertical}
                </span>
                <span className="text-xs text-muted-foreground">
                  {post.readTime}
                </span>
              </div>
              <h2 className="mt-5 text-xl font-semibold leading-tight text-ink">
                {post.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                {post.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-emerald">
                Read article
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
