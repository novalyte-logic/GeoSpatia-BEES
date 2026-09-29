"use client";

import { Section, SectionHeading } from "./section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is GeoSpatia Labs an engineering firm?",
    a: "No. GeoSpatia Labs provides preliminary research and decision intelligence. It does not replace formal engineering, utility studies, interconnection studies, legal advice, environmental consulting, or agency determinations. Final feasibility, cost, capacity, and approvals remain with the appropriate licensed professionals and authorities.",
  },
  {
    q: "Does a site screen guarantee interconnection capacity or project feasibility?",
    a: "No. Published information can be incomplete, directional, stale, or subject to change. Final feasibility, cost, capacity, approvals, and requirements are determined through the appropriate utility, engineering, agency, and formal study processes. A screen organizes what’s published today; it doesn’t predict what those processes will conclude.",
  },
  {
    q: "Where does the information come from?",
    a: "Relevant public and identified sources may include ISO/utility information, agency records, planning and permitting documents, parcel/GIS records, environmental records, and other documented project sources. The exact source set depends on the site and the question being asked. Findings always cite their source; missing data is labeled Unknown rather than inferred.",
  },
  {
    q: "What happens when information is missing or sources disagree?",
    a: "The brief identifies the information as Unknown or Conflicting rather than manufacture certainty. Conflicts show both sources so you can decide how to pursue them. Unknowns become explicit questions for the next stage of diligence.",
  },
  {
    q: "What does a site screen cost and how long does it take?",
    a: "Pricing and turnaround depend on the site, scope, and what you’re evaluating. We won’t quote a figure or timeline that isn’t real. When you request a screen we’ll review scope and confirm details with you directly before any commitment.",
  },
  {
    q: "Do you cover geographies beyond California BESS at launch?",
    a: "Not at launch. The initial wedge is California battery-energy-storage screening. We expand geographies and technologies deliberately, only where the source coverage genuinely supports a credible screen.",
  },
  {
    q: "Will you share a real customer reference or case study?",
    a: "Not at launch. We do not publish customer names, testimonials, or case studies we can’t stand behind. The Sample Report shows the structure and evidence-handling of a paid screen using illustrative demo data.",
  },
];

export function Faq() {
  return (
    <Section
      id="faq"
      className="border-b border-line bg-muted py-20 md:py-24"
    >
      <SectionHeading
        eyebrow="FAQ"
        title="Straight answers to the obvious questions"
        intro="If something here is unclear, ask us. We’d rather tell you what GeoSpatia Labs doesn’t do than imply it does more than it can support."
      />

      <div className="mt-12 mx-auto max-w-3xl">
        <Accordion
          type="single"
          collapsible
          defaultValue="item-0"
          className="rounded-xl border border-line bg-card shadow-sm"
        >
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className={i === faqs.length - 1 ? "border-b-0" : ""}
            >
              <AccordionTrigger className="px-5 py-4 text-left text-base font-semibold text-ink hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 text-[15px] leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
