"use client";

import { motion, useReducedMotion } from "motion/react";
import { useT } from "@/components/providers/LanguageProvider";
import { ConnectionGraph } from "@/components/ui/ConnectionGraph";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function Hero() {
  const t = useT();
  const reduced = useReducedMotion();
  const anim = (variants: typeof fadeInUp) =>
    reduced
      ? {}
      : { variants, initial: "hidden" as const, animate: "visible" as const };

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-16"
    >
      <div className="aurora" />

      <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-12 md:grid-cols-2">
        {/* Columna de texto */}
        <motion.div
          {...(reduced
            ? {}
            : {
                variants: staggerContainer,
                initial: "hidden" as const,
                animate: "visible" as const,
              })}
          className="flex flex-col gap-6"
        >
          <motion.p
            variants={reduced ? undefined : fadeInUp}
            className="text-sm uppercase tracking-widest text-cyan"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={reduced ? undefined : fadeInUp}
            className="text-4xl font-bold leading-[1.1] sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.hero.headlineA}{" "}
            <span className="text-gradient">{t.hero.headlineHighlight}</span>{" "}
            {t.hero.headlineB}
          </motion.h1>

          <motion.p
            variants={reduced ? undefined : fadeInUp}
            className="max-w-md text-base leading-relaxed text-muted"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={reduced ? undefined : fadeInUp}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
              style={{ background: "var(--gradient-flow)" }}
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#contact"
              className="rounded-full border px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:bg-panel"
              style={{ borderColor: "var(--border-strong)" }}
            >
              {t.hero.ctaSecondary}
            </a>
          </motion.div>

          {/* Señales: ubicación + inglés */}
          <motion.div
            variants={reduced ? undefined : fadeInUp}
            className="flex flex-wrap gap-2 pt-2"
          >
            {[t.hero.location, t.hero.english].map((chip) => (
              <span
                key={chip}
                className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
                style={{
                  fontFamily: "var(--font-mono)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--color-muted)",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--gradient-flow)" }}
                />
                {chip}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Columna del grafo */}
        <motion.div
          {...anim(fadeInUp)}
          className="flex flex-col items-center gap-4"
        >
          <ConnectionGraph />
          <p
            className="text-center text-xs uppercase tracking-widest text-muted"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t.hero.graphCaption}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
