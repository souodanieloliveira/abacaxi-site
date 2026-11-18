import type { Metadata } from "next";
import Image from "next/image";
import FormularioNewsletter from "../../components/newsletter/FormularioNewsletter";
import { NEWSLETTER_NAME } from "../../content/blog/config";

// Página de assinatura da newsletter, com o formulário do Brevo dentro do site (decisão de Daniel em
// 12/11/2026 17:58, opção a). Mesmo desenho de /ebook. Os botões do blog (NewsletterBox) levam para cá.
export const metadata: Metadata = {
  title: `${NEWSLETTER_NAME} | Newsletter`,
  description:
    "A descasca., a newsletter da Abacaxi, chega a cada duas semanas, com um texto sobre decisões financeiras que valem a reflexão.",
  alternates: { canonical: "https://abacaxi.cc/newsletter" },
  // Ao definir openGraph aqui, a imagem padrão do layout deixa de valer; por isso ela é declarada de novo (13/11/2026).
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Abacaxi",
    url: "https://abacaxi.cc/newsletter",
    images: [{ url: "https://abacaxi.cc/hero-abacaxi.png", width: 1200, height: 630 }],
  },
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
        {/* A newsletter se chama "descasca." (Daniel, 17/11/2026 22:22): título em Fraunces no Roxo Escuro, com o
            ponto laranja, e o "d." à direita só no computador, como na página do blog. */}
        <div className="blog-topo" style={{ maxWidth: 960, margin: "0 auto" }}>
          <div className="ebook-intro" style={{ maxWidth: 640, textAlign: "left" }}>
            <p className="home-hero__rotulo">Newsletter da Abacaxi</p>
            <h1
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 500,
                fontSize: "3rem",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--color-dark)",
                margin: "0 0 16px",
              }}
            >
              descasca<span style={{ color: "var(--color-secondary)" }}>.</span>
            </h1>
            <p style={{ margin: 0, fontSize: "1.125rem", lineHeight: 1.7 }}>
              Receba os próximos textos por e-mail. A {NEWSLETTER_NAME} chega a cada duas semanas, com um
              texto sobre decisões financeiras que valem a reflexão.
            </p>
            <div className="ebook-form-cartao">
              <FormularioNewsletter />
            </div>
          </div>
          <div className="blog-topo__logo">
            <Image src="/descasca-logo.png" alt="" width={640} height={640} sizes="240px" priority />
          </div>
        </div>
      </div>
    </div>
  );
}
