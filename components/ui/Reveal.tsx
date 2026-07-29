"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { fadeInUp } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Variante a usar (por defecto: aparecer subiendo). */
  variants?: Variants;
  /** Retraso extra en segundos. */
  delay?: number;
  /** Etiqueta HTML a renderizar (section, div, li, etc.). */
  as?: "div" | "section" | "li" | "span";
};

/**
 * Envuelve contenido y lo revela cuando entra en pantalla.
 * Si el usuario prefiere movimiento reducido, aparece sin animar.
 */
export function Reveal({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
