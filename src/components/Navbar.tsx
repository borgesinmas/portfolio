"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Proyectos", href: "/#work" },
  { label: "Servicios", href: "/#services" },
  { label: "Proceso", href: "/#process" },
  { label: "Tecnologias", href: "/#stack" },
];

interface NavbarProps {
  variant?: "dark" | "light";
}

export function Navbar({ variant = "dark" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const isLight = variant === "light";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
      style={{
        background: isLight
          ? scrolled
            ? "rgba(250, 252, 250, 0.94)"
            : "rgba(250, 252, 250, 0.82)"
          : scrolled
            ? "rgba(22, 27, 34, 0.92)"
            : "rgba(22, 27, 34, 0.7)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? isLight
            ? "1px solid rgba(16, 42, 30, 0.12)"
            : "1px solid #30363d"
          : "1px solid transparent",
        boxShadow: isLight && scrolled ? "0 14px 40px rgba(20, 35, 28, 0.08)" : "none",
      }}
    >
      <nav className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="/"
          className={`font-semibold text-lg tracking-tight transition-colors ${
            isLight ? "text-[#102018] hover:text-[#0B7D54]" : "text-text-primary hover:text-accent-light"
          }`}
        >
          Luis Martinez
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                isLight ? "text-[#4A6157] hover:text-[#102018]" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a href="/#contact" className="btn btn-primary text-sm !py-2 !px-4">
          Hablemos
        </a>
      </nav>
    </header>
  );
}
