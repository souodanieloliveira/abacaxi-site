import type { Metadata } from "next";
import { siteContent } from "../../content/site";
import ContactForm from "../../components/ContactForm";
import PaginaHero from "../../components/PaginaHero";

export const metadata: Metadata = {
  title: "Fale Conosco",
  description:
    "Entre em contato com a Abacaxi pelo formulário, WhatsApp ou e-mail. Respondemos em até 1 dia útil.",
  alternates: { canonical: "https://abacaxi.cc/contato" },
  openGraph: {
    url: "https://abacaxi.cc/contato",
    images: [{ url: "https://abacaxi.cc/hero-abacaxi.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: "https://abacaxi.cc/hero-abacaxi.png", width: 1200, height: 630 }],
  },
};

export default function ContatoPage() {
  const { contato } = siteContent;

  return (
    <>
      {/* 18/11/2026 (Daniel): mesma primeira tela das demais páginas, sem foto (o formulário fica logo abaixo). */}
      <PaginaHero
        rotulo="Fale com a Abacaxi"
        titulo={contato.hero.title}
        frase={contato.hero.subtitle}
      />

      {/* CONTEÚDO — formulário + canais */}
      <div style={{ background: "#ffffff" }}>
        <div
          className="container flex-responsive flex-topo"
          style={{ paddingTop: 56, paddingBottom: 56 }}
        >
          {/* Formulário */}
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--color-text-main)",
                marginBottom: 24,
                marginTop: 0,
              }}
            >
              Envie uma mensagem
            </h2>
            <ContactForm />
          </div>

          {/* Canais diretos */}
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--color-text-main)",
                marginBottom: 24,
                marginTop: 0,
              }}
            >
              Ou fale diretamente
            </h2>

            {/* WhatsApp */}
            <div
              style={{
                border: "1px solid var(--color-border-light)",
                borderRadius: 12,
                padding: 24,
                marginBottom: 16,
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-text-accent)",
                  marginBottom: 8,
                  marginTop: 0,
                }}
              >
                WhatsApp
              </p>
              <p
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "var(--color-text-main)",
                  marginBottom: 16,
                  marginTop: 0,
                }}
              >
                {contato.canais.whatsapp.numero}
              </p>
              <a
                href={contato.canais.whatsapp.href}
                data-umami-event="whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: "#25D366",
                  color: "#ffffff",
                  padding: "10px 20px",
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  textDecoration: "none",
                }}
              >
                Abrir no WhatsApp
              </a>
            </div>

            {/* E-mail */}
            <div
              style={{
                border: "1px solid var(--color-border-light)",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-text-accent)",
                  marginBottom: 8,
                  marginTop: 0,
                }}
              >
                E-mail
              </p>
              <p
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "var(--color-text-main)",
                  marginBottom: 16,
                  marginTop: 0,
                }}
              >
                {contato.canais.email.endereco}
              </p>
              <a
                href={contato.canais.email.href}
                data-umami-event="email"
                style={{
                  display: "inline-block",
                  border: "1.5px solid var(--color-text-accent)",
                  color: "var(--color-text-accent)",
                  padding: "10px 20px",
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  textDecoration: "none",
                }}
              >
                Enviar e-mail
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
