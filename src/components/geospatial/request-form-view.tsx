"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Building2,
  FileText,
  Lock,
  ShieldCheck,
  AlertTriangle,
  CircleAlert,
} from "lucide-react";
import { TopographicParcelBg } from "./topographic-bg";

type FormState = {
  name: string;
  email: string;
  company: string;
  role: string;
  siteLocation: string;
  projectType: string;
  projectSizeMw: string;
  devStage: string;
  decision: string;
  notes: string;
  privacyAck: boolean;
};

const empty: FormState = {
  name: "",
  email: "",
  company: "",
  role: "",
  siteLocation: "",
  projectType: "",
  projectSizeMw: "",
  devStage: "",
  decision: "",
  notes: "",
  privacyAck: false,
};

const projectTypes = [
  "Utility-scale BESS",
  "Commercial / industrial BESS",
  "Behind-the-meter BESS",
  "Solar + BESS hybrid",
  "Other",
];

const devStages = [
  "Pre-screening (just identifying candidates)",
  "Site control / option",
  "Pre-application",
  "Application filed",
  "Other",
];

export function RequestFormView({ onBack }: { onBack: () => void }) {
  const [form, setForm] = React.useState<FormState>(empty);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [referenceId, setReferenceId] = React.useState<string | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
    if (serverError) setServerError(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setServerError(null);

    setSubmitting(true);
    try {
      const res = await fetch("/api/site-screen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Record<string, string>;
        referenceId?: string;
        message?: string;
      };

      if (!res.ok || !data.ok) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setServerError(
          data.error ??
            "We couldn’t submit your request. Please try again or email hello@geospatialabs.com.",
        );
        return;
      }

      setReferenceId(data.referenceId ?? null);
      setSubmitted(true);
      setForm(empty);
      setFieldErrors({});
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setServerError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <SuccessView referenceId={referenceId} onBack={onBack} />;
  }

  return (
    <div className="bg-background">
      {/* Top return bar */}
      <div className="border-b border-line bg-card/60">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="gap-2 text-muted-foreground hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            Back to site
          </Button>
          <div className="inline-flex items-center gap-1.5 rounded-md border border-line-soft bg-muted/40 px-2.5 py-1 text-[11px] text-muted-foreground">
            <ShieldCheck className="size-3.5 text-emerald" />
            No payment requested at this stage
          </div>
        </div>
      </div>

      {/* Hero band */}
      <header className="relative overflow-hidden border-b border-line bg-background">
        <div className="absolute inset-0 text-ink" aria-hidden="true">
          <TopographicParcelBg variant="soft" />
        </div>
        <div className="relative mx-auto w-full max-w-6xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <span className="eyebrow inline-flex items-center gap-2 text-emerald">
            <span className="h-px w-5 bg-emerald/50" />
            Request a Site Screen
          </span>
          <h1 className="mt-3 display-md text-ink text-balance">
            Tell us about a candidate California BESS site.
          </h1>
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-muted-foreground text-pretty">
            You’re requesting a professional preliminary diligence engagement —
            not signing up for a generic SaaS trial. We’ll review whether the
            site fits the current screening scope and follow up by email.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* What happens next — left rail */}
          <aside className="lg:col-span-4">
            <div className="flex flex-col gap-4 lg:sticky lg:top-20">
              <WhatHappensNext />
              <WhatItSupports />
              <WhatItDoesNotReplace />
            </div>
          </aside>

          {/* Form — right rail */}
          <div className="lg:col-span-8">
            <form
              onSubmit={submit}
              noValidate
              className="surface-card overflow-hidden"
              aria-label="Request a site screen form"
            >
              <div className="border-b border-line bg-muted/40 px-6 py-4 sm:px-8">
                <h2 className="text-lg font-semibold text-ink">
                  Site screen request
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fields marked <span className="text-emerald">*</span> are
                  required. We respond by email — no call required unless you
                  want one.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 px-6 py-6 sm:px-8 sm:py-8 md:grid-cols-2">
                <Field
                  label="Name"
                  required
                  error={fieldErrors.name}
                  htmlFor="name"
                >
                  <Input
                    id="name"
                    autoComplete="name"
                    placeholder="Jordan Avery"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    invalid={!!fieldErrors.name}
                  />
                </Field>

                <Field
                  label="Work email"
                  required
                  error={fieldErrors.email}
                  htmlFor="email"
                >
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    invalid={!!fieldErrors.email}
                  />
                </Field>

                <Field
                  label="Company"
                  required
                  error={fieldErrors.company}
                  htmlFor="company"
                >
                  <Input
                    id="company"
                    autoComplete="organization"
                    placeholder="Company name"
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    invalid={!!fieldErrors.company}
                  />
                </Field>

                <Field
                  label="Role"
                  required
                  error={fieldErrors.role}
                  htmlFor="role"
                >
                  <Input
                    id="role"
                    autoComplete="organization-title"
                    placeholder="e.g. Director, Project Development"
                    value={form.role}
                    onChange={(e) => update("role", e.target.value)}
                    invalid={!!fieldErrors.role}
                  />
                </Field>

                <Field
                  label="Candidate site — address, APN, or coordinates"
                  required
                  error={fieldErrors.siteLocation}
                  htmlFor="siteLocation"
                  className="md:col-span-2"
                >
                  <Textarea
                    id="siteLocation"
                    rows={3}
                    placeholder="e.g. APN 142-08-37 in unincorporated Kern County; or 34.9532°N, 118.1234°W"
                    value={form.siteLocation}
                    onChange={(e) => update("siteLocation", e.target.value)}
                  />
                  <FieldHint>
                    More specific is better. Address, parcel/APN, or coordinates
                    all work. We won’t share this without your permission.
                  </FieldHint>
                </Field>

                <Field
                  label="Project type"
                  required
                  error={fieldErrors.projectType}
                  htmlFor="projectType"
                >
                  <Select
                    value={form.projectType}
                    onValueChange={(v) => update("projectType", v)}
                  >
                    <SelectTrigger id="projectType" className="w-full">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field
                  label="Approximate project size (optional)"
                  error={fieldErrors.projectSizeMw}
                  htmlFor="projectSizeMw"
                >
                  <Input
                    id="projectSizeMw"
                    placeholder="e.g. ~20 MW / ~80 MWh"
                    value={form.projectSizeMw}
                    onChange={(e) => update("projectSizeMw", e.target.value)}
                    invalid={!!fieldErrors.projectSizeMw}
                  />
                  <FieldHint>
                    Optional — we don’t require this to screen.
                  </FieldHint>
                </Field>

                <Field
                  label="Current development stage"
                  required
                  error={fieldErrors.devStage}
                  htmlFor="devStage"
                >
                  <Select
                    value={form.devStage}
                    onValueChange={(v) => update("devStage", v)}
                  >
                    <SelectTrigger id="devStage" className="w-full">
                      <SelectValue placeholder="Select development stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {devStages.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <div className="md:col-span-2">
                  <Field
                    label="What decision are you trying to make?"
                    required
                    error={fieldErrors.decision}
                    htmlFor="decision"
                  >
                    <Textarea
                      id="decision"
                      rows={4}
                      placeholder="e.g. We’re choosing between three candidate sites in this substation cluster and want to know which deserves an interconnection study first."
                      value={form.decision}
                      onChange={(e) => update("decision", e.target.value)}
                    />
                    <FieldHint>
                      The better the question, the more useful the screen.
                    </FieldHint>
                  </Field>
                </div>

                <div className="md:col-span-2">
                  <Field
                    label="Additional notes (optional)"
                    error={fieldErrors.notes}
                    htmlFor="notes"
                  >
                    <Textarea
                      id="notes"
                      rows={3}
                      placeholder="Anything else worth knowing — known constraints, existing studies, stakeholders."
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                    />
                  </Field>
                </div>

                {/* File upload — clearly marked demo/inactive */}
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium text-ink">
                    Supporting document
                  </Label>
                  <div className="mt-1.5 flex items-center gap-3 rounded-lg border border-dashed border-line bg-muted/30 px-4 py-3.5">
                    <FileText className="size-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm text-ink-soft">
                        Optional file upload is currently inactive.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        We don’t pretend to receive files we can’t securely
                        handle. Email them to{" "}
                        <a
                          href="mailto:hello@geospatialabs.com"
                          className="font-medium text-emerald hover:underline"
                        >
                          hello@geospatialabs.com
                        </a>{" "}
                        instead.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-md border border-line bg-card px-2 py-1 text-[10.5px] font-medium uppercase tracking-wide text-muted-foreground">
                      <Lock className="size-3" />
                      Inactive
                    </span>
                  </div>
                </div>

                {/* Privacy acknowledgement */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="privacyAck"
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
                      fieldErrors.privacyAck
                        ? "border-rose/40 bg-rose/5"
                        : "border-line-soft bg-muted/30 hover:bg-muted/60",
                    )}
                  >
                    <Checkbox
                      id="privacyAck"
                      checked={form.privacyAck}
                      onCheckedChange={(v) =>
                        update("privacyAck", v === true)
                      }
                      className="mt-0.5"
                    />
                    <span className="text-sm leading-relaxed text-ink-soft">
                      I acknowledge that Geospatial Labs uses the information I
                      submit solely to evaluate and respond to this request, and
                      that a preliminary site screen does not replace formal
                      engineering, utility, legal, environmental, or agency
                      determinations.{" "}
                      <span className="text-emerald">*</span>
                    </span>
                  </label>
                  {fieldErrors.privacyAck && (
                    <p className="mt-1.5 text-xs text-rose">
                      {fieldErrors.privacyAck}
                    </p>
                  )}
                </div>

                {/* Server error */}
                {serverError && (
                  <div className="md:col-span-2">
                    <div className="flex items-start gap-2 rounded-lg border border-rose/40 bg-rose/5 px-4 py-3 text-sm text-rose">
                      <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  </div>
                )}

                {/* Submit */}
                <div className="md:col-span-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="size-3.5 text-emerald" />
                    No payment requested. No fake turnaround time. We follow up
                    by email.
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="w-full gap-2 bg-emerald text-emerald-foreground shadow-sm hover:bg-emerald-soft sm:w-auto"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Request Site Screen
                        <ArrowLeft className="size-4 rotate-180" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-emerald">*</span>}
      </Label>
      {children}
      {hint && !error && <FieldHint>{hint}</FieldHint>}
      {error && (
        <p className="mt-0.5 flex items-center gap-1 text-xs text-rose">
          <CircleAlert className="size-3" />
          {error}
        </p>
      )}
    </div>
  );
}

function FieldHint({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted-foreground">{children}</p>;
}

function WhatHappensNext() {
  return (
    <div className="surface-card p-5">
      <h3 className="text-base font-semibold text-ink">What happens next</h3>
      <ol className="mt-4 space-y-3.5">
        {[
          "We receive your request and review whether the site fits the current California BESS screening scope.",
          "If it fits, we confirm scope with you by email and gather relevant public-source evidence.",
          "You receive a structured preliminary intelligence brief — findings, sources, unknowns, conflicts, and next-step questions.",
          "You decide where deeper engineering, interconnection, legal, environmental, or permitting work is warranted.",
        ].map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald/10 font-mono text-[11px] font-semibold text-emerald">
              {i + 1}
            </span>
            <span className="text-sm leading-relaxed text-muted-foreground">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function WhatItSupports() {
  return (
    <div className="surface-quiet p-5">
      <h3 className="text-sm font-semibold text-ink">What a brief supports</h3>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {[
          "Deciding which candidate site deserves deeper diligence first",
          "Organizing fragmented public evidence in one place",
          "Surfacing unknowns and source conflicts early",
          "Aligning internal teams on what’s known and what’s open",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WhatItDoesNotReplace() {
  return (
    <div className="surface-quiet p-5">
      <h3 className="text-sm font-semibold text-ink">
        What it does not replace
      </h3>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {[
          "Formal engineering or interconnection studies",
          "Utility capacity or queue determinations",
          "Legal, environmental, or agency determinations",
          "Licensed professional judgment",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SuccessView({
  referenceId,
  onBack,
}: {
  referenceId: string | null;
  onBack: () => void;
}) {
  return (
    <div className="bg-background">
      <header className="relative overflow-hidden border-b border-line bg-background">
        <div className="absolute inset-0 text-ink" aria-hidden="true">
          <TopographicParcelBg variant="soft" />
        </div>
        <div className="relative mx-auto w-full max-w-3xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="surface-card p-8 text-center sm:p-12">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald/12 text-emerald">
              <CheckCircle2 className="size-9" />
            </div>
            <h1 className="mt-6 display-md text-ink">Request received.</h1>
            <p className="mx-auto mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground">
              The Geospatial Labs team will review whether your candidate site
              fits the current California BESS screening scope and follow up by
              email. We don’t promise a turnaround time we can’t stand behind —
              we’ll be in touch as soon as we can with a real answer.
            </p>

            {referenceId && (
              <p className="mt-6 inline-flex items-center gap-2 rounded-md border border-line-soft bg-muted/40 px-3 py-2 font-mono text-xs text-ink-soft">
                Reference: {referenceId}
              </p>
            )}

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                onClick={onBack}
                className="gap-2 bg-emerald text-emerald-foreground hover:bg-emerald-soft"
              >
                <ArrowLeft className="size-4" />
                Back to site
              </Button>
              <a
                href="mailto:hello@geospatialabs.com"
                className="inline-flex items-center gap-2 rounded-md border border-line bg-card px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-muted"
              >
                <Mail className="size-4" />
                Email the team
              </a>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              We use your information solely to evaluate and respond to this
              request. We don’t sell data.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              icon: MapPin,
              title: "Site fit review",
              detail: "We confirm whether your site fits current screening scope.",
            },
            {
              icon: Building2,
              title: "No payment yet",
              detail: "We don’t request payment at this stage — only details.",
            },
            {
              icon: ShieldCheck,
              title: "Privacy respected",
              detail: "We don’t share submitted information without your permission.",
            },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="surface-quiet p-4">
                <Icon className="size-5 text-emerald" />
                <p className="mt-3 text-sm font-semibold text-ink">{c.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                  {c.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
