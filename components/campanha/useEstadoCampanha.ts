"use client";

import { useEffect, useState } from "react";
import { MODO_TESTE_NAVEGADOR, estadoCampanha, type EstadoCampanha } from "../../content/campanha";

// Estado da campanha no navegador (antes, aberta, encerrada), conferido a cada 30 s. Nas prévias, sempre aberta.
// O servidor (/api/black-friday) confere de novo no envio.
export function useEstadoCampanha() {
  const [estado, setEstado] = useState<EstadoCampanha | null>(null);
  useEffect(() => {
    const atualizar = () => setEstado(MODO_TESTE_NAVEGADOR ? "aberta" : estadoCampanha());
    atualizar();
    const t = setInterval(atualizar, 30_000);
    return () => clearInterval(t);
  }, []);
  return estado;
}
