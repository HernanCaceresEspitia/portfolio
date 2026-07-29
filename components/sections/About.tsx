"use client";

import { useT } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const t = useT();

  return (
    <section id="about" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow={t.about.eyebrow} className="mb-14">
          {t.about.lead}
        </SectionHeading>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Narrativa + repos */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <p className="leading-relaxed text-muted">
                {t.about.p1}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="leading-relaxed text-muted">
                {t.about.p2}
              </p>
            </Reveal>

            {/* Encuadre de repos privados como fortaleza */}
            <Reveal delay={0.1}>
              <div className="border-gradient p-5">
                <div className="flex items-center gap-2">
                  <ShieldIcon />
                  <h3
                    className="text-sm font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t.about.reposTitle}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t.about.reposBody}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Línea de tiempo */}
          <Reveal delay={0.1}>
            <div>
              <p
                className="mb-6 text-xs uppercase tracking-widest text-muted"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t.about.timelineTitle}
              </p>
              <ol
                className="relative ml-1 border-l"
                style={{ borderColor: "var(--border-strong)" }}
              >
                {t.about.timeline.map((item, i) => (
                  <li key={i} className="relative pb-8 pl-6 last:pb-0">
                    <span
                      className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full"
                      style={{
                        background: "var(--gradient-flow)",
                        boxShadow: "0 0 0 4px var(--color-ink)",
                      }}
                    />
                    <h4
                      className="text-sm font-semibold"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="mt-0.5 text-xs text-cyan"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {item.org}
                      {item.period ? ` · ${item.period}` : ""}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#shield-grad)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="shield-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
