"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useT } from "@/components/providers/LanguageProvider";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { fadeInDown } from "@/lib/motion";

const LINKS = [
  { key: "about", href: "#about" },
  { key: "skills", href: "#skills" },
  { key: "projects", href: "#projects" },
  { key: "contact", href: "#contact" },
] as const;

export function Navbar() {
  const t = useT();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Navegación por código: cierra el menú y desplaza a la sección.
  // Evita que el salto nativo del ancla se cancele en móvil al cerrar el menú.
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
      history.replaceState(null, "", href);
    }
  };

  // Fondo desenfocado al hacer scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      variants={reduced ? undefined : fadeInDown}
      initial={reduced ? undefined : "hidden"}
      animate={reduced ? undefined : "visible"}
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(10,12,22,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--border-subtle)"
          : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Marca / monograma */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, "#top")}
          className="flex items-center gap-3"
        >
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
            className="hidden text-sm font-semibold sm:block"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Hernán Cáceres
          </span>
        </a>

        {/* Links desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group relative text-sm text-muted transition-colors hover:text-text"
              >
                {t.nav[link.key]}
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                  style={{ background: "var(--gradient-flow)" }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Acciones derecha */}
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] sm:block"
            style={{ background: "var(--gradient-flow)" }}
          >
            {t.nav.cta}
          </a>

          {/* Botón menú móvil */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
            className="grid h-9 w-9 place-items-center rounded-lg border md:hidden"
            style={{ borderColor: "var(--border-strong)" }}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </nav>

      {/* Menú móvil desplegable */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: reduced ? 0 : 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden border-t md:hidden"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "rgba(10,12,22,0.92)",
              backdropFilter: "blur(12px)",
            }}
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block rounded-lg px-3 py-3 text-base text-muted transition-colors hover:bg-panel hover:text-text"
                  >
                    {t.nav[link.key]}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="block rounded-full px-4 py-3 text-center text-base font-semibold text-ink"
                  style={{ background: "var(--gradient-flow)" }}
                >
                  {t.nav.cta}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/** Icono hamburguesa que se transforma en X. */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="relative h-4 w-5">
      <span
        className="absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300"
        style={{
          top: open ? "50%" : "2px",
          transform: open ? "rotate(45deg)" : "none",
        }}
      />
      <span
        className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-current transition-opacity duration-300"
        style={{ opacity: open ? 0 : 1 }}
      />
      <span
        className="absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300"
        style={{
          bottom: open ? "50%" : "2px",
          transform: open ? "rotate(-45deg)" : "none",
        }}
      />
    </div>
  );
}
