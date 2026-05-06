"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/pessoas", label: "Pessoas", title: "Serviços para pessoas físicas" },
  { href: "/empresas", label: "Empresas", title: "Serviços para empresas" },
  { href: "/educacao", label: "Educação", title: "Educação financeira" },
  { href: "/sobre", label: "Sobre", title: "Sobre a Abacaxi" },
  { href: "/blog", label: "Blog", title: "Blog da Abacaxi" },
];

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 40);
      setMenuOpen(false);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,

        backgroundColor: "#ffffff",
        borderBottom: "1px solid var(--color-border-light)",

        transform: visible ? "translateY(0)" : "translateY(-100%)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.25s ease, opacity 0.2s ease",

        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <nav
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 80,
          overflow: "hidden",
        }}
      >
        <Link href="/" title="Abacaxi – Página inicial" style={{ display: "block" }}>
          <img
            src="/logo-abacaxi.svg"
            alt="Abacaxi – Roteiro Financeiro"
            style={{
              height: 400,
              width: "auto",
              display: "block",
              marginLeft: -120,
            }}
          />
        </Link>

        <div className="nav-links">
          {navLinks.map(({ href, label, title }) => (
            <Link key={href} href={href} title={title}>
              {label}
            </Link>
          ))}
          <Link href="/contato" className="btn-primary" title="Fale com a Abacaxi">
            Fale com a Abacaxi
          </Link>
        </div>

        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div
          style={{
            background: "#ffffff",
            borderTop: "1px solid var(--color-border-light)",
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {navLinks.map(({ href, label, title }) => (
            <Link
              key={href}
              href={href}
              title={title}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "14px 0",
                fontSize: "1.125rem",
                fontWeight: 500,
                color: "var(--color-dark)",
                borderBottom: "1px solid var(--color-border-light)",
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contato"
            title="Fale com a Abacaxi"
            onClick={() => setMenuOpen(false)}
            className="btn-primary"
            style={{ marginTop: 20, textAlign: "center" }}
          >
            Fale com a Abacaxi
          </Link>
        </div>
      )}
    </header>
  );
}
