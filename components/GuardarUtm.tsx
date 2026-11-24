"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { CAMPOS_UTM, CHAVE_UTM, limparUtm } from "../content/utm";

// Guarda na aba a origem (UTM) da chegada ao site, para o cadastro da campanha levar o código ao Funil (content/utm.ts).
// Só grava quando o endereço traz algum utm_; uma chegada nova com UTM substitui a anterior.
export default function GuardarUtm() {
  const pathname = usePathname();
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (!CAMPOS_UTM.some((c) => params.has(c))) return;
      const utm = limparUtm(Object.fromEntries(CAMPOS_UTM.map((c) => [c, params.get(c) ?? undefined])));
      if (Object.keys(utm).length) sessionStorage.setItem(CHAVE_UTM, JSON.stringify(utm));
    } catch {
      // sem armazenamento no navegador: segue sem guardar a origem
    }
  }, [pathname]);
  return null;
}
