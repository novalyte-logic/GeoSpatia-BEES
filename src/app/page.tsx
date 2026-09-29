"use client";

import * as React from "react";
import { SiteHeader } from "@/components/geospatial/site-header";
import { SiteFooter } from "@/components/geospatial/site-footer";
import { Hero } from "@/components/geospatial/hero";
import { TrustBar } from "@/components/geospatial/trust-bar";
import { WhatItBrings } from "@/components/geospatial/what-it-brings";
import { HowItWorks } from "@/components/geospatial/how-it-works";
import { SamplePreview } from "@/components/geospatial/sample-preview";
import { WhoItsFor } from "@/components/geospatial/who-its-for";
import { Methodology } from "@/components/geospatial/methodology";
import { WhyScreening } from "@/components/geospatial/why-screening";
import { Faq } from "@/components/geospatial/faq";
import { FinalCta } from "@/components/geospatial/final-cta";
import { About } from "@/components/geospatial/about";
import { SampleReportView } from "@/components/geospatial/sample-report-view";
import { RequestFormView } from "@/components/geospatial/request-form-view";
import type { ViewId } from "@/lib/geospatial/content";

export default function Home() {
  const [view, setView] = React.useState<ViewId>("home");

  // Scroll to top whenever the view changes to a full-page view,
  // or to a section anchor when navigating within the homepage.
  const navigate = React.useCallback(
    (target: string, next?: ViewId) => {
      if (next && next !== "home") {
        setView(next);
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
        return;
      }

      // Stay on (or return to) home, then scroll to the section anchor.
      setView("home");
      if (target === "top" || target === "home") {
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }
      // Use a microtask so the home view has rendered before scrolling.
      requestAnimationFrame(() => {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    },
    [],
  );

  const goRequest = React.useCallback(() => navigate("request", "request"), [navigate]);
  const goSample = React.useCallback(() => navigate("sample-report", "sample-report"), [navigate]);
  const goHome = React.useCallback(() => navigate("top"), [navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader
        view={view}
        onNavigate={navigate}
        onRequest={goRequest}
        onSample={goSample}
      />

      <main className="flex-1">
        {view === "home" && (
          <>
            <Hero onRequest={goRequest} onSample={goSample} />
            <TrustBar />
            <WhatItBrings />
            <HowItWorks />
            <SamplePreview onOpen={goSample} />
            <WhoItsFor />
            <Methodology />
            <WhyScreening />
            <Faq />
            <About />
            <FinalCta onRequest={goRequest} onSample={goSample} />
          </>
        )}

        {view === "sample-report" && (
          <SampleReportView onBack={goHome} onRequest={goRequest} />
        )}

        {view === "request" && <RequestFormView onBack={goHome} />}
      </main>

      <SiteFooter onNavigate={navigate} />
    </div>
  );
}
