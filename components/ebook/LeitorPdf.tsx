"use client";

import { useSyncExternalStore } from "react";

// Leitor do PDF na página de obrigado, só no computador (27/11/2026, Daniel: "Sim, prepare").
// Antes, o iframe ficava escondido por CSS no celular, mas o navegador carregava o PDF assim mesmo;
// no navegador interno do Instagram (Android) isso abria o aviso "Você está saindo de nosso app".
// Agora o iframe só existe quando a tela tem 1024 px ou mais (mesmo corte do CSS .ebook-leitor).
const CONSULTA = "(min-width: 1024px)";

function assinar(avisar: () => void) {
  const mq = window.matchMedia(CONSULTA);
  mq.addEventListener("change", avisar);
  return () => mq.removeEventListener("change", avisar);
}

export default function LeitorPdf({ src, titulo }: { src: string; titulo: string }) {
  const computador = useSyncExternalStore(
    assinar,
    () => window.matchMedia(CONSULTA).matches,
    () => false,
  );
  if (!computador) return null;
  return (
    <div className="ebook-leitor">
      <iframe
        src={src}
        title={titulo}
        style={{ width: "100%", height: "100%", border: 0, display: "block" }}
      />
    </div>
  );
}
