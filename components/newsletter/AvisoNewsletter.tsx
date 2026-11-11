import Link from "next/link";

// Página curta da Newsletter da Abacaxi (depois do envio do formulário ou do
// clique no link de confirmação do Brevo). Decisão de 11/11/2026.
export default function AvisoNewsletter({
  titulo,
  texto,
  botao,
}: {
  titulo: string;
  texto: string;
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
          <p style={{ margin: 0, fontSize: "1.125rem", lineHeight: 1.7 }}>{texto}</p>
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
