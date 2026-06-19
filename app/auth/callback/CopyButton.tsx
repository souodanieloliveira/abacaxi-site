"use client";

import { useState } from "react";

const ROXO = "#8500DB";

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Fallback para navegadores/contextos sem a Clipboard API
      const el = document.createElement("textarea");
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      style={{
        background: copied ? "#2e7d32" : ROXO,
        color: "#ffffff",
        border: "none",
        borderRadius: 8,
        padding: "12px 24px",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 16,
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      {copied ? "Copiado!" : "Copiar"}
    </button>
  );
}
