"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Download,
  Printer,
  ShieldCheck,
  Lock,
  FileText,
  MapPin,
  AlertTriangle,
  HelpCircle,
  Microscope,
  Check,
  ExternalLink,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Section } from "./section";
import { StatusPill, statusConfig, type FindingStatus } from "./status-pill";
import {
  sampleBrief,
  sources,
  getSourceByRef,
  type Finding,
} from "@/lib/geospatial/sample-report-data";
import { TopographicParcelBg } from "./topographic-bg";

/** A compact view-scoped sub-section card. */
function ReportBlock({
  id,
  eyebrow,
  title,
  children,
  sourceRefs,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  sourceRefs?: string[];
}) {
  return (
    <section id={id} className="surface-card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-emerald/85">{eyebrow}</p>
          <h2 className="mt-2 text-xl font-semibold text-ink">{title}</h2>
        </div>
        {sourceRefs && sourceRefs.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {sourceRefs.map((ref) => {
              const s = getSourceByRef(ref);
              return (
                <span
                  key={ref}
                  className="inline-flex items-center gap-1 rounded-md border border-line-soft bg-muted/40 px-2 py-0.5 font-mono text-[10.5px] text-ink-soft"
                >
                  <span className="size-1.5 rounded-full bg-emerald/60" />
                  {s ? s.name : ref}
                </span>
              );
            })}
          </div>
        )}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

/** A single finding row used in the findings table and inline. */
function FindingRow({ finding }: { finding: Finding }) {
  const cfg = statusConfig[finding.status];
  const Icon = cfg.icon;
  return (
    <tr className="border-b border-line-soft last:border-0 hover:bg-muted/30">
      <td className="px-4 py-3 align-top">
        <span className="font-mono text-[11px] text-muted-foreground">
          {finding.id}
        </span>
      </td>
      <td className="px-4 py-3 align-top">
        <span className="text-sm font-medium text-ink">{finding.dimension}</span>
      </td>
      <td className="px-4 py-3 align-top text-sm text-muted-foreground">
        {finding.claim}
      </td>
      <td className="px-4 py-3 align-top">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none",
            cfg.tone,
          )}
        >
          <Icon className="size-3" />
          {cfg.label}
        </span>
      </td>
      <td className="px-4 py-3 align-top">
        {finding.sourceRefs.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {finding.sourceRefs.map((ref) => {
              const s = getSourceByRef(ref);
              return (
                <span
                  key={ref}
                  className="inline-flex items-center gap-1 rounded-md border border-line-soft bg-card px-1.5 py-0.5 font-mono text-[10px] text-ink-soft"
                  title={s?.name}
                >
                  {ref}
                </span>
              );
            })}
          </div>
        ) : (
          <span className="font-mono text-[10.5px] text-muted-foreground">
            —
          </span>
        )}
      </td>
    </tr>
  );
}

export function SampleReportView({
  onBack,
  onRequest,
}: {
  onBack: () => void;
  onRequest: () => void;
}) {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const preparedOn = sampleBrief.preparedOn.replace("{today}", today);

  return (
    <div className="bg-background">
      {/* Top return bar — sits below the main site header (h-16) */}
      <div className="sticky top-16 z-30 border-b border-line bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="gap-2 text-muted-foreground hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            Back to site
          </Button>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-amber/40 bg-amber/10 px-2 py-0.5 text-[10px] font-medium text-amber sm:px-2.5 sm:py-1 sm:text-[11px]">
              <Lock className="size-3" />
              <span className="hidden sm:inline">Illustrative sample · demo data</span>
              <span className="sm:hidden">Demo data</span>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="gap-2"
            >
              <Printer className="size-4" />
              <span className="hidden sm:inline">Print</span>
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-emerald text-emerald-foreground hover:bg-emerald-soft"
              onClick={onRequest}
            >
              <Download className="size-4" />
              Request a real screen
            </Button>
          </div>
        </div>
      </div>

      {/* Illustrative-sample disclaimer banner */}
      <div className="border-b border-amber/30 bg-amber/8">
        <div className="mx-auto flex w-full max-w-6xl items-start gap-3 px-5 py-3 sm:px-6 lg:px-8">
          <Lock className="mt-0.5 size-4 shrink-0 text-amber" />
          <p className="text-sm text-ink-soft">
            <span className="font-semibold text-ink">
              Illustrative sample.
            </span>{" "}
            This brief is built on demo data. It is not a customer engagement
            and does not reflect any real site, company, permit, grid capacity
            value, or result. It shows the structure a paid screen would follow.
          </p>
        </div>
      </div>

      {/* Report cover header */}
      <header className="relative overflow-hidden border-b border-line bg-background">
        <div className="absolute inset-0 text-ink" aria-hidden="true">
          <TopographicParcelBg variant="soft" />
        </div>
        <div className="relative mx-auto w-full max-w-6xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="eyebrow inline-flex items-center gap-2 text-emerald">
                <span className="h-px w-5 bg-emerald/50" />
                {sampleBrief.title}
              </span>
              <h1 className="mt-3 display-md text-ink text-balance">
                Sample Site Intelligence Brief
              </h1>
              <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-muted-foreground">
                {sampleBrief.subtitle}. {sampleBrief.preparedFor}.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Badge
                  variant="outline"
                  className="gap-1.5 border-line bg-card font-normal text-ink-soft"
                >
                  <Clock className="size-3.5" />
                  Prepared: {preparedOn}
                </Badge>
                <Badge
                  variant="outline"
                  className="gap-1.5 border-line bg-card font-normal text-ink-soft"
                >
                  <FileText className="size-3.5" />
                  {sampleBrief.version}
                </Badge>
                <Badge
                  variant="outline"
                  className="gap-1.5 border-amber/40 bg-amber/8 font-normal text-amber"
                >
                  <Lock className="size-3.5" />
                  Demo data
                </Badge>
              </div>
            </div>

            {/* Site marker card */}
            <div className="surface-quiet w-full max-w-sm p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                <MapPin className="size-4 text-emerald" />
                {sampleBrief.candidateSite.label}
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-3 text-[13px]">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    APN
                  </dt>
                  <dd className="font-mono text-ink">
                    {sampleBrief.candidateSite.apn}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Acreage
                  </dt>
                  <dd className="text-ink">{sampleBrief.candidateSite.acreage}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Coordinates
                  </dt>
                  <dd className="font-mono text-ink">
                    {sampleBrief.candidateSite.coords}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Jurisdiction
                  </dt>
                  <dd className="text-ink">
                    {sampleBrief.candidateSite.jurisdiction}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
        {/* Executive summary */}
        <ReportBlock
          id="exec-summary"
          eyebrow="01 · Executive summary"
          title="What this brief is, and what it isn’t"
        >
          <ul className="space-y-3 text-[15px] leading-relaxed text-muted-foreground">
            {sampleBrief.executiveSummary.map((line, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </ReportBlock>

        {/* Candidate site overview */}
        <div className="mt-6">
          <ReportBlock
            id="candidate-site"
            eyebrow="02 · Candidate site overview"
            title="Site identity"
            sourceRefs={["SRC-03", "SRC-04"]}
          >
            <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <SummaryRow label="APN" value={sampleBrief.candidateSite.apn} mono />
              <SummaryRow label="Coordinates" value={sampleBrief.candidateSite.coords} mono />
              <SummaryRow label="Acreage" value={sampleBrief.candidateSite.acreage} />
              <SummaryRow label="Jurisdiction" value={sampleBrief.candidateSite.jurisdiction} />
              <SummaryRow label="Nearest community" value={sampleBrief.candidateSite.nearestTown} />
              <SummaryRow label="Access" value={sampleBrief.candidateSite.access} />
            </dl>
          </ReportBlock>
        </div>

        {/* Project / use assumptions */}
        <div className="mt-6">
          <ReportBlock
            id="project-use"
            eyebrow="03 · Project / use assumptions"
            title="What the requester is evaluating"
          >
            <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <SummaryRow label="Development use" value={sampleBrief.projectAssumptions.use} />
              <SummaryRow label="Approximate size" value={sampleBrief.projectAssumptions.size} />
              <SummaryRow label="Duration" value={sampleBrief.projectAssumptions.duration} />
              <SummaryRow label="Stage" value={sampleBrief.projectAssumptions.stage} />
            </dl>
            <p className="mt-4 rounded-md border border-line-soft bg-muted/40 px-3 py-2 text-[13px] text-ink-soft">
              {sampleBrief.projectAssumptions.note}
            </p>
          </ReportBlock>
        </div>

        {/* Utility & jurisdiction */}
        <div className="mt-6">
          <ReportBlock
            id="utility-jurisdiction"
            eyebrow="04 · Utility & jurisdiction context"
            title="Who serves and regulates the site"
            sourceRefs={sampleBrief.utility.sourceRefs}
          >
            <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <SummaryRow label="Service territory" value={sampleBrief.utility.territory} />
              <SummaryRow label="Regulatory jurisdiction" value={sampleBrief.utility.jurisdiction} />
              <SummaryRow label="Nearest substation" value={sampleBrief.utility.substation} />
            </dl>
          </ReportBlock>
        </div>

        {/* Interconnection */}
        <div className="mt-6">
          <ReportBlock
            id="interconnection"
            eyebrow="05 · Published grid / interconnection context"
            title="What the public record shows — and doesn’t"
            sourceRefs={sampleBrief.interconnection.sourceRefs}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FieldCard label="Queue position" value={sampleBrief.interconnection.queuePosition} status="unknown" />
              <FieldCard label="Published capacity" value={sampleBrief.interconnection.publishedCapacity} status="unknown" />
              <FieldCard label="Nearby line" value={sampleBrief.interconnection.nearbyLine} status="deeper" />
            </div>
            <p className="mt-4 flex items-start gap-2 rounded-md border border-amber/30 bg-amber/8 px-3 py-2.5 text-[13px] leading-relaxed text-ink-soft">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber" />
              <span>{sampleBrief.interconnection.note}</span>
            </p>
          </ReportBlock>
        </div>

        {/* Parcel / site */}
        <div className="mt-6">
          <ReportBlock
            id="parcel-site"
            eyebrow="06 · Parcel / site context"
            title="Parcel basics and constraints"
            sourceRefs={sampleBrief.parcel.sourceRefs}
          >
            <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <SummaryRow label="Zoning" value={sampleBrief.parcel.zoning} />
              <SummaryRow label="Overlays" value={sampleBrief.parcel.overlays} />
              <SummaryRow label="Ownership" value={sampleBrief.parcel.ownership} />
              <SummaryRow label="Access note" value={sampleBrief.parcel.accessNote} />
            </dl>
          </ReportBlock>
        </div>

        {/* Permitting */}
        <div className="mt-6">
          <ReportBlock
            id="permitting"
            eyebrow="07 · Permitting / planning context"
            title="Conflicting public records"
            sourceRefs={sampleBrief.permitting.sourceRefs}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FieldCard label="County planning portal" value={sampleBrief.permitting.countyCup} status="verified" sourceRef="SRC-05" />
              <FieldCard label="State permitting portal" value={sampleBrief.permitting.statePortal} status="conflicting" sourceRef="SRC-06" />
            </div>
            <p className="mt-4 flex items-start gap-2 rounded-md border border-amber/30 bg-amber/8 px-3 py-2.5 text-[13px] leading-relaxed text-ink-soft">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber" />
              <span>{sampleBrief.permitting.note}</span>
            </p>
          </ReportBlock>
        </div>

        {/* Environmental */}
        <div className="mt-6">
          <ReportBlock
            id="environmental"
            eyebrow="08 · Environmental / siting context"
            title="Mapped public layers"
            sourceRefs={sampleBrief.environmental.sourceRefs}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FieldCard label="Fire severity" value={sampleBrief.environmental.fire} status="verified" />
              <FieldCard label="Sensitive habitat overlay" value={sampleBrief.environmental.habitat} status="verified" />
              <FieldCard label="Flood zone" value={sampleBrief.environmental.flood} status="verified" />
              <FieldCard label="Noise study" value={sampleBrief.environmental.noise} status="unknown" />
            </div>
            <p className="mt-4 rounded-md border border-line-soft bg-muted/40 px-3 py-2.5 text-[13px] leading-relaxed text-ink-soft">
              {sampleBrief.environmental.note}
            </p>
          </ReportBlock>
        </div>

        {/* Project activity */}
        <div className="mt-6">
          <ReportBlock
            id="project-activity"
            eyebrow="09 · Relevant project signals"
            title="Nearby public-record activity"
            sourceRefs={sampleBrief.projectActivity.sourceRefs}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FieldCard label="Operating BESS nearby" value={sampleBrief.projectActivity.operating} status="verified" />
              <FieldCard label="Queued project" value={sampleBrief.projectActivity.queued} status="verified" />
            </div>
            <p className="mt-4 rounded-md border border-line-soft bg-muted/40 px-3 py-2.5 text-[13px] leading-relaxed text-ink-soft">
              {sampleBrief.projectActivity.note}
            </p>
          </ReportBlock>
        </div>

        {/* Findings table */}
        <div className="mt-6">
          <section className="surface-card overflow-hidden p-5 sm:p-6">
            <p className="eyebrow text-emerald/85">10 · Findings table</p>
            <h2 className="mt-2 text-xl font-semibold text-ink">
              All findings, with status and source
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Every finding is labeled Verified, Unknown, Conflicting, or
              Requires deeper diligence. Source refs map to the register below.
            </p>

            <div className="mt-4 -mx-2 sm:-mx-3 overflow-x-auto scroll-elegant">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground">
                    <th className="px-3 py-2 font-medium">#</th>
                    <th className="px-3 py-2 font-medium">Dimension</th>
                    <th className="px-3 py-2 font-medium">Finding</th>
                    <th className="px-3 py-2 font-medium">Status</th>
                    <th className="px-3 py-2 font-medium">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleBrief.findings.map((f) => (
                    <FindingRow key={f.id} finding={f} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="font-medium text-ink">Legend:</span>
              <LegendItem status="verified" label="Public source located and consistent" />
              <LegendItem status="unknown" label="Public source not located" />
              <LegendItem status="conflicting" label="Public sources disagree" />
              <LegendItem status="deeper" label="Pursue through formal study" />
            </div>
          </section>
        </div>

        {/* Source register */}
        <div className="mt-6">
          <section className="surface-card p-5 sm:p-6">
            <p className="eyebrow text-emerald/85">11 · Source register</p>
            <h2 className="mt-2 text-xl font-semibold text-ink">
              Identified sources for this brief
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Each source is a public or identified reference. Illustrative
              sample sources are placeholders that real source-backed data
              would replace.
            </p>
            <div className="mt-4 -mx-2 sm:-mx-3 overflow-x-auto scroll-elegant">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground">
                    <th className="px-3 py-2 font-medium">Ref</th>
                    <th className="px-3 py-2 font-medium">Source name</th>
                    <th className="px-3 py-2 font-medium">Type</th>
                    <th className="px-3 py-2 font-medium">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-soft">
                  {sources.map((s) => (
                    <tr key={s.refId} className="hover:bg-muted/30">
                      <td className="px-3 py-3 align-top font-mono text-[11px] text-emerald">
                        {s.refId}
                      </td>
                      <td className="px-3 py-3 align-top font-medium text-ink">
                        {s.name}
                      </td>
                      <td className="px-3 py-3 align-top text-muted-foreground">
                        {s.type}
                      </td>
                      <td className="px-3 py-3 align-top text-muted-foreground">
                        {s.note ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Next diligence questions */}
        <div className="mt-6">
          <section className="surface-card p-5 sm:p-6">
            <p className="eyebrow text-emerald/85">12 · Questions for next-stage diligence</p>
            <h2 className="mt-2 text-xl font-semibold text-ink">
              What to pursue next — and why
            </h2>
            <ol className="mt-4 space-y-3">
              {sampleBrief.nextQuestions.map((q, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-line-soft bg-muted/30 p-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-full bg-emerald/10 font-mono text-[11px] font-semibold text-emerald">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-semibold text-ink">{q.area}</p>
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink">
                    {q.question}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    <span className="font-medium text-ink-soft">Why: </span>
                    {q.why}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Scope / limitations */}
        <div className="mt-6">
          <section className="surface-quiet p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4.5 text-emerald" />
              <p className="eyebrow text-emerald/85">13 · Scope & limitations</p>
            </div>
            <h2 className="mt-2 text-xl font-semibold text-ink">
              What this brief does and does not establish
            </h2>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
              {sampleBrief.scopeLimitations.map((line, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Footer note */}
        <div className="mt-10 border-t border-line pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Geospatial Labs · Illustrative sample
            brief · Built on demo data. Replace with sourced data for a paid
            engagement.
          </p>
        </div>
      </main>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd
        className={cn(
          "text-[15px] leading-snug text-ink",
          mono && "font-mono text-[13px] text-ink-soft",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function FieldCard({
  label,
  value,
  status,
  sourceRef,
}: {
  label: string;
  value: string;
  status: FindingStatus;
  sourceRef?: string;
}) {
  return (
    <div className="rounded-lg border border-line-soft bg-card p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <StatusPill status={status} />
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-ink">{value}</p>
      {sourceRef && (
        <p className="mt-2 font-mono text-[10.5px] text-muted-foreground">
          Source: {sourceRef}
        </p>
      )}
    </div>
  );
}

function LegendItem({
  status,
  label,
}: {
  status: FindingStatus;
  label: string;
}) {
  const cfg = statusConfig[status];
  const Icon = cfg.icon;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px] font-medium leading-none",
          cfg.tone,
        )}
      >
        <Icon className="size-3" />
        {cfg.label}
      </span>
      <span>{label}</span>
    </span>
  );
}
