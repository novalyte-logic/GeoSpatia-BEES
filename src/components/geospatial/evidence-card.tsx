import * as React from "react";
import { cn } from "@/lib/utils";
import { StatusPill, EvidenceChip, type FindingStatus } from "./status-pill";

export type EvidenceCardProps = {
  /** Category eyebrow e.g. "Grid & Interconnection" */
  category: string;
  /** Short finding headline */
  finding: string;
  /** Supporting detail — kept factual, hedged. */
  detail: React.ReactNode;
  /** Where the evidence came from — identified source name. */
  sources: { name: string; refId?: string }[];
  status: FindingStatus;
  className?: string;
};

/**
 * EvidenceCard — the trust unit of the entire site.
 * Each card shows: category, finding, source, status. Designed to
 * signal that every factual claim is traceable to an identified source.
 */
export function EvidenceCard({
  category,
  finding,
  detail,
  sources,
  status,
  className,
}: EvidenceCardProps) {
  return (
    <article
      className={cn(
        "surface-card group relative flex flex-col gap-3 p-5 transition-shadow duration-300 hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="eyebrow text-emerald/85">{category}</span>
        <StatusPill status={status} />
      </div>
      <h3 className="text-[1.0625rem] font-semibold leading-snug text-ink text-balance">
        {finding}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
        {detail}
      </p>
      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2">
        {sources.map((s, i) => (
          <EvidenceChip key={i} source={s.name} refId={s.refId} />
        ))}
      </div>
    </article>
  );
}
