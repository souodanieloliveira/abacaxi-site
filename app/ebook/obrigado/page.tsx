import type { Metadata } from "next";
import { EBOOK_PDF } from "../../../content/ebook";

// Página depois do envio do formulário do ebook (configurada no Brevo). Fora do índice de busca.
export const metadata: Metadata = {
  title: "Seu ebook está pronto",
  robots: { index: false, follow: false },
};

export default function EbookObrigadoPage() {
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
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
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
            Quanto tempo dura seu orçamento?
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
            Seu ebook está pronto
          </h1>
          <p style={{ margin: 0, fontSize: "1.125rem", lineHeight: 1.7 }}>
            Baixe o arquivo e salve no seu computador ou celular. A ficha da página 18 pode ser
            preenchida direto no PDF.
          </p>
          <div style={{ marginTop: 32 }}>
            <a href={EBOOK_PDF} className="btn-primary" download>
              Baixar o ebook (PDF)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
