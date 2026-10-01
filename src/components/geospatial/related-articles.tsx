import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getRelatedPosts, type BlogSlug } from "@/lib/geospatial/blog";

export function RelatedArticles({ currentSlug }: { currentSlug: BlogSlug }) {
  const related = getRelatedPosts(currentSlug);

  return (
    <section className="scroll-mt-24">
      <div className="rounded-xl border border-line bg-card p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald">
          Continue the topic cluster
        </p>
        <h2 className="mt-2 font-serif text-2xl font-medium leading-tight text-ink">
          Related site-screening guides
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {related.map((post) => (
            <Link
              key={post.slug}
              href={post.href}
              className="group rounded-lg border border-line bg-background p-4 transition-colors hover:border-emerald/40"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald">
                {post.vertical}
              </p>
              <h3 className="mt-2 text-base font-semibold leading-snug text-ink">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {post.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald">
                Read guide
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
