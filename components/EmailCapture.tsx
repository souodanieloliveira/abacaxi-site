"use client";

import { useState } from "react";

interface Props {
  placeholder: string;
  cta: string;
  disclaimer: string;
}

export default function EmailCapture({ placeholder, cta, disclaimer }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (submitted) {
    return (
      <p style={{ fontWeight: 600, color: "var(--color-text-accent)" }}>
        Anotado! Te avisamos quando estiver pronto.
      </p>
    );
  }

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
          style={{
            background: "var(--color-button)",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: 6,
            fontWeight: 500,
            fontSize: "1rem",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {cta}
        </button>
      </div>
      <p style={{ fontSize: "0.875rem", opacity: 0.6, margin: 0 }}>
        {disclaimer}
      </p>
    </form>
  );
}
