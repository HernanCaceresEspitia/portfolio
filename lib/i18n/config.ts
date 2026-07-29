/**
 * Configuración del sistema bilingüe.
 * Añadir un idioma nuevo = agregarlo aquí y en dictionaries.ts.
 */
export const LOCALES = ["es", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

/** Nombres visibles en el toggle */
export const LOCALE_LABELS: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};
