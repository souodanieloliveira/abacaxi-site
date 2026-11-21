"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useSyncExternalStore } from "react";
import { CAMPANHA, MODO_TESTE_NAVEGADOR, estadoCampanha } from "../../content/campanha";

// Faixa da Black Friday Abacaxi logo abaixo do cabeçalho, em todas as páginas (Daniel, 20/11/2026 19:48 a 20:42).
// 20:42: "a faixa é boa, mas quero ela sozinha passando. só o escrito, fundo preto, letra ora laranja, ora branca, sem
// inclinação". Uma fila de texto passando, reta, sobre fundo preto (cor de teste), com o botão "Ver ofertas" fixo à
// direita, piscando (pedido de 20:32). Quem pede menos movimento no aparelho vê o texto parado e o botão sem piscar.
// Aparece de 00h00 de 24/11 a 23h59 de 04/12 (horário de Brasília); nas prévias da Vercel fica sempre visível para
// testar. Não aparece nas páginas da campanha nem em /pagamento-concluido. A data é lida no navegador (as páginas são
// geradas antes), por isso a faixa só surge depois de a página carregar.
const assinar = () => () => {};

const FRASES = ["Black Friday Abacaxi", "3x R$ 140 sem juros", "Até R$ 500 de desconto", "Encontros Individuais", "Só até 4/12"];

function Metade() {
  // Repetida para encher telas largas; o trilho tem duas metades iguais e anda metade da largura, sem salto.
  const sequencia = [...FRASES, ...FRASES];
  return (
    <span className="bf-faixa__metade">
      {sequencia.map((t, i) => (
        <Fragment key={i}>
          <span className={i % 2 === 0 ? "bf-faixa__frase bf-faixa__frase--laranja" : "bf-faixa__frase"}>{t}</span>
          {/* Barra entre as frases (Daniel, 20/11/2026 20:47: "sem ícones, só barras assim |"). */}
          <span className="bf-faixa__barra">|</span>
        </Fragment>
      ))}
    </span>
  );
}

export default function FaixaCampanha() {
  const pathname = usePathname();
  const aberta = useSyncExternalStore(
    assinar,
    () => MODO_TESTE_NAVEGADOR || estadoCampanha() === "aberta",
    () => false,
  );

  if (!aberta) return null;
  if (pathname?.startsWith(CAMPANHA.caminho) || pathname?.startsWith("/pagamento-concluido")) return null;

  return (
    <Link
      href={CAMPANHA.caminho}
      className="bf-faixa"
      data-umami-event="bf-faixa-topo"
      aria-label="Black Friday Abacaxi: Encontros Individuais a partir de 3x R$ 140 sem juros, até R$ 500 de desconto, só até 4 de dezembro. Ver ofertas."
    >
      <span className="bf-faixa__trilho" aria-hidden="true">
        <Metade />
        <Metade />
      </span>
      <span className="bf-faixa__botao" aria-hidden="true">
        <span className="bf-faixa__pilula">
          Ver ofertas <span>→</span>
        </span>
      </span>
    </Link>
  );
}
