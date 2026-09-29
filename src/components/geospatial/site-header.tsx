"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./brand";
import { navLinks } from "@/lib/geospatial/content";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X, ArrowRight } from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-line/80 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
          : "border-b border-transparent bg-background/40 backdrop-blur-[2px]",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-5 sm:px-6 lg:px-10 xl:px-16">
        <Link href="/" className="inline-flex items-center" aria-label="Geospatial Labs home">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/sample-report"
                ? pathname === "/sample-report"
                : link.href === "/request"
                  ? pathname === "/request"
                  : false;
            return (
              <Link
                key={link.label}
                href={link.href}
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
              </Link>
            );
          })}
        </nav>

          <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-muted-foreground hover:text-ink"
          >
            <Link href="/sample-report">What a Brief Covers</Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="gap-1.5 bg-emerald text-emerald-foreground shadow-sm hover:bg-emerald-soft"
          >
            <Link href="/request">
              Request a Site Screen
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-md border border-line text-ink"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="border-t border-line bg-background md:hidden">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-1 px-5 py-4 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-3 text-left text-base font-medium text-ink hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button variant="outline" asChild className="w-full">
                <Link href="/sample-report" onClick={() => setMobileOpen(false)}>
                  What a Brief Covers
                </Link>
              </Button>
              <Button
                asChild
                className="w-full bg-emerald text-emerald-foreground hover:bg-emerald-soft"
              >
                <Link href="/request" onClick={() => setMobileOpen(false)}>
                  Request a Site Screen
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
