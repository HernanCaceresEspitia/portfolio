"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Grafo de conexión: nodos de tecnologías conectados a un hub central (HC).
 * Metáfora visual de Hernán como la capa de integración: los datos de cada
 * sistema (React, Shopify, NestJS, Postgres) fluyen hacia el centro.
 *
 * Líneas y partículas: SVG. Nodos: HTML posicionado en porcentajes.
 */

const CENTER = { x: 50, y: 50 };

const NODES = [
  { id: "react", label: "React", x: 15, y: 18, color: "#22d3ee" },
  { id: "shopify", label: "Shopify", x: 85, y: 18, color: "#8b5cf6" },
  { id: "nestjs", label: "NestJS", x: 15, y: 82, color: "#3b82f6" },
  { id: "postgres", label: "Postgres", x: 85, y: 82, color: "#ec4899" },
];

export function ConnectionGraph() {
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* Líneas + partículas */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="line-flow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {NODES.map((node) => (
          <line
            key={`line-${node.id}`}
            x1={node.x}
            y1={node.y}
            x2={CENTER.x}
            y2={CENTER.y}
            stroke="url(#line-flow)"
            strokeWidth="0.4"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Partículas que fluyen del nodo hacia el hub */}
        {!reduced &&
          NODES.map((node, i) => (
            <motion.circle
              key={`particle-${node.id}`}
              r="1.1"
              fill={node.color}
              initial={{ cx: node.x, cy: node.y, opacity: 0 }}
              animate={{
                cx: [node.x, CENTER.x],
                cy: [node.y, CENTER.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.4,
                ease: "linear",
                repeat: Infinity,
                delay: i * 0.6,
              }}
            />
          ))}
      </svg>

      {/* Nodos de tecnología */}
      {NODES.map((node) => (
        <div
          key={node.id}
          className="absolute flex items-center gap-1.5 rounded-full border px-2.5 py-1"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: "translate(-50%, -50%)",
            background: "var(--color-panel)",
            borderColor: "var(--border-strong)",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: node.color }}
          />
          <span
            className="text-xs"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-text)",
            }}
          >
            {node.label}
          </span>
        </div>
      ))}

      {/* Hub central */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: "22%", aspectRatio: "1" }}
      >
        {!reduced && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ background: "var(--gradient-flow)" }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
          />
        )}
        <div
          className="relative grid h-full w-full place-items-center rounded-2xl text-sm font-bold"
          style={{
            fontFamily: "var(--font-display)",
            background: "var(--gradient-flow)",
            color: "#0a0c16",
            boxShadow: "0 0 40px rgba(139,92,246,0.45)",
          }}
        >
          HC
        </div>
      </div>
    </div>
  );
}
