import Link from "next/link";

// Página curta da Newsletter da Abacaxi (depois do envio do formulário ou do
// clique no link de confirmação do Brevo). Decisão de 11/11/2026.
// 12/11/2026 18:13: coluna mais larga e linhas equilibradas (text-wrap: balance), para não sobrar
// uma linha curta no fim das frases (pedido de Daniel, vista no computador).
export default function AvisoNewsletter({
  titulo,
  texto,
  botao,
}: {
  titulo: string;
  texto: string | string[];
  botao?: { texto: string; href: string };
}) {
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
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
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
            Newsletter da Abacaxi
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
            {titulo}
          </h1>
          {(Array.isArray(texto) ? texto : [texto]).map((paragrafo, i) => (
            <p
              key={i}
              style={{ margin: i === 0 ? 0 : "12px 0 0", fontSize: "1.125rem", lineHeight: 1.7, textWrap: "balance" }}
            >
              {paragrafo}
            </p>
          ))}
          {botao && (
            <div style={{ marginTop: 32 }}>
              <Link href={botao.href} className="btn-primary">
                {botao.texto}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
