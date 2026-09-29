"use client";

import * as React from "react";
import Link from "next/link";
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
  durationHours: string;
  devStage: string;
  decision: string;
  notes: string;
  privacyAck: boolean;
  hp_website: string; // Honeypot field for bot protection
};

const empty: FormState = {
  name: "",
  email: "",
  company: "",
  role: "",
  siteLocation: "",
  projectType: "",
  projectSizeMw: "",
  durationHours: "",
  devStage: "",
  decision: "",
  notes: "",
  privacyAck: false,
  hp_website: "",
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

export function RequestFormView({ onBack }: { onBack?: () => void } = {}) {
  const [form, setForm] = React.useState<FormState>(empty);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [referenceId, setReferenceId] = React.useState<string | null>(null);

  // Pre-fill location from query param if transferred from Candidate Locator Map
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const loc = params.get("location");
      if (loc && loc.trim().length > 0) {
        setForm((prev) => ({ ...prev, siteLocation: loc.trim() }));
      }
    }
  }, []);

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

  const validateClientSide = (): boolean => {
    const errs: Record<string, string> = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      errs.name = "Please enter your full name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email.trim())) {
      errs.email = "Please enter a valid work email address.";
    }

    if (!form.company.trim() || form.company.trim().length < 2) {
      errs.company = "Please enter your company name.";
    }

    if (!form.role.trim() || form.role.trim().length < 2) {
      errs.role = "Please enter your role or title.";
    }

    if (!form.siteLocation.trim() || form.siteLocation.trim().length < 5) {
      errs.siteLocation =
        "Please provide candidate location information (county, APN, coordinates, or address).";
    }

    if (!form.projectType) {
      errs.projectType = "Please select a project type.";
    }

    if (!form.devStage) {
      errs.devStage = "Please select your development stage.";
    }

    if (!form.decision.trim() || form.decision.trim().length < 10) {
      errs.decision =
        "Please describe the question or decision you are evaluating.";
    }

    if (!form.privacyAck) {
      errs.privacyAck = "Please acknowledge the privacy notice to proceed.";
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setServerError(null);

    // Client-side usability check
    if (!validateClientSide()) {
      setServerError("Please review the highlighted fields before submitting.");
      return;
    }

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
            "We were unable to save your inquiry. Please try again or email hello@geospatialabs.com directly."
        );
        return;
      }

      // ONLY show confirmation after real DB confirmation
      setReferenceId(data.referenceId ?? null);
      setSubmitted(true);
      setFieldErrors({});
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setServerError(
        "Network connection failed. Your entered details were preserved — please check your connection and try submitting again."
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
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 py-3 sm:px-6 lg:px-10 xl:px-16">
          {onBack ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="gap-2 text-muted-foreground hover:text-ink cursor-pointer"
            >
              <ArrowLeft className="size-4" />
              Back to site
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="gap-2 text-muted-foreground hover:text-ink cursor-pointer"
            >
              <Link href="/">
                <ArrowLeft className="size-4" />
                Back to site
              </Link>
            </Button>
          )}
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
        <div className="relative mx-auto w-full max-w-[1600px] px-5 py-12 sm:px-6 lg:px-10 xl:px-16 lg:py-16">
          <span className="eyebrow inline-flex items-center gap-2 text-emerald">
            <span className="h-px w-5 bg-emerald/50" />
            Request a Site Screen
          </span>
          <h1 className="mt-3 display-md text-ink text-balance">
            Tell us about a candidate California BESS site.
          </h1>
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-muted-foreground text-pretty">
            You’re requesting a manually prepared preliminary site intelligence
            brief. We’ll review whether the site fits our current research scope
            and follow up directly by email.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-6 lg:px-10 xl:px-16">
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
                  request one.
                </p>
              </div>

              {/* Honeypot field (hidden from human users, catches automated bots) */}
              <div aria-hidden="true" className="hidden">
                <label htmlFor="hp_website">Leave this field blank</label>
                <input
                  type="text"
                  id="hp_website"
                  name="hp_website"
                  value={form.hp_website}
                  onChange={(e) => update("hp_website", e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 px-6 py-6 sm:px-8 sm:py-8 md:grid-cols-2">
                <Field
                  label="Full name"
                  required
                  error={fieldErrors.name}
                  htmlFor="name"
                >
                  <Input
                    id="name"
                    placeholder="First and last name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={!!fieldErrors.name}
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
                    placeholder="name@company.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    aria-invalid={!!fieldErrors.email}
                  />
                </Field>

                <Field
                  label="Company / Organization"
                  required
                  error={fieldErrors.company}
                  htmlFor="company"
                >
                  <Input
                    id="company"
                    placeholder="Development firm or fund name"
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    aria-invalid={!!fieldErrors.company}
                  />
                </Field>

                <Field
                  label="Role / Title"
                  required
                  error={fieldErrors.role}
                  htmlFor="role"
                >
                  <Input
                    id="role"
                    placeholder="e.g. Director of Project Development"
                    value={form.role}
                    onChange={(e) => update("role", e.target.value)}
                    aria-invalid={!!fieldErrors.role}
                  />
                </Field>

                <Field
                  label="Candidate location"
                  required
                  error={fieldErrors.siteLocation}
                  htmlFor="siteLocation"
                  className="md:col-span-2"
                >
                  <Textarea
                    id="siteLocation"
                    rows={3}
                    placeholder="e.g. County, parcel APN, street address, or approximate coordinates"
                    value={form.siteLocation}
                    onChange={(e) => update("siteLocation", e.target.value)}
                    aria-invalid={!!fieldErrors.siteLocation}
                  />
                  <FieldHint>
                    More specific information produces a clearer screen. Parcel APN, street address, or approximate coordinates all work.
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

                <Field
                  label="Approximate capacity in MW (optional)"
                  error={fieldErrors.projectSizeMw}
                  htmlFor="projectSizeMw"
                >
                  <Input
                    id="projectSizeMw"
                    placeholder="e.g. 20 MW, 50 MW, 100 MW"
                    value={form.projectSizeMw}
                    onChange={(e) => update("projectSizeMw", e.target.value)}
                    aria-invalid={!!fieldErrors.projectSizeMw}
                  />
                </Field>

                <Field
                  label="Approximate duration in hours (optional)"
                  error={fieldErrors.durationHours}
                  htmlFor="durationHours"
                >
                  <Input
                    id="durationHours"
                    placeholder="e.g. 2 hr, 4 hr, 8 hr"
                    value={form.durationHours}
                    onChange={(e) => update("durationHours", e.target.value)}
                    aria-invalid={!!fieldErrors.durationHours}
                  />
                </Field>

                <div className="md:col-span-2">
                  <Field
                    label="What decision or question are you evaluating?"
                    required
                    error={fieldErrors.decision}
                    htmlFor="decision"
                  >
                    <Textarea
                      id="decision"
                      rows={4}
                      placeholder="e.g. We are comparing candidate parcels near this substation and need to identify published zoning constraints, nearby queue filings, and environmental overlays before securing land."
                      value={form.decision}
                      onChange={(e) => update("decision", e.target.value)}
                      aria-invalid={!!fieldErrors.decision}
                    />
                    <FieldHint>
                      Explaining the specific question helps us tailor the brief to the diligence issues that matter most.
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
                      placeholder="Any known constraints, existing studies, or specific utilities involved."
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      aria-invalid={!!fieldErrors.notes}
                    />
                  </Field>
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
                      onCheckedChange={(c) => update("privacyAck", c === true)}
                      aria-invalid={!!fieldErrors.privacyAck}
                    />
                    <div className="text-xs leading-relaxed text-muted-foreground">
                      <p className="font-medium text-ink">
                        Privacy notice acknowledgment{" "}
                        <span className="text-emerald">*</span>
                      </p>
                      <p className="mt-1">
                        We use the information you submit solely to review whether
                        your candidate site fits our research scope and to respond
                        to your inquiry. We do not sell data or share candidate site
                        locations with third parties.
                      </p>
                    </div>
                  </label>
                  {fieldErrors.privacyAck && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-rose" role="alert">
                      <CircleAlert className="size-3.5" />
                      {fieldErrors.privacyAck}
                    </p>
                  )}
                </div>
              </div>

              {serverError && (
                <div className="border-t border-rose/30 bg-rose/10 px-6 py-4 sm:px-8" role="alert">
                  <div className="flex items-start gap-2.5 text-sm text-rose">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                    <div>
                      <p className="font-medium">Submission incomplete</p>
                      <p className="mt-0.5 text-rose/90">{serverError}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col items-start justify-between gap-4 border-t border-line bg-muted/30 px-6 py-4 sm:flex-row sm:items-center sm:px-8">
                <p className="text-xs text-muted-foreground">
                  No payment is requested at this stage. Scope and fees are
                  confirmed directly before any engagement begins.
                </p>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full gap-2 bg-emerald text-emerald-foreground hover:bg-emerald-soft sm:w-auto cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Submitting inquiry...
                    </>
                  ) : (
                    "Submit site screen inquiry"
                  )}
                </Button>
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
  required,
  error,
  htmlFor,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-1 text-emerald">*</span>}
      </Label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-rose" role="alert">
          <CircleAlert className="size-3.5" />
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
  const steps = [
    {
      n: "1",
      title: "Scope review",
      detail:
        "We review the candidate location, jurisdiction, and question against our research scope and public source availability.",
    },
    {
      n: "2",
      title: "Scope & fee confirmation",
      detail:
        "If the site fits our screening scope, we confirm delivery scope and fee directly by email before beginning research.",
    },
    {
      n: "3",
      title: "Deliverable delivery",
      detail:
        "You receive a structured preliminary intelligence brief with verified findings, clear unknowns, and specific questions for next-stage diligence.",
    },
  ];

  return (
    <div className="surface-card p-5">
      <h3 className="text-sm font-semibold text-ink">What happens next</h3>
      <ol className="mt-3 space-y-3">
        {steps.map((s) => (
          <li key={s.n} className="flex items-start gap-3">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald/10 font-mono text-[11px] font-semibold text-emerald">
              {s.n}
            </span>
            <div className="text-xs leading-relaxed">
              <p className="font-medium text-ink">{s.title}</p>
              <p className="text-muted-foreground">{s.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function WhatItSupports() {
  return (
    <div className="surface-card p-5">
      <h3 className="text-sm font-semibold text-ink">What a screen helps with</h3>
      <ul className="mt-3 space-y-2 text-xs leading-relaxed text-muted-foreground">
        {[
          "Triage multiple candidate sites before spending on interconnection studies.",
          "Identify published zoning, jurisdiction, and permitting signals early.",
          "Surface environmental overlays and known siting constraints.",
          "Prepare specific questions for electrical engineers, land counsel, and permitting specialists.",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 size-1 shrink-0 rounded-full bg-emerald" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WhatItDoesNotReplace() {
  return (
    <div className="surface-card p-5">
      <h3 className="text-sm font-semibold text-ink">
        What it does not replace
      </h3>
      <ul className="mt-3 space-y-2 text-xs leading-relaxed text-muted-foreground">
        {[
          "Formal engineering or interconnection studies",
          "Utility capacity or queue determinations",
          "Legal, environmental, or agency determinations",
          "Licensed professional stamp or sign-off",
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
  onBack?: () => void;
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
            <h1 className="mt-6 display-md text-ink">Inquiry received.</h1>
            <p className="mx-auto mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground">
              We have received your site screening inquiry. The GeoSpatia Labs
              team will review whether your candidate site fits our current
              California BESS screening scope and follow up directly by email.
            </p>

            {referenceId && (
              <div className="mt-6 inline-flex flex-col items-center gap-1 rounded-md border border-line-soft bg-muted/40 px-4 py-2.5">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Database Record Reference
                </span>
                <span className="font-mono text-xs text-ink font-semibold">
                  {referenceId}
                </span>
              </div>
            )}

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {onBack ? (
                <Button
                  onClick={onBack}
                  className="gap-2 bg-emerald text-emerald-foreground hover:bg-emerald-soft cursor-pointer"
                >
                  <ArrowLeft className="size-4" />
                  Back to site
                </Button>
              ) : (
                <Button
                  asChild
                  className="gap-2 bg-emerald text-emerald-foreground hover:bg-emerald-soft cursor-pointer"
                >
                  <Link href="/">
                    <ArrowLeft className="size-4" />
                    Back to site
                  </Link>
                </Button>
              )}
              <a
                href="mailto:hello@geospatialabs.com"
                className="inline-flex items-center gap-2 rounded-md border border-line bg-card px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-muted"
              >
                <Mail className="size-4" />
                hello@geospatialabs.com
              </a>
            </div>

            <p className="mt-8 text-xs text-muted-foreground max-w-md mx-auto">
              We use your submitted information solely to review and respond to
              this inquiry. No marketing spam, no third-party data sharing.
            </p>
          </div>
        </div>
      </header>
    </div>
  );
}
