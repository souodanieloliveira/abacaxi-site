import Link from "next/link";
import type React from "react";
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const socials: { icon: React.ComponentType; href: string; label: string }[] = [
  { icon: InstagramIcon, href: "https://www.instagram.com/abacaxi.cc/", label: "Instagram" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/company/abacaxi-cc/", label: "LinkedIn" },
  { icon: FacebookIcon, href: "https://www.facebook.com/abacaxi.cc", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-dark)", color: "#ffffff" }}>
      <div
        className="container"
        style={{
          paddingTop: 48,
          paddingBottom: 48,
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        {/* linha superior: logo + redes sociais */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "block", overflow: "hidden", height: 48 }}>
            <img
              src="/logo-abacaxi.svg"
              alt="Abacaxi – Roteiro Financeiro"
              style={{ height: 400, width: "auto", display: "block", marginLeft: -120 }}
            />
          </Link>

          <div style={{ display: "flex", gap: 16 }}>
            {socials.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "#ffffff",
                  transition: "border-color 0.2s",
                }}
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>

        {/* separador */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.12)" }} />

        {/* linha inferior: CNPJ + copyright */}
        <div className="footer-bottom">
          <span>CNPJ 12.329.221/0001-97</span>
          <span>© 2026 Abacaxi Serviços Financeiros Ltda. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
