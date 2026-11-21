"use client";

import { useEffect, useState } from "react";

// Barra fixa no celular com o botão "Escolher meu pacote" (20/11/2026 15:39). Some enquanto os pacotes estão na tela.
export default function BarraFixa() {
  const [visivel, setVisivel] = useState(false);
  useEffect(() => {
    const alvo = document.getElementById("bf-pacotes");
    const topo = () => setVisivel(window.scrollY > 400);
    let pacotesNaTela = false;
    const obs = alvo
      ? new IntersectionObserver(([e]) => {
          pacotesNaTela = e.isIntersecting;
          setVisivel(!pacotesNaTela && window.scrollY > 400);
        })
      : null;
    if (alvo && obs) obs.observe(alvo);
    const rolar = () => (pacotesNaTela ? setVisivel(false) : topo());
    window.addEventListener("scroll", rolar, { passive: true });
    return () => {
      window.removeEventListener("scroll", rolar);
      obs?.disconnect();
    };
  }, []);
  return (
    <div className={"lp-barra" + (visivel ? " lp-barra--visivel" : "")} aria-hidden={!visivel}>
      <a href="#bf-pacotes" className="btn-primary lp-botao" tabIndex={visivel ? 0 : -1} data-umami-event="bf-escolher-barra">
        Escolher meu pacote
      </a>
    </div>
  );
}
