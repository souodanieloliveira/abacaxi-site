import type { Metadata } from "next";
import FormularioNewsletter from "../../components/newsletter/FormularioNewsletter";
import { NEWSLETTER_NAME } from "../../content/blog/config";

// Página de assinatura da newsletter, com o formulário do Brevo dentro do site (decisão de Daniel em
// 12/11/2026 17:58, opção a). Mesmo desenho de /ebook. Os botões do blog (NewsletterBox) levam para cá.
export const metadata: Metadata = {
  title: NEWSLETTER_NAME,
  description:
    "A Newsletter da Abacaxi chega a cada duas semanas, com um texto sobre decisões financeiras que valem a reflexão.",
  alternates: { canonical: "https://abacaxi.cc/newsletter" },
  openGraph: { url: "https://abacaxi.cc/newsletter" },
};

export default function NewsletterPage() {
  return (
    <div
      style={{
        background: "var(--color-background-soft)",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container" style={{ paddingTop: 96, paddingBottom: 96, width: "100%" }}>
        <div className="ebook-intro" style={{ maxWidth: 640, margin: "0 auto" }}>
          <p
            style={{
              margin: "0 0 12px",
              fontSize: "0.875rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            Newsletter
          </p>
          <h1
            style={{
              fontSize: "2.25rem",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "var(--color-text-main)",
              margin: "0 0 16px",
            }}
          >
            Receba os próximos textos por e-mail
          </h1>
          <p style={{ margin: 0, fontSize: "1.125rem", lineHeight: 1.7 }}>
            A {NEWSLETTER_NAME} chega a cada duas semanas, com um texto sobre decisões financeiras
            que valem a reflexão.
          </p>
          <div className="ebook-form-cartao">
            <FormularioNewsletter />
          </div>
        </div>
      </div>
    </div>
  );
}
