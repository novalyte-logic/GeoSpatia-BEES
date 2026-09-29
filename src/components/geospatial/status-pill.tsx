import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Check,
  HelpCircle,
  AlertTriangle,
  Microscope,
} from "lucide-react";

export type FindingStatus =
  | "verified"
  | "unknown"
  | "conflicting"
  | "deeper";

export const statusConfig: Record<
  FindingStatus,
  { label: string; tone: string; icon: React.ComponentType<{ className?: string }> }
> = {
  verified: {
    label: "Verified",
    tone: "text-emerald border-emerald/30 bg-emerald/8",
    icon: Check,
  },
  unknown: {
    label: "Unknown",
    tone: "text-muted-foreground border-line bg-muted/60",
    icon: HelpCircle,
  },
  conflicting: {
    label: "Conflicting",
    tone: "text-amber border-amber/30 bg-amber/8",
    icon: AlertTriangle,
  },
  deeper: {
    label: "Requires deeper diligence",
    tone: "text-azure border-azure/30 bg-azure/8",
    icon: Microscope,
  },
};

export function StatusPill({
  status,
  className,
}: {
  status: FindingStatus;
  className?: string;
}) {
  const cfg = statusConfig[status];
  const Icon = cfg.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none",
        cfg.tone,
        className,
      )}
    >
      <Icon className="size-3" />
      {cfg.label}
    </span>
  );
}

/** Small evidence chip used inside report previews — shows source + tag. */
export function EvidenceChip({
  source,
  refId,
  className,
}: {
  source: string;
  refId?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-line-soft bg-muted/40 px-2 py-0.5 font-mono text-[10.5px] text-ink-soft",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-emerald/60" aria-hidden="true" />
      <span className="font-sans">{source}</span>
      {refId && <span className="text-muted-foreground">· {refId}</span>}
    </span>
  );
}
