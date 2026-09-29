"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./brand";
import { navLinks, type ViewId } from "@/lib/geospatial/content";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";

export function SiteHeader({
  view,
  onNavigate,
  onRequest,
  onSample,
}: {
  view: ViewId;
  onNavigate: (target: string, view?: ViewId) => void;
  onRequest: () => void;
  onSample: () => void;
}) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (target: string, v?: ViewId) => {
    setMobileOpen(false);
    onNavigate(target, v);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-line/80 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
          : "border-b border-transparent bg-background/40 backdrop-blur-[2px]",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Logo onNavigateHome={() => handleNav("top")} />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = link.view && link.view === view;
            return (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNav(link.target, link.view)}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "text-muted-foreground hover:text-ink",
                  isActive && "text-ink",
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-emerald/60" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSample}
            className="text-muted-foreground hover:text-ink"
          >
            View Sample Report
          </Button>
          <Button
            size="sm"
            onClick={onRequest}
            className="gap-1.5 bg-emerald text-emerald-foreground shadow-sm hover:bg-emerald-soft"
          >
            Request a Site Screen
            <ArrowRight className="size-3.5" />
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-md border border-line text-ink md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="border-t border-line bg-background md:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-4 sm:px-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNav(link.target, link.view)}
                className="rounded-md px-3 py-3 text-left text-base font-medium text-ink hover:bg-muted"
              >
                {link.label}
              </button>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setMobileOpen(false);
                  onSample();
                }}
                className="w-full"
              >
                View Sample Report
              </Button>
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  onRequest();
                }}
                className="w-full bg-emerald text-emerald-foreground hover:bg-emerald-soft"
              >
                Request a Site Screen
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
