"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Send, Check, Loader2, ArrowUpRight } from "lucide-react";
import { useT } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type Status = "idle" | "loading" | "success" | "error";
type Fields = { name: string; email: string; message: string };

export function Contact() {
  const t = useT();
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = (): boolean => {
    const next: Partial<Fields> = {};
    if (!fields.name.trim()) next.name = t.contact.requiredError;
    if (!fields.email.trim()) next.email = t.contact.requiredError;
    else if (!EMAIL_RE.test(fields.email.trim()))
      next.email = t.contact.emailError;
    if (!fields.message.trim()) next.message = t.contact.requiredError;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      setFields({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const update = (key: keyof Fields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  return (
    <section id="contact" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow={t.contact.eyebrow} className="mb-12">
          {t.contact.lead}
        </SectionHeading>

        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
          {/* Formulario */}
          <Reveal>
            {status === "success" ? (
              <div className="border-gradient flex h-full flex-col items-start justify-center gap-3 p-8">
                <span
                  className="grid h-11 w-11 place-items-center rounded-full text-ink"
                  style={{ background: "var(--gradient-flow)" }}
                >
                  <Check size={22} />
                </span>
                <h3
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {t.contact.successTitle}
                </h3>
                <p className="text-sm text-muted">
                  {t.contact.successBody}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4"
              >
                <Field
                  id="name"
                  label={t.contact.nameLabel}
                  placeholder={t.contact.namePlaceholder}
                  value={fields.name}
                  onChange={(v) => update("name", v)}
                  error={errors.name}
                />
                <Field
                  id="email"
                  type="email"
                  label={t.contact.emailLabel}
                  placeholder={t.contact.emailPlaceholder}
                  value={fields.email}
                  onChange={(v) => update("email", v)}
                  error={errors.email}
                />
                <Field
                  id="message"
                  label={t.contact.messageLabel}
                  placeholder={t.contact.messagePlaceholder}
                  value={fields.message}
                  onChange={(v) => update("message", v)}
                  error={errors.message}
                  textarea
                />

                {status === "error" && (
                  <p
                    className="text-sm"
                    style={{ color: "#f87171" }}
                    role="alert"
                  >
                    {t.contact.errorBody}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.02] disabled:opacity-70"
                  style={{ background: "var(--gradient-flow)" }}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {t.contact.submit}
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>

          {/* Canales directos */}
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3">
              <p
                className="text-xs uppercase tracking-widest text-muted"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t.contact.channelsTitle}
              </p>

              <ChannelLink
                href={`mailto:${SITE.email}`}
                icon={<Mail size={18} />}
                label="Email"
                value={SITE.email}
              />
              <ChannelLink
                href={SITE.linkedin}
                icon={<LinkedInIcon />}
                label="LinkedIn"
                value="linkedin.com"
                external
              />
              <ChannelLink
                href={SITE.github}
                icon={<GitHubIcon />}
                label="GitHub"
                value="github.com"
                external
              />

              <div
                className="mt-1 flex items-center gap-3 rounded-xl border p-3.5"
                style={{
                  background: "var(--color-panel)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <span className="text-cyan">
                  <MapPin size={18} />
                </span>
                <div>
                  <p
                    className="text-[10px] uppercase tracking-wider text-muted"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {t.contact.locationLabel}
                  </p>
                  <p className="text-sm">{t.contact.locationValue}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
  textarea = false,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
}) {
  const shared = {
    id,
    value,
    placeholder,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    className:
      "w-full rounded-lg border bg-[var(--color-ink)] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-violet)]",
    style: { borderColor: error ? "#f87171" : "var(--border-strong)" },
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-medium text-muted"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          {...shared}
          rows={4}
          className={`${shared.className} resize-none`}
        />
      ) : (
        <input {...shared} type={type} />
      )}
      {error && (
        <span
          id={`${id}-error`}
          className="text-xs"
          style={{ color: "#f87171" }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

function ChannelLink({
  href,
  icon,
  label,
  value,
  external = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-3 rounded-xl border p-3.5 transition-colors hover:bg-panel"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <span className="text-cyan">{icon}</span>
      <div className="flex-1">
        <p
          className="text-[10px] uppercase tracking-wider text-muted"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {label}
        </p>
        <p className="text-sm">{value}</p>
      </div>
      <ArrowUpRight
        size={16}
        className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
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
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.34.85 0 1.7.12 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
    </svg>
  );
}
