import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteContent } from "../../content/site";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "A Abacaxi nasceu da crença de que todo mundo merece um plano financeiro feito para a sua vida. Conheça nossa história, metodologia e valores.",
  alternates: { canonical: "https://abacaxi.cc/sobre" },
  openGraph: {
    url: "https://abacaxi.cc/sobre",
    images: [{ url: "https://abacaxi.cc/hero-abacaxi.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: "https://abacaxi.cc/hero-abacaxi.png", width: 1200, height: 630 }],
  },
};

export default function SobrePage() {
  const { sobre } = siteContent;

  return (
    <>
      {/* HERO — imagem com overlay escuro */}
      <section
        style={{
          position: "relative",
          minHeight: "60vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Image
          src={sobre.hero.image}
          alt="Equipe Abacaxi em ambiente de trabalho"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--color-dark)",
            opacity: 0.6,
          }}
        />
        <div style={{ position: "relative", width: "100%", paddingBottom: "6vh" }}>
          <div className="container">
            <div style={{ maxWidth: 720 }}>
              <h1
                style={{
                  fontSize: "2.25rem",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                {sobre.hero.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ORIGEM — Por que a Abacaxi existe */}
      <div style={{ background: "#ffffff" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ maxWidth: 720 }}>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "var(--color-text-accent)",
                marginBottom: 32,
                marginTop: 0,
              }}
            >
              {sobre.origem.title}
            </h2>
            {sobre.origem.paragraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.8,
                  opacity: 0.85,
                  marginBottom: 20,
                  marginTop: 0,
                }}
              >
                {p}
              </p>
            ))}
            <p
              style={{
                fontSize: "1.0625rem",
                fontStyle: "italic",
                color: "var(--color-text-accent)",
                marginBottom: 0,
                marginTop: 0,
              }}
            >
              {sobre.origem.closing}
            </p>
          </div>
        </div>
      </div>

      {/* PILARES — Como trabalhamos */}
      <div style={{ background: "var(--color-dark)", color: "#ffffff" }}>
        <div className="container" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: 48,
              marginTop: 0,
              textAlign: "center",
            }}
          >
            Como trabalhamos
          </h2>
          <div className="services-grid">
            {sobre.pilares.map((pilar) => (
              <div
                key={pilar.title}
                style={{
                  borderTop: "2px solid var(--color-secondary)",
                  paddingTop: 24,
                }}
              >
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    marginBottom: 12,
                    marginTop: 0,
                  }}
                >
                  {pilar.title}
                </h3>
                <p style={{ opacity: 0.75, margin: 0, lineHeight: 1.7 }}>
                  {pilar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MISSÃO / VISÃO / VALORES */}
      <div style={{ background: "var(--color-background-soft)" }}>
        <div className="container" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <div className="services-grid">
            {sobre.mvv.map((bloco, i) => (
              <div
                key={bloco.title}
                style={{
                  paddingLeft: i > 0 ? 32 : 0,
                  borderLeft: i > 0 ? "1px solid var(--color-border-light)" : undefined,
                }}
              >
                <h3
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--color-text-accent)",
                    marginBottom: 16,
                    marginTop: 0,
                  }}
                >
                  {bloco.title}
                </h3>
                {bloco.text && (
                  <p style={{ fontSize: "1rem", lineHeight: 1.7, margin: 0, opacity: 0.85 }}>
                    {bloco.text}
                  </p>
                )}
                {bloco.items && (
                  <ol
                    style={{
                      margin: 0,
                      padding: "0 0 0 20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {bloco.items.map((item) => (
                      <li
                        key={item}
                        style={{ fontSize: "0.9375rem", lineHeight: 1.6, opacity: 0.85 }}
                      >
                        {item}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DANIEL */}
      <div style={{ background: "#ffffff" }}>
        <div
          className="container flex-responsive-reverse"
          style={{ paddingTop: 56, paddingBottom: 56 }}
        >
          {/* Texto */}
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-text-accent)",
                opacity: 0.5,
                marginBottom: 16,
                marginTop: 0,
              }}
            >
              Fundador
            </p>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--color-text-main)",
                marginBottom: 24,
                marginTop: 0,
              }}
            >
              Daniel Oliveira
            </h2>
            {sobre.daniel.paragraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.8,
                  opacity: 0.85,
                  marginBottom: i < sobre.daniel.paragraphs.length - 1 ? 16 : 0,
                  marginTop: 0,
                }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Foto — placeholder à esquerda */}
          <div className="service-image">
            {sobre.daniel.image ? (
              <img
                src={sobre.daniel.image}
                alt="Daniel Oliveira"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span>Foto em breve</span>
            )}
          </div>
        </div>
      </div>

      {/* NÚMEROS */}
      <div style={{ background: "var(--color-background-soft)" }}>
        <div className="container" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <div className="services-grid">
            {sobre.numeros.map((n) => (
              <div key={n.label} style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "3rem",
                    fontWeight: 700,
                    color: "var(--color-text-accent)",
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  {n.valor}
                </p>
                <p style={{ margin: "8px 0 0", opacity: 0.7, fontSize: "0.95rem" }}>
                  {n.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div style={{ background: "var(--color-dark)" }}>
        <div className="container flex-cta section-xl-pad" style={{ gap: 64 }}>
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              {sobre.ctaFinal.headline}
            </h2>
          </div>
          <div style={{ flexShrink: 0 }}>
            <Link
              href={sobre.ctaFinal.ctaHref}
              style={{
                background: "#ffffff",
                color: "var(--color-dark)",
                padding: "14px 28px",
                borderRadius: 6,
                fontWeight: 700,
                fontSize: "1rem",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              {sobre.ctaFinal.cta}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
