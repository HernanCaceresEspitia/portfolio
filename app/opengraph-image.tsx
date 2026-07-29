import { ImageResponse } from "next/og";

export const alt = "Hernán Cáceres — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0c16",
        padding: "80px",
      }}
    >
      {/* Brillo de fondo */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: -100,
          width: 700,
          height: 700,
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.45), transparent 60%)",
          display: "flex",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: "linear-gradient(120deg, #8b5cf6, #3b82f6, #22d3ee)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 34,
            fontWeight: 700,
            color: "#0a0c16",
          }}
        >
          HC
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#9aa0b8" }}>
          Full-Stack Developer
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            color: "#eceef7",
            lineHeight: 1.1,
          }}
        >
          Construyo y conecto sistemas
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          <span style={{ color: "#eceef7" }}>de&nbsp;</span>
          <span
            style={{
              background: "linear-gradient(120deg, #8b5cf6, #22d3ee)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            e-commerce
          </span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, fontSize: 26, color: "#9aa0b8" }}>
        Shopify · Next.js · NestJS · Bogotá, Colombia
      </div>
    </div>,
    { ...size },
  );
}
