import type { Metadata } from "next";
import { EBOOK_PDF } from "../../../content/ebook";

// Página depois do envio do formulário do ebook (configurada no Brevo). Fora do índice de busca.
// 12/11/2026: no computador, o PDF aparece na própria página; no celular, o botão "Abrir o ebook"
// abre o PDF no leitor do aparelho (navegadores de celular não mostram PDF embutido de forma confiável).
// Texto da página definido por Daniel em 12/11/2026 13:33.
export const metadata: Metadata = {
  title: "Seu ebook está pronto!",
  robots: { index: false, follow: false },
};

export default function EbookObrigadoPage() {
  return (
    <div style={{ background: "var(--color-background-soft)" }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 72, width: "100%" }}>
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
            Seu ebook está pronto!
          </h1>
          {[
            "Você pode ler nesta página e fazer o download.",
            "Você também recebeu por e-mail para consultar mais tarde.",
            "Faça bom proveito!",
          ].map((paragrafo, i) => (
            <p
              key={i}
              style={{ margin: i === 0 ? 0 : "12px 0 0", fontSize: "1.125rem", lineHeight: 1.7 }}
            >
              {paragrafo}
            </p>
          ))}
          <div
            style={{
              marginTop: 32,
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href={EBOOK_PDF}
              className="btn-secondary ebook-somente-celular"
              target="_blank"
              rel="noopener"
            >
              Abrir o ebook
            </a>
            <a href={EBOOK_PDF} className="btn-primary" download>
              Baixar o ebook (PDF)
            </a>
          </div>
        </div>

        <div className="ebook-leitor">
          <iframe
            src={`${EBOOK_PDF}#view=FitH`}
            title="Ebook Quanto tempo dura seu orçamento?"
            style={{ width: "100%", height: "100%", border: 0, display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}
