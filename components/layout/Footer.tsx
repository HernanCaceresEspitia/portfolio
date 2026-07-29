"use client";

import { Mail, ArrowUp } from "lucide-react";
import { useT } from "@/components/providers/LanguageProvider";
import { SITE } from "@/lib/site";

export function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative border-t px-6 py-12"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Marca + tagline */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span
                className="grid h-9 w-9 place-items-center rounded-lg text-sm font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  background: "var(--gradient-flow)",
                  color: "#0a0c16",
                }}
              >
                HC
              </span>
              <span
                className="text-sm font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {SITE.name}
              </span>
            </div>
            <p className="max-w-xs text-sm text-muted">
              {t.footer.tagline}
            </p>
          </div>

          {/* Enlaces + volver arriba */}
          <div className="flex flex-col items-start gap-4 sm:items-end">
            <div className="flex items-center gap-2">
              <IconLink href={`mailto:${SITE.email}`} label="Email">
                <Mail size={18} />
              </IconLink>
              <IconLink href={SITE.linkedin} label="LinkedIn" external>
                <LinkedInIcon />
              </IconLink>
              <IconLink href={SITE.github} label="GitHub" external>
                <GitHubIcon />
              </IconLink>
            </div>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-text"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <ArrowUp size={13} />
              {t.footer.backToTop}
            </a>
          </div>
        </div>

        {/* Barra inferior */}
        <div
          className="mt-10 flex flex-col gap-2 border-t pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderColor: "var(--border-subtle)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <span>
            © {year} {SITE.name}. {t.footer.rights}
          </span>
          <span>{t.footer.builtWith}</span>
        </div>
      </div>
    </footer>
  );
}

function IconLink({
  href,
  label,
  external = false,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="grid h-9 w-9 place-items-center rounded-lg border text-muted transition-colors hover:text-text"
      style={{ borderColor: "var(--border-strong)" }}
    >
      {children}
    </a>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.34.85 0 1.7.12 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
    </svg>
  );
}
