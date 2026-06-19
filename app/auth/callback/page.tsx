import type { Metadata } from "next";
import CopyButton from "./CopyButton";

const ROXO = "#8500DB";

export const metadata: Metadata = {
  title: "Callback de autorização",
  // Página interna de uso único — não deve ser indexada.
  robots: { index: false, follow: false },
};

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const first = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  const code = first(params.code);
  const error = first(params.error);
  const errorDescription = first(params.error_description);

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#ffffff",
        color: "#111111",
        fontFamily: "Arial, Helvetica, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          color: ROXO,
          fontSize: 28,
          fontWeight: 700,
          margin: "0 0 24px",
        }}
      >
        Autorização Conta Azul
      </h1>

      {code ? (
        <div
          style={{
            width: "100%",
            maxWidth: 560,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <p style={{ margin: 0, fontSize: 15, color: "#555555" }}>
            Copie o código abaixo e cole onde for solicitado.
          </p>
          <code
            style={{
              display: "block",
              width: "100%",
              wordBreak: "break-all",
              background: "#f5f5f5",
              border: `2px solid ${ROXO}`,
              borderRadius: 8,
              padding: "16px 20px",
              fontFamily: "Menlo, Consolas, monospace",
              fontSize: 16,
            }}
          >
            {code}
          </code>
          <CopyButton value={code} />
        </div>
      ) : error ? (
        <div style={{ width: "100%", maxWidth: 560 }}>
          <p
            style={{
              margin: "0 0 8px",
              fontSize: 18,
              fontWeight: 700,
              color: "#c62828",
            }}
          >
            Erro na autorização
          </p>
          <p style={{ margin: 0, fontSize: 15, color: "#555555" }}>
            {errorDescription || error}
          </p>
        </div>
      ) : (
        <p style={{ margin: 0, fontSize: 16, color: "#555555" }}>
          Aguardando autorização...
        </p>
      )}
    </main>
  );
}
