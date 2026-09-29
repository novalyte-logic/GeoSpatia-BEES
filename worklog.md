# Geospatial Labs Marketing Site — Worklog

This file tracks all work done on the Geospatial Labs marketing site build.

---
Task ID: 1
Agent: main
Task: Set up design tokens (emerald/slate/#FAFBFC palette) in globals.css and update layout.tsx metadata for Geospatial Labs

Work Log:
- Reviewed existing project structure (Next.js 16, Tailwind 4, shadcn/ui, Prisma SQLite)
- Confirmed dev server running on port 3000
- Planning design system: #FAFBFC canvas, white cards, deep slate-green-black headings, emerald accent, topographic/parcel/grid motifs
- All views (home, sample report, request form) will live in the `/` route via client-side view state, respecting the "only / route" constraint

---
Task ID: 2-10
Agent: main
Task: Build all homepage sections, full Sample Report view, Request-a-Screen form, API, Prisma schema, wire up page.tsx, polish per visual review

Work Log:
- Created reusable visual primitives: BrandMark/Logo (parcel-hex SVG), TopographicParcelBg (contour+grid+parcel SVG with hero/soft/grid variants), Section/Eyebrow/SectionHeading, StatusPill (verified/unknown/conflicting/deeper), EvidenceChip, EvidenceCard
- Built SiteHeader (sticky nav, mobile menu, scroll-aware backdrop) and SiteFooter (sticky mt-auto, 4-column nav, legal disclaimer)
- Built 11 homepage sections: Hero (with original report-preview card + mini parcel map SVG), TrustBar, WhatItBrings (6 EvidenceCards across grid/parcel/permitting/environmental/project/source-trail dimensions), HowItWorks (4-step process), SamplePreview (report-card with findings table + side "what you get" rail), WhoItsFor (4 audience cards), Methodology (principles + 6-stage flow), WhyScreening (4 logic points), FAQ (7 shadcn accordion items), About (modest factual), FinalCta (emerald CTA band)
- Built full Sample Report view: 13 sections (exec summary, candidate site, project/use, utility/jurisdiction, interconnection, parcel/site, permitting, environmental, project activity, findings table with 14 rows, source register with 12 sources, next diligence questions, scope/limitations). Sticky top-16 bar with "Demo data" amber badge (now visible on mobile too). DEMO DATA disclaimer in 5+ places. All findings carry status + source ref.
- Built RequestFormView: premium B2B lead capture form with all 11 fields (name, work email, company, role, site location, project type select, project size, dev stage select, decision, notes, privacy ack). File upload clearly marked INACTIVE (no fake backend). Server-side Zod validation via /api/site-screen route. Success view with reference ID + "no fake turnaround" copy. Privacy note. Three trust side-rails (what happens next, what a brief supports, what it doesn't replace).
- Prisma schema: added SiteScreenRequest model with all fields, status default "received", indexes on createdAt+email. Ran db:push successfully.
- API /api/site-screen POST: Zod schema validation, Prisma persistence, real 201 on success / 422 with fieldErrors / 500 on persistence failure. No fake success states.
- page.tsx: client-side view state (home/sample-report/request) respecting the "only / route" constraint. Smooth scroll-to-section + view-switch navigation.
- Visual review round 1 (subagent): identified squiggle, stacked-card clipping, micro-type floor, section flatness, font choice. Fixed: dropped whitespace-nowrap, replaced squiggle with clean emerald underline, changed stacked-card breakpoint to lg:block, added Newsreader serif for display headings, bumped 10px→11px→12px micro-type, added TopographicParcelBg soft to WhatItBrings.
- Visual review round 2 (subagent): identified mobile table clipping, depth cards not visible, mid-page flat band, FAQ muted bg buried. Fixed: added min-w-[640px] + "Swipe to view all columns →" hint, strengthened depth card shadow-md + bg-muted/70, swapped Methodology→muted and WhyScreening→canvas for proper alternation, added sticky "Demo data" badge to Sample Report header.
- End-to-end browser verification: homepage renders (1440x9856 desktop, 391x18222 mobile — clean reflow, no overflow, no console errors). Sample report renders (7385px, 13 sections). Form validation works (422 on empty submission, all 8 field errors displayed). Form submission works (POST 201, Prisma INSERT confirmed, DB record persisted with all fields, success view with reference ID "cmumngdz40000odewgj03q2ix", test record cleaned up).
- Sticky footer verified: page uses `min-h-screen flex flex-col` wrapper, footer has `mt-auto`, no overlap, no floating gap.

Stage Summary:
- Three views fully wired: home (11 sections), sample-report (full illustrative brief), request (form + success). All within the `/` route via client-side view state.
- Real lead-capture pipeline: form → /api/site-screen (Zod) → Prisma SiteScreenRequest → 201 + reference ID. Validation errors surface per-field. No fake success.
- Production-ready per final visual review (9/10 desktop, 9/10 mobile, 9/10 sample report). All trust guardrails honored: no fake customers/logos/case studies/numbers; DEMO DATA labeled throughout; preliminary-only positioning; California BESS scope only.
- Tech: Next.js 16 App Router, TypeScript, Tailwind 4 + shadcn/ui, Prisma SQLite, Inter + Newsreader + JetBrains Mono, z-ai-web-dev-sdk available but unused (not needed for marketing site).
