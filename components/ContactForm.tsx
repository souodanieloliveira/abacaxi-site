"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ nome: "", empresa: "", email: "", mensagem: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.nome && form.email && form.mensagem) setSubmitted(true);
  };

  if (submitted) {
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
          style={{
            background: "var(--color-button)",
            color: "#ffffff",
            padding: "12px 28px",
            borderRadius: 6,
            fontWeight: 700,
            fontSize: "1rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          Enviar
        </button>
      </div>
    </form>
  );
}
