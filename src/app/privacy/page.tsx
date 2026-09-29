import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Privacy Policy — GeoSpatia Labs",
  description:
    "How GeoSpatia Labs collects, uses, and protects the data submitted through our California BESS preliminary site screen request form.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-background">
      {/* Return bar */}
      <div className="border-b border-line bg-card/60">
        <div className="mx-auto flex w-full max-w-[1600px] items-center px-5 py-3 sm:px-6 lg:px-10 xl:px-16">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="gap-2 text-muted-foreground hover:text-ink cursor-pointer"
          >
            <Link href="/">
              <ArrowLeft className="size-4" />
              Back to home
            </Link>
          </Button>
        </div>
      </div>

      <main className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-6 lg:px-10">
        <div className="flex items-center gap-2 text-emerald mb-4">
          <ShieldCheck className="size-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Privacy Policy
          </span>
        </div>

        <h1 className="display-md text-ink text-balance">
          Privacy Policy
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: September 2026
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
          {/* 1. Who We Are */}
          <section>
            <h2 className="text-base font-semibold text-ink mb-2">
              1. Who We Are
            </h2>
            <p>
              GeoSpatia Labs provides preliminary site intelligence for
              California battery energy storage system (BESS) development
              teams. Our marketing website at{" "}
              <span className="text-ink font-medium">geospatialabs.com</span>{" "}
              allows prospective customers to learn about our services and
              submit an inquiry to request a preliminary site screen.
            </p>
          </section>

          {/* 2. What Data We Collect */}
          <section>
            <h2 className="text-base font-semibold text-ink mb-2">
              2. What Data We Collect
            </h2>
            <p className="mb-2">
              When you submit a site screen inquiry through our request form,
              we collect the following information you provide:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Your full name, work email address, company name, and role.</li>
              <li>
                Candidate site location information (address, county, APN,
                coordinates, or geographic description).
              </li>
              <li>
                Project details: project type, approximate capacity, storage
                duration, development stage, and your evaluation question.
              </li>
              <li>Any additional notes you choose to include.</li>
            </ul>
            <p className="mt-3">
              We do <strong className="text-ink">not</strong> collect payment
              information through this form. No payment is requested at the
              inquiry stage.
            </p>
          </section>

          {/* 3. How We Use Your Data */}
          <section>
            <h2 className="text-base font-semibold text-ink mb-2">
              3. How We Use Your Data
            </h2>
            <p>
              We use the information you submit solely for the following
              purposes:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
              <li>
                To evaluate whether your candidate site falls within our
                current research scope (California BESS).
              </li>
              <li>
                To contact you by email to discuss scope, confirm details,
                and provide our preliminary site screen if engagement
                proceeds.
              </li>
              <li>
                To dispatch an internal notification to our review team so your
                inquiry is screened promptly.
              </li>
              <li>
                To improve our internal screening processes and understand
                market demand (in aggregate, without exposing individual
                candidate locations).
              </li>
            </ul>
          </section>

          {/* 4. Privacy-First Website Analytics */}
          <section>
            <h2 className="text-base font-semibold text-ink mb-2">
              4. Privacy-First Website Analytics
            </h2>
            <p className="mb-2">
              We use a lightweight, privacy-focused analytics service (Plausible
              Analytics) to understand general website traffic and referral
              sources. Our analytics implementation adheres strictly to the
              following privacy principles:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong className="text-ink">No cookies:</strong> We do not use
                cookies or persistent local identifiers to track visitors.
              </li>
              <li>
                <strong className="text-ink">No cross-site tracking:</strong> We
                do not follow you across different websites or build behavioral
                profiles.
              </li>
              <li>
                <strong className="text-ink">No personal data or coordinates:</strong>{" "}
                Custom interaction events record only high-level categories
                (e.g., project stage selection or campaign attribution tags) and
                never include names, email addresses, search queries, or site
                coordinates.
              </li>
              <li>
                <strong className="text-ink">Aggregated reporting:</strong> All
                traffic statistics are aggregated and fully compliant with GDPR,
                CCPA, and PECR without requiring invasive cookie banners.
              </li>
            </ul>
          </section>

          {/* 5. Data Processors & Infrastructure */}
          <section>
            <h2 className="text-base font-semibold text-ink mb-2">
              5. Data Processors &amp; Infrastructure
            </h2>
            <p className="mb-2">
              Your inquiry data and website interactions are processed using the
              following services:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong className="text-ink">Supabase</strong> (database
                hosting): Your inquiry is stored in a secure PostgreSQL database
                hosted by Supabase with row-level security. Only authorized
                GeoSpatia Labs team members can read submitted inquiries.
                Public visitors cannot read, modify, or delete any records.
              </li>
              <li>
                <strong className="text-ink">Resend</strong> (transactional
                email): When an inquiry is submitted and recorded in Supabase,
                a transactional email is securely dispatched to our admin inbox
                (admin@geospatialabs.com) so our team can follow up promptly.
              </li>
              <li>
                <strong className="text-ink">Vercel</strong> (website
                hosting): The marketing website and its serverless API endpoints
                are hosted on Vercel&apos;s infrastructure. Vercel processes HTTP
                requests in order to serve pages and receive form submissions.
              </li>
              <li>
                <strong className="text-ink">Mapbox</strong> (geocoding):
                When you use the interactive map or address search, your
                search query is sent to Mapbox&apos;s Geocoding API to resolve
                addresses to geographic coordinates. Mapbox processes
                address queries according to their own privacy policy.
              </li>
              <li>
                <strong className="text-ink">Plausible Analytics</strong> (traffic
                measurement): Collects privacy-preserving, aggregated visitor
                metrics without tracking personal identities or storing IP
                addresses.
              </li>
            </ul>
          </section>

          {/* 6. What We Do NOT Do */}
          <section>
            <h2 className="text-base font-semibold text-ink mb-2">
              6. What We Do Not Do
            </h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                We do <strong className="text-ink">not sell</strong> your
                personal information or candidate site locations to any third
                party.
              </li>
              <li>
                We do <strong className="text-ink">not share</strong>{" "}
                candidate site locations with competing developers, utilities,
                landowners, or any external parties beyond the processors
                listed above.
              </li>
              <li>
                We do <strong className="text-ink">not</strong> use tracking
                cookies for advertising or retargeting purposes.
              </li>
              <li>
                We do <strong className="text-ink">not</strong> contact you
                for unsolicited marketing beyond responding to your inquiry.
              </li>
            </ul>
          </section>

          {/* 7. Data Retention */}
          <section>
            <h2 className="text-base font-semibold text-ink mb-2">
              7. Data Retention
            </h2>
            <p>
              Inquiry data is retained for as long as necessary to evaluate
              the candidate site, complete any resulting engagement, and
              satisfy any legal or accounting obligations. You may request
              deletion of your inquiry data at any time by contacting us.
            </p>
          </section>

          {/* 8. Your Rights */}
          <section>
            <h2 className="text-base font-semibold text-ink mb-2">
              8. Your Rights
            </h2>
            <p>
              You may contact us at any time to request access to, correction
              of, or deletion of the personal data you submitted. We will
              respond to your request within 30 days.
            </p>
          </section>

          {/* 9. Contact */}
          <section>
            <h2 className="text-base font-semibold text-ink mb-2">
              9. Contact
            </h2>
            <p>
              If you have questions about this privacy policy or your data,
              please contact us:
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-line bg-card px-4 py-2.5 text-sm">
              <Mail className="size-4 text-emerald" />
              <a
                href="mailto:admin@geospatialabs.com"
                className="font-medium text-ink hover:text-emerald transition-colors"
              >
                admin@geospatialabs.com
              </a>
            </div>
          </section>

          {/* 10. Changes */}
          <section>
            <h2 className="text-base font-semibold text-ink mb-2">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. Material
              changes will be noted on this page with an updated revision
              date.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
