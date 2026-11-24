"use client";

import Link from "next/link";
import { MODO_TESTE_NAVEGADOR, PACOTES, PAGAMENTO, reais, rotuloPacote } from "../../content/campanha";
import { useEstadoCampanha } from "./useEstadoCampanha";

// Etapa 1 da compra (20/11/2026 15:21): a pessoa escolhe o pacote; os dados ficam na etapa 2 (/black-friday-2026/comprar),
// para medir no Umami onde o fluxo quebra.
// Pacote em destaque (Daniel, 20/11/2026 15:39: "pode destacar").
const PACOTE_DESTAQUE = "2";

export default function EscolhaPacotes({ conversaUrl }: { conversaUrl: string }) {
  const estado = useEstadoCampanha();

  return (
    <div id="bf-pacotes" className="bf-compra">
      {MODO_TESTE_NAVEGADOR && (
        <p className="bf-aviso bf-aviso__titulo">Prévia de teste: a campanha aparece aberta e o cadastro entra no Funil marcado [TESTE].</p>
      )}
      <div className="bf-pacotes">
        {PACOTES.map((p) => (
          <div key={p.id} className={"bf-pacote" + (p.id === PACOTE_DESTAQUE ? " bf-pacote--destaque" : "")}>
            {p.id === PACOTE_DESTAQUE && <span className="bf-pacote__selo">Recomendado</span>}
            <p className="bf-pacote__nome">{rotuloPacote(p)}</p>
            <p className="bf-pacote__desc">{p.descricao}</p>
            <p className="bf-pacote__cheio">
              de <s>{reais(p.precoCheio)}</s>
            </p>
            <p className="bf-pacote__preco">{reais(p.precoCampanha)}</p>
            <p className="bf-pacote__economia">{reais(p.precoCheio - p.precoCampanha)} de desconto</p>
            {estado === "aberta" && (
              <Link href={`${PAGAMENTO.paginaDados}?pacote=${p.id}`} className="btn-primary bf-pacote__botao" data-umami-event={`bf-pacote-${p.id}`}>
                Escolher
              </Link>
            )}
          </div>
        ))}
      </div>

      {estado === "antes" && (
        <div className="bf-aviso">
          <p className="bf-aviso__titulo">A campanha abre em 25 de novembro de 2026, às 00h.</p>
        </div>
      )}

      {estado === "encerrada" && (
        <div className="bf-aviso">
          <p className="bf-aviso__titulo">Campanha encerrada.</p>
          <p>
            A Black Friday da Abacaxi terminou em 4 de dezembro de 2026. Se quiser conversar sobre o seu momento,{" "}
            <a href={conversaUrl} target="_blank" rel="noopener" data-umami-event="bf-conversa">
              agende uma conversa gratuita
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
