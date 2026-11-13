import type { Metadata } from "next";
import FormularioEbook from "../../components/ebook/FormularioEbook";

// Página de apresentação do ebook. Textos aprovados por Daniel em 11/11/2026.
// No celular, alinhada à esquerda, como /ebook/obrigado (12/11/2026 13:51).
// Formulário do Brevo dentro da página, com o visual do site (12/11/2026 13:57).
export const metadata: Metadata = {
  title: "Ebook gratuito: Quanto tempo dura seu orçamento?",
  description:
    "Conheça o Limite de Gastos: um jeito simples de saber quanto pode gastar por semana e de manter o plano de pé até o fim do mês.",
  alternates: { canonical: "https://abacaxi.cc/ebook" },
  // Imagem de compartilhamento própria (13/11/2026): o livro, da conversa de Conteúdo, em 1200 × 630.
  // Ao definir openGraph aqui, a imagem padrão do layout deixa de valer; por isso ela é declarada de novo.
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Abacaxi",
    url: "https://abacaxi.cc/ebook",
    images: [
      {
        url: "https://abacaxi.cc/ebook/compartilhamento.jpg",
        width: 1200,
        height: 630,
        alt: "Capa do ebook Quanto tempo dura seu orçamento?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://abacaxi.cc/ebook/compartilhamento.jpg"],
  },
};

export default function EbookPage() {
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
            Ebook gratuito
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
            Quanto tempo dura seu orçamento?
          </h1>
          <p style={{ margin: 0, fontSize: "1.125rem", lineHeight: 1.7 }}>
            Orçamentos costumam morrer de complexidade. Neste ebook, você conhece o Limite de Gastos:
            um jeito simples de saber quanto pode gastar por semana e de manter o plano de pé até o fim
            do mês.
          </p>
          <p style={{ margin: "16px 0 0", opacity: 0.7 }}>
            15 minutos de leitura · 34 páginas · com ficha para preencher
          </p>
          <div className="ebook-form-cartao">
            <FormularioEbook />
          </div>
        </div>
      </div>
    </div>
  );
}
