import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteContent } from "../../content/site";

export const metadata: Metadata = {
  title: "Para Você",
  description:
    "Planejamento financeiro pessoal para organizar o dia a dia, planejar o futuro ou enfrentar uma transição de vida com mais clareza.",
  alternates: { canonical: "https://abacaxi.cc/pessoas" },
  openGraph: {
    url: "https://abacaxi.cc/pessoas",
    images: [{ url: "https://abacaxi.cc/hero-abacaxi.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: "https://abacaxi.cc/hero-abacaxi.png", width: 1200, height: 630 }],
  },
};

export default function PessoasPage() {
  const { pessoas } = siteContent;

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
          src={pessoas.hero.image}
          alt="Consultor e cliente em conversa sobre finanças pessoais"
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
                  marginBottom: 20,
                  marginTop: 0,
                }}
              >
                {pessoas.hero.title}
              </h1>
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "rgba(255,255,255,0.85)",
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                {pessoas.hero.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      {pessoas.services.map((service, i) => {
        const imageLeft = i % 2 === 0;
        const isFirst = i === 0;

        return (
          <div
            key={service.title}
            style={{
              background: i % 2 === 0 ? "#ffffff" : "var(--color-background-soft)",
              borderTop: isFirst ? "3px solid var(--color-secondary)" : undefined,
            }}
          >
            <div className="container" style={{ paddingTop: 72, paddingBottom: 56 }}>

              {/* Linha do card: imagem + conteúdo */}
              <div className={imageLeft ? "flex-responsive-reverse" : "flex-responsive"}>

                {/* Texto */}
                <div style={{ flex: 1 }}>
                  {service.badge && (
                    <span
                      style={{
                        display: "inline-block",
                        background: "var(--color-secondary)",
                        color: "#ffffff",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        padding: "4px 12px",
                        borderRadius: 20,
                        marginBottom: 16,
                      }}
                    >
                      {service.badge}
                    </span>
                  )}
                  <p
                    style={{
                      fontStyle: "italic",
                      color: "var(--color-text-accent)",
                      marginBottom: 8,
                      marginTop: 0,
                    }}
                  >
                    {service.tag}
                  </p>
                  <h2
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--color-text-main)",
                      marginBottom: 16,
                      marginTop: 0,
                    }}
                  >
                    {service.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "1.125rem",
                      opacity: 0.8,
                      marginBottom: 32,
                      marginTop: 0,
                      lineHeight: 1.7,
                    }}
                  >
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      fontWeight: 700,
                      color: "var(--color-text-accent)",
                    }}
                  >
                    {service.cta}
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
                        flexShrink: 0,
                      }}
                    >
                      →
                    </span>
                  </Link>
                </div>

                {/* Imagem — foto de conexão humana e conversa */}
                <div className="service-image">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <span>Foto em breve</span>
                  )}
                </div>
              </div>

              {/* Depoimento placeholder */}
              <div
                style={{
                  marginTop: 32,
                  borderLeft: "4px solid var(--color-secondary)",
                  paddingLeft: 16,
                }}
              >
                {service.testimonial ? (
                  <>
                    <p style={{ fontStyle: "italic", margin: 0, fontSize: "1.0625rem" }}>
                      "{service.testimonial}"
                    </p>
                    <p style={{ margin: "8px 0 0", fontSize: "0.875rem", opacity: 0.6 }}>
                      — Cliente Abacaxi
                    </p>
                  </>
                ) : (
                  <p style={{ margin: 0, opacity: 0.4, fontSize: "0.875rem", fontStyle: "italic" }}>
                    Depoimento em breve.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}

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
              {pessoas.ctaFinal.headline}
            </h2>
          </div>
          <div style={{ flexShrink: 0 }}>
            <Link
              href={pessoas.ctaFinal.ctaHref}
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
              {pessoas.ctaFinal.cta}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
