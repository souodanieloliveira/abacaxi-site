"use client";

import { useState } from "react";

interface Props {
  placeholder: string;
  cta: string;
  disclaimer: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function EmailCapture({ placeholder, cta, disclaimer }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/lista-espera", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, origem: "Cursos online" }),
      });

      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p style={{ fontWeight: 600, color: "var(--color-text-accent)" }}>
        Anotado! Te avisamos quando estiver pronto.
      </p>
    );
  }

  const loading = status === "loading";

  return (
    <form onSubmit={handleSubmit}>
      <div className="email-form-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1,
            padding: "10px 16px",
            borderRadius: 6,
            border: "1px solid var(--color-border-light)",
            fontSize: "1rem",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "var(--color-button)",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: 6,
            fontWeight: 500,
            fontSize: "1rem",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            whiteSpace: "nowrap",
          }}
        >
          {loading ? "Enviando…" : cta}
        </button>
      </div>
      {status === "error" ? (
        <p style={{ fontSize: "0.875rem", color: "#c0392b", margin: 0 }}>
          Não foi possível registrar agora. Tente novamente.
        </p>
      ) : (
        <p style={{ fontSize: "0.875rem", opacity: 0.6, margin: 0 }}>
          {disclaimer}
        </p>
      )}
    </form>
  );
}
