"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n/config";

/**
 * Toggle ES/EN con una "píldora" deslizante que resalta el idioma activo.
 */
export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  const reduced = useReducedMotion();

  return (
    <div
      className="relative flex items-center rounded-full border p-0.5"
      style={{ borderColor: "var(--border-strong)" }}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((l) => {
        const active = locale === l;
        return (
          <button
            key={l}
            onClick={() => setLocale(l)}
            aria-pressed={active}
            className="relative z-10 rounded-full px-3 py-1 text-xs font-semibold transition-colors"
            style={{
              fontFamily: "var(--font-mono)",
              color: active ? "#0a0c16" : "var(--color-muted)",
            }}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full"
                style={{ background: "var(--gradient-flow)" }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 400, damping: 30 }
                }
              />
            )}
            {LOCALE_LABELS[l]}
          </button>
        );
      })}
    </div>
  );
}
