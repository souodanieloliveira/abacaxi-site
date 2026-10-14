"use client";

import { useState } from "react";

interface Props {
  /** Serviço de Interesse a registrar no Airtable (em branco no contato genérico). */
  servico?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm({ servico }: Props) {
  const [form, setForm] = useState({ nome: "", empresa: "", email: "", mensagem: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.email || !form.mensagem) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          empresa: form.empresa,
          email: form.email,
          mensagem: form.mensagem,
          servico,
        }),
      });

      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p style={{ fontWeight: 600, color: "var(--color-text-accent)", fontSize: "1.125rem" }}>
        Mensagem recebida! Entraremos em contato em breve.
      </p>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 16px",
    borderRadius: 6,
    border: "1px solid var(--color-border-light)",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box",
  };

  const loading = status === "loading";

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="email-form-row" style={{ marginBottom: 0 }}>
        <input
          type="text"
          required
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Empresa"
          value={form.empresa}
          onChange={(e) => setForm({ ...form, empresa: e.target.value })}
          style={inputStyle}
        />
      </div>
      <input
        type="email"
        required
        placeholder="E-mail"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={inputStyle}
      />
      <textarea
        required
        placeholder="Mensagem"
        rows={4}
        value={form.mensagem}
        onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
        style={{ ...inputStyle, resize: "vertical" }}
      />
      <div>
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "var(--color-button)",
            color: "#ffffff",
            padding: "12px 28px",
            borderRadius: 6,
            fontWeight: 700,
            fontSize: "1rem",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Enviando…" : "Enviar"}
        </button>
      </div>
      {status === "error" && (
        <p style={{ color: "#c0392b", fontSize: "0.9375rem", margin: 0 }}>
          Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.
        </p>
      )}
    </form>
  );
}
