import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sunset, Briefcase, Scissors, Heart } from "lucide-react";
import { siteContent } from "../content/site";
import EmailCapture from "../components/EmailCapture";

export const metadata: Metadata = {
  title: { absolute: "Abacaxi – Roteiro Financeiro para Momentos Decisivos" },
  description:
    "Ajudamos pessoas, empresas e instituições a organizar suas finanças, planejar o futuro e tomar decisões com mais clareza.",
};

const momentoIcons: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Sunset,
  Briefcase,
  Scissors,
  Heart,
};

export default function Home() {
  const { home } = siteContent;

  return (
    <>
      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "85vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Image
          src={home.hero.image}
          alt="Duas mulheres conversando sentadas em situação descontraída, alegres e sorrindo"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{ width: "100%", paddingBottom: "6vh" }}>
          <div className="container">
          <div className="hero-card">
            <h1 className="hero-title">
              {home.hero.title}
            </h1>

            <p style={{ fontSize: "1rem", marginBottom: 10 }}>
              {home.hero.paragraph1}
            </p>

            <p style={{ marginBottom: 20 }}>
              {home.hero.paragraph2}
            </p>

            <Link href="/contato" className="btn-primary" title="Fale com a Abacaxi">
              {home.hero.cta}
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS — faixa escura full-width */}
      <div style={{ background: "var(--color-dark)", color: "#ffffff" }}>
        <div className="container" style={{ paddingTop: 72, paddingBottom: 72 }}>

          {/* tagline centralizado com linhas */}
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 56 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.25)" }} />
            <h2 style={{ margin: 0, fontStyle: "italic", fontSize: "1.125rem", fontWeight: 400, whiteSpace: "nowrap" }}>
              Como a Abacaxi pode ajudar
            </h2>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.25)" }} />
          </div>

          <div className="services-grid">
            {home.services.map((service) => (
              <div
                key={service.title}
                className="service-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                {/* faixa do título */}
                <div
                  style={{
                    background: "var(--color-secondary)",
                    padding: "14px 24px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "#ffffff",
                      margin: 0,
                    }}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* corpo do card */}
                <div style={{ padding: "24px 24px 28px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                {service.subtitle && (
                  <p style={{ fontWeight: 500, opacity: 0.7, marginBottom: 8 }}>
                    {service.subtitle}
                  </p>
                )}

                <p style={{ opacity: 0.75, flexGrow: 1, marginBottom: 24 }}>
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  title={
                    service.href === "/pessoas" ? "Serviços para pessoas físicas" :
                    service.href === "/empresas" ? "Serviços para empresas" :
                    "Educação financeira"
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  Saiba mais
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      border: "2px solid #ffffff",
                      fontSize: "0.9rem",
                    }}
                  >
                    →
                  </span>
                </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STATEMENT */}
      <div style={{ background: "linear-gradient(to bottom, var(--color-background-soft), #ffffff)" }}>
        <div
          className="container flex-responsive"
          style={{
            paddingTop: 56,
            paddingBottom: 56,
          }}
        >
          <h2 className="statement-heading">
            {home.statement.tagline}
          </h2>

          <div className="statement-divider" />

          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--color-text-main)",
              opacity: 0.8,
              margin: 0,
            }}
          >
            {home.statement.description}
          </p>
        </div>
      </div>

      {/* JORNADA COROA */}
      <div style={{ background: "#ffffff" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ marginBottom: 56, textAlign: "center" }}>
            <p style={{ fontStyle: "italic", color: "var(--color-text-accent)", marginBottom: 4 }}>
              {home.coroa.subtitle}
            </p>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text-main)", margin: 0 }}>
              {home.coroa.title}
            </h2>
          </div>

          {/* timeline */}
          <div style={{ maxWidth: 680, margin: "0 auto", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 19,
                top: 20,
                bottom: 20,
                width: 2,
                background: "var(--color-border-light)",
              }}
            />

            {home.coroa.items.map((item, index) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  gap: 28,
                  marginBottom: index < home.coroa.items.length - 1 ? 24 : 0,
                  position: "relative",
                  background: index % 2 !== 0 ? "rgba(61, 26, 110, 0.06)" : "rgba(229, 215, 209, 0.45)",
                  borderRadius: 10,
                  padding: "20px 16px 20px 16px",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "var(--color-dark)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    flexShrink: 0,
                  }}
                >
                  {item.number}
                </div>

                <div style={{ paddingTop: 6 }}>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "var(--color-text-accent)",
                      marginBottom: 6,
                    }}
                  >
                    {item.name}
                  </h3>
                  <p style={{ color: "var(--color-text-main)", opacity: 0.8, margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex-cta"
            style={{
              marginTop: 56,
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: 620,
              background: "var(--color-dark)",
              borderRadius: 12,
              padding: "24px 32px",
              gap: 32,
            }}
          >
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#ffffff",
                margin: 0,
              }}
            >
              {home.coroa.cta}
            </p>
            <Link
              href="/contato"
              title="Fale com a Abacaxi"
              style={{
                flexShrink: 0,
                background: "var(--color-button)",
                color: "#ffffff",
                padding: "10px 20px",
                borderRadius: 6,
                fontWeight: 500,
                display: "inline-block",
              }}
            >
              Vamos Conversar
            </Link>
          </div>
        </div>
      </div>

      {/* MOMENTOS */}
      <div style={{ background: "linear-gradient(to bottom, #ffffff, var(--color-background-soft))" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "var(--color-text-accent)",
              marginBottom: 48,
              textAlign: "center",
            }}
          >
            {home.momentos.statement}
          </h2>

          <div className="momentos-grid">
            {home.momentos.items.map((item) => {
              const Icon = momentoIcons[item.icon];
              return (
                <div
                  key={item.title}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      background: "var(--color-dark)",
                      borderRadius: 10,
                      padding: 12,
                      display: "inline-flex",
                    }}
                  >
                    <Icon size={24} color="#ffffff" />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "var(--color-text-main)",
                      margin: 0,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ margin: 0, opacity: 0.75, fontSize: "0.95rem" }}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* EDUCAÇÃO */}
      <div style={{ background: "var(--color-dark)", color: "#ffffff" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="education-layout">
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  marginBottom: 12,
                }}
              >
                {home.educationPreview.statement}
              </h2>
              <p style={{ opacity: 0.7, marginBottom: 32, fontSize: "1.125rem" }}>
                {home.educationPreview.sub}
              </p>
              <EmailCapture
                placeholder={home.educationPreview.formPlaceholder}
                cta={home.educationPreview.formCta}
                disclaimer={home.educationPreview.formDisclaimer}
              />
            </div>
            <div className="education-visual">
              <div
                style={{
                  borderLeft: "3px solid var(--color-secondary)",
                  paddingLeft: 24,
                }}
              >
                <p
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    lineHeight: 1.6,
                    marginBottom: 16,
                    opacity: 0.9,
                  }}
                >
                  "A educação financeira muda a forma como você enxerga cada decisão — não só as financeiras."
                </p>
                <p style={{ margin: 0, opacity: 0.5, fontSize: "0.875rem" }}>
                  Equipe Abacaxi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CREDIBILIDADE */}
      <div style={{ background: "#ffffff" }}>
        <div
          className="container flex-responsive"
          style={{
            paddingTop: 56,
            paddingBottom: 56,
            gap: 48,
          }}
        >
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: "1.25rem",
                lineHeight: 1.6,
                color: "var(--color-text-main)",
                marginBottom: 32,
              }}
            >
              {home.credibilidade.statement}
            </p>
            <Link
              href={home.credibilidade.ctaHref}
              title="Sobre a Abacaxi"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontWeight: 700,
                color: "var(--color-text-accent)",
              }}
            >
              {home.credibilidade.cta}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: "2px solid var(--color-text-accent)",
                  fontSize: "0.9rem",
                }}
              >
                →
              </span>
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 32, flexShrink: 0 }}>
            {home.credibilidade.numeros.map((n) => (
              <div key={n.label}>
                <p
                  style={{
                    fontSize: "2.75rem",
                    fontWeight: 700,
                    color: "var(--color-text-accent)",
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  {n.valor}
                </p>
                <p style={{ margin: "4px 0 0", opacity: 0.7, fontSize: "0.95rem" }}>
                  {n.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div style={{ background: "var(--color-dark)" }}>
        <div
          className="container flex-cta section-xl-pad"
          style={{
            gap: 64,
          }}
        >
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.3,
                marginBottom: 12,
              }}
            >
              {home.ctaFinal.headline}
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "rgba(255,255,255,0.85)",
                margin: 0,
              }}
            >
              {home.ctaFinal.sub}
            </p>
          </div>

          <div style={{ flexShrink: 0 }}>
            <Link
              href={home.ctaFinal.ctaHref}
              title="Fale com a Abacaxi"
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
              {home.ctaFinal.cta}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}