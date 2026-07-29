"use client";

import {
  Code2,
  Server,
  ShoppingBag,
  Blocks,
  Cog,
  type LucideIcon,
} from "lucide-react";
import { useT } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Metadatos visuales por grupo (icono, color de acento, si es destacado). */
const GROUP_META: Record<
  string,
  { icon: LucideIcon; color: string; featured?: boolean }
> = {
  frontend: { icon: Code2, color: "#22d3ee" },
  backend: { icon: Server, color: "#3b82f6" },
  ecommerce: { icon: ShoppingBag, color: "#8b5cf6", featured: true },
  lowcode: { icon: Blocks, color: "#ec4899" },
  devops: { icon: Cog, color: "#22d3ee" },
};

export function Skills() {
  const t = useT();

  return (
    <section id="skills" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow={t.skills.eyebrow} className="mb-4">
          {t.skills.lead}
        </SectionHeading>

        <Reveal delay={0.1}>
          <p
            className="mb-12 text-sm"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-muted)",
            }}
          >
            {t.skills.nicheLine.split(":")[0]}:{" "}
            <span className="text-gradient-accent font-semibold">
              Shopify + Weweb + Xano
            </span>
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.skills.groups.map((group, i) => {
            const meta = GROUP_META[group.key];
            const Icon = meta.icon;

            return (
              <Reveal key={group.key} delay={i * 0.06} className="h-full">
                <div
                  className={`h-full rounded-2xl p-5 ${
                    meta.featured ? "border-gradient" : "border"
                  }`}
                  style={
                    meta.featured
                      ? undefined
                      : {
                          background: "var(--color-panel)",
                          borderColor: "var(--border-subtle)",
                        }
                  }
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl"
                      style={{
                        background: `${meta.color}1f`,
                        color: meta.color,
                      }}
                    >
                      <Icon size={20} />
                    </span>
                    {meta.featured && (
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink"
                        style={{
                          fontFamily: "var(--font-mono)",
                          background: "var(--gradient-flow)",
                        }}
                      >
                        {t.skills.nicheBadge}
                      </span>
                    )}
                  </div>

                  <h3
                    className="mt-4 text-base font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {group.title}
                  </h3>

                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md px-2.5 py-1 text-xs"
                        style={{
                          fontFamily: "var(--font-mono)",
                          background: "var(--color-ink)",
                          border: "1px solid var(--border-subtle)",
                          color: "var(--color-muted)",
                        }}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
