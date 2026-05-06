import type { Metadata } from "next";
import Image from "next/image";
import { siteContent } from "../../content/site";

export const metadata: Metadata = {
  title: "Educação Financeira",
  description:
    "Aulas e cursos estruturados de educação financeira para empresas e órgãos — com foco especial em preparação para aposentadoria.",
  alternates: { canonical: "https://abacaxi.cc/educacao" },
  openGraph: {
    url: "https://abacaxi.cc/educacao",
    images: [{ url: "https://abacaxi.cc/hero-abacaxi.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: "https://abacaxi.cc/hero-abacaxi.png", width: 1200, height: 630 }],
  },
};
import ContactForm from "../../components/ContactForm";
import EmailCapture from "../../components/EmailCapture";

export default function EducacaoPage() {
  const { educacao } = siteContent;

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
          src={educacao.hero.image}
          alt="Palestra de educação financeira corporativa"
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
                {educacao.hero.title}
              </h1>
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "rgba(255,255,255,0.85)",
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                {educacao.hero.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO PRINCIPAL — Para empresas e órgãos */}
      <div style={{ background: "#ffffff" }}>
        <div
          className="container flex-responsive"
          style={{ paddingTop: 56, paddingBottom: 56, gap: 56 }}
        >
          {/* Conteúdo */}
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontStyle: "italic",
                color: "var(--color-text-accent)",
                marginBottom: 8,
                marginTop: 0,
              }}
            >
              {educacao.main.tag}
            </p>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "var(--color-text-main)",
                lineHeight: 1.3,
                marginBottom: 20,
                marginTop: 0,
              }}
            >
              {educacao.main.subtitle}
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                opacity: 0.8,
                lineHeight: 1.7,
                marginBottom: 28,
                marginTop: 0,
              }}
            >
              {educacao.main.description}
            </p>
            <ul
              style={{
                margin: "0 0 0 0",
                padding: "0 0 0 20px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {educacao.main.items.map((item) => (
                <li
                  key={item}
                  style={{ fontSize: "1rem", opacity: 0.85, lineHeight: 1.6 }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Formulário de contato */}
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "var(--color-text-main)",
                marginBottom: 24,
                marginTop: 0,
              }}
            >
              Fale com a gente
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* CURSOS ONLINE — seção discreta */}
      <div style={{ background: "var(--color-dark)", color: "#ffffff" }}>
        <div className="container" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <div style={{ maxWidth: 560 }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                lineHeight: 1.3,
                marginBottom: 12,
                marginTop: 0,
              }}
            >
              {educacao.cursosOnline.title}
            </h2>
            <p style={{ opacity: 0.7, marginBottom: 32, marginTop: 0, fontSize: "1.0625rem" }}>
              {educacao.cursosOnline.description}
            </p>
            <EmailCapture
              placeholder={educacao.cursosOnline.formPlaceholder}
              cta={educacao.cursosOnline.formCta}
              disclaimer={educacao.cursosOnline.formDisclaimer}
            />
          </div>
        </div>
      </div>
    </>
  );
}
