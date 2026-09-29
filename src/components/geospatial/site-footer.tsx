"use client";

import { Logo } from "./brand";
import { footerNav, type ViewId } from "@/lib/geospatial/content";
import { ShieldCheck } from "lucide-react";

export function SiteFooter({
  onNavigate,
}: {
  onNavigate: (target: string, view?: ViewId) => void;
}) {
  return (
    <footer className="relative mt-auto border-t border-line bg-muted">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-12">
          {/* Brand + positioning */}
          <div className="col-span-2 md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Preliminary site intelligence for energy development. We bring the
              evidence together — grid, interconnection, parcel, permitting,
              environmental, and project context — into a source-backed screen
              before deeper diligence.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-line bg-card px-3 py-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-emerald" />
              Source-backed research · clear unknowns · preliminary diligence
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerNav).map(([group, items]) => (
            <div key={group} className="md:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                {group}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.target, item.view)}
                      className="text-sm text-muted-foreground transition-colors hover:text-ink"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="md:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">
              Contact
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("request", "request")}
                  className="text-left transition-colors hover:text-ink"
                >
                  Request a screen
                </button>
              </li>
              <li>
                <a
                  href="mailto:hello@geospatialabs.com"
                  className="transition-colors hover:text-ink"
                >
                  hello@geospatialabs.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Geospatial Labs. All rights reserved.</p>
          <p className="max-w-xl leading-relaxed">
            Preliminary research only — not engineering, utility, legal, or
            agency determination. Final feasibility, cost, capacity, and
            approvals are determined by the relevant utilities, agencies,
            engineers, and authorities.
          </p>
        </div>
      </div>
    </footer>
  );
}
