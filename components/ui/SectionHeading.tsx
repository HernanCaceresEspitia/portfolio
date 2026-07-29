"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  children: ReactNode;
  className?: string;
};

/** Encabezado consistente para todas las secciones: eyebrow + título. */
export function SectionHeading({
  eyebrow,
  children,
  className,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <Reveal>
        <p
          className="text-sm uppercase tracking-widest text-cyan"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          className="mt-3 max-w-2xl text-2xl font-bold leading-snug sm:text-3xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {children}
        </h2>
      </Reveal>
    </div>
  );
}
