"use client";

import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type LottiePlayerProps = {
  /** Ruta al archivo exportado desde Jitter (.lottie o .json) en /public. */
  src?: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  /** Texto del placeholder mientras no hay animación cargada. */
  placeholderLabel?: string;
};

/**
 * Reproductor de animaciones Lottie (formato que exporta Jitter).
 *
 * Flujo: diseñas en Jitter → Export → Lottie → guardas el archivo en
 * /public/animations/ → pasas la ruta en `src`.
 *
 * Si `src` está vacío muestra un placeholder de marca, para que el layout
 * no se rompa mientras experimentas con las animaciones.
 */
export function LottiePlayer({
  src,
  loop = true,
  autoplay = true,
  className,
  placeholderLabel = "Animación de Jitter",
}: LottiePlayerProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!src) {
    return (
      <div
        className={className}
        aria-label={placeholderLabel}
        role="img"
        style={{
          display: "grid",
          placeItems: "center",
          borderRadius: "1.25rem",
          background:
            "radial-gradient(circle at 50% 40%, rgba(139,92,246,0.25), transparent 70%)",
          border: "1px dashed var(--border-strong)",
          minHeight: "12rem",
        }}
      >
        <div
          style={{
            width: "6rem",
            height: "6rem",
            borderRadius: "9999px",
            background: "var(--gradient-flow)",
            filter: "blur(2px)",
            animation: reducedMotion
              ? "none"
              : "lottie-pulse 3s ease-in-out infinite",
          }}
        />
        <span
          style={{
            marginTop: "1rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--color-muted)",
            letterSpacing: "0.05em",
          }}
        >
          {placeholderLabel}
        </span>
        <style>{`
          @keyframes lottie-pulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.12); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <DotLottieReact
      src={src}
      loop={loop}
      autoplay={autoplay && !reducedMotion}
      className={className}
    />
  );
}
