"use client";

import { ExternalLink, Lock } from "lucide-react";
import { useT } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type ProjectItem = ReturnType<typeof useT>["projects"]["items"][number];

export function Projects() {
  const t = useT();

  return (
    <section id="projects" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow={t.projects.eyebrow} className="mb-12">
          {t.projects.lead}
        </SectionHeading>

        <div className="flex flex-col gap-6">
          {t.projects.items.map((item, i) => (
            <Reveal key={item.key} delay={i * 0.08}>
              <ProjectCard item={item} t={t.projects} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  item,
  t,
}: {
  item: ProjectItem;
  t: ReturnType<typeof useT>["projects"];
}) {
  const featured = item.featured;
  const isDemo = item.type === "demo";
  const hasLinks = item.liveUrl !== "" || item.codeUrl !== "";

  return (
    <article
      className={`rounded-2xl p-6 md:p-8 ${featured ? "border-gradient" : "border"}`}
      style={
        featured
          ? undefined
          : {
              background: "var(--color-panel)",
              borderColor: "var(--border-subtle)",
            }
      }
    >
      <div className="grid gap-6 md:grid-cols-[1fr_15rem]">
        {/* Contenido principal */}
        <div>
          <div className="flex items-center gap-3">
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-mono)",
                background: isDemo
                  ? "var(--gradient-flow)"
                  : "var(--color-ink)",
                color: isDemo ? "#0a0c16" : "var(--color-cyan)",
                border: isDemo ? "none" : "1px solid var(--border-subtle)",
              }}
            >
              {isDemo ? t.typeDemo : t.typeCaseStudy}
            </span>
            <span
              className="text-xs text-muted"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {item.context}
            </span>
          </div>

          <h3
            className="mt-3 text-xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {item.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            {item.description}
          </p>

          <ul className="mt-4 flex flex-col gap-2">
            {item.highlights.map((h, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-sm text-muted"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--gradient-flow)" }}
                />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Barra lateral: rol, impacto, stack, links */}
        <aside className="flex flex-col gap-4 md:border-l md:pl-6">
          <div>
            <p
              className="text-sm font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {item.role}
            </p>
            {item.meta && (
              <p
                className="mt-0.5 text-xs text-muted"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {item.meta}
              </p>
            )}
          </div>

          {item.impact && (
            <div>
              <p
                className="text-[10px] uppercase tracking-wider text-muted"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t.impactLabel}
              </p>
              <p
                className="text-gradient-accent mt-1 text-lg font-bold"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {item.impact}
              </p>
            </div>
          )}

          <ul className="flex flex-wrap gap-1.5">
            {item.stack.map((s) => (
              <li
                key={s}
                className="rounded-md px-2 py-0.5 text-[11px]"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "var(--color-ink)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--color-muted)",
                }}
              >
                {s}
              </li>
            ))}
          </ul>

          {/* Footer: enlaces (sitio/código) y/o nota de repo privado */}
          <div className="flex flex-col gap-2.5">
            {hasLinks && (
              <div className="flex flex-wrap gap-2">
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-ink"
                    style={{ background: "var(--gradient-flow)" }}
                  >
                    <ExternalLink size={13} />
                    {t.liveLabel}
                  </a>
                )}
                {item.codeUrl && (
                  <a
                    href={item.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
                    style={{
                      borderColor: "var(--border-strong)",
                      color: "var(--color-text)",
                    }}
                  >
                    <GitHubIcon />
                    {t.codeLabel}
                  </a>
                )}
              </div>
            )}
            {item.type === "case-study" && item.codeUrl === "" && (
              <p
                className="inline-flex items-center gap-1.5 text-xs text-muted"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <Lock size={12} />
                {t.privateNote}
              </p>
            )}
          </div>
        </aside>
      </div>
    </article>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.34.85 0 1.7.12 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
    </svg>
  );
}
