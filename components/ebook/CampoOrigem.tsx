"use client";

import { useEffect, useRef } from "react";
import { CAMPOS_UTM, lerUtmGuardada, limparUtm, textoUtm, type Utm } from "../../content/utm";

// Origem do cadastro do guia (26/11/2026, Daniel: "Sim, prepare" / "Sim, execute").
// Vai para o atributo ORIGEM do contato na Brevo, no mesmo formato do Funil ("fonte / meio / campanha / conteúdo").
// Lê primeiro a UTM do próprio endereço (o efeito deste campo roda antes do GuardarUtm do layout na primeira carga)
// e, sem ela, a guardada na aba. Sem nenhuma, fica "sem utm".
export default function CampoOrigem() {
  const campo = useRef<HTMLInputElement>(null);
  useEffect(() => {
    let utm: Utm = {};
    try {
      const params = new URLSearchParams(window.location.search);
      utm = limparUtm(Object.fromEntries(CAMPOS_UTM.map((c) => [c, params.get(c) ?? undefined])));
    } catch {
      // segue para a origem guardada
    }
    const texto = textoUtm(utm) || textoUtm(lerUtmGuardada());
    if (texto && campo.current) campo.current.value = texto;
  }, []);
  return <input ref={campo} type="hidden" id="ORIGEM" name="ORIGEM" defaultValue="sem utm" />;
}
