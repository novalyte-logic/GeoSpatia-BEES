import * as React from "react";
import { cn } from "@/lib/utils";

/** Section wrapper with consistent vertical rhythm + max width. */
export function Section({
  id,
  className,
  containerClassName,
  children,
  ...props
}: React.ComponentProps<"section"> & { containerClassName?: string }) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24", className)}
      {...props}
    >
      <div className={cn("mx-auto w-full max-w-[1600px] px-4 min-[375px]:px-5 sm:px-6 lg:px-10 xl:px-16 min-w-0", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

/** Eyebrow label — small uppercase tracking. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2 text-emerald",
        className,
      )}
    >
      <span className="h-px w-5 bg-emerald/50" aria-hidden="true" />
      {children}
    </span>
  );
}

/** Section heading block — eyebrow + title + optional intro. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 min-w-0",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={cn("display-md text-ink text-balance break-words", titleClassName)}>
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "max-w-2xl text-[0.9375rem] sm:text-[1.0625rem] leading-relaxed text-muted-foreground text-pretty",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
