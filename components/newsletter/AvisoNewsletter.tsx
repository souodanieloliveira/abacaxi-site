import Link from "next/link";
import { NEWSLETTER_NAME } from "../../content/blog/config";

// Página curta da descasca., a newsletter da Abacaxi (depois do envio do formulário ou do
// clique no link de confirmação do Brevo). Decisão de 11/11/2026.
// 12/11/2026 18:13: coluna mais larga e linhas equilibradas (text-wrap: balance), para não sobrar
// uma linha curta no fim das frases (pedido de Daniel, vista no computador).
// 18/11/2026 11:46: mesma identidade do e-mail de confirmação (modelo 8 do Brevo): cartão branco
// sobre o lavanda, nome "descasca." em Fraunces no Roxo Escuro com ponto laranja, etiqueta
// "A newsletter da Abacaxi" e título em Fraunces no Roxo Escuro (pedido de Daniel, consistência).
export default function AvisoNewsletter({
  titulo,
  texto,
  botao,
}: {
  titulo: string;
  texto: string | string[];
  botao?: { texto: string; href: string };
}) {
  const fraunces = "var(--font-fraunces), Georgia, serif";
  const ponto = NEWSLETTER_NAME.endsWith(".") ? NEWSLETTER_NAME.slice(0, -1) : NEWSLETTER_NAME;
  return (
    <div
      style={{
        background: "var(--color-background-soft)",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container" style={{ paddingTop: 64, paddingBottom: 64, width: "100%" }}>
        <div className="aviso-newsletter">
          <p
            aria-label={NEWSLETTER_NAME}
            style={{
              fontFamily: fraunces,
              fontWeight: 500,
              fontSize: "2.75rem",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "var(--color-dark)",
              margin: 0,
            }}
          >
            {ponto}
            <span style={{ color: "var(--color-secondary)" }}>.</span>
          </p>
          <p
            style={{
              margin: "8px 0 28px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#7A7385",
            }}
          >
            A newsletter da Abacaxi
          </p>
          <h1
            style={{
              fontFamily: fraunces,
              fontWeight: 500,
              fontSize: "2rem",
              lineHeight: 1.2,
              color: "var(--color-dark)",
              margin: "0 0 16px",
            }}
          >
            {titulo}
          </h1>
          {(Array.isArray(texto) ? texto : [texto]).map((paragrafo, i) => (
            <p
              key={i}
              style={{ margin: i === 0 ? 0 : "12px 0 0", fontSize: "1.0625rem", lineHeight: 1.7, textWrap: "balance" }}
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
