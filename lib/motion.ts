import type { Variants, Transition } from "motion/react";

/**
 * Vocabulario de animación compartido por todo el portafolio.
 * Centralizarlo aquí evita que cada sección invente su propio timing
 * y mantiene la sensación de "flujo" coherente.
 */

/** Easing suave tipo easeOutExpo — la base de casi todo. */
export const EASE_FLOW: Transition["ease"] = [0.22, 1, 0.36, 1];

/** Transición estándar para entradas. */
export const transitionFlow: Transition = {
  duration: 0.6,
  ease: EASE_FLOW,
};

/** Aparecer subiendo (el gesto por defecto de las secciones). */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: transitionFlow },
};

/** Aparecer bajando (para navbar y elementos superiores). */
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: transitionFlow },
};

/** Contenedor que revela a sus hijos en cascada. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};
