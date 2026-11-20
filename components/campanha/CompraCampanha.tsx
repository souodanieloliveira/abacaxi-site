"use client";

import { useEffect, useState } from "react";
import { digitosWhatsappValidos } from "../calculadora/whatsapp";
import { PACOTES, estadoCampanha, reais, type EstadoCampanha, type Pacote } from "../../content/campanha";

// Compra direta da campanha Black Friday + 13º 2026: escolha do pacote → formulário → aceite do termo →
// link de pagamento (Mercado Pago) → agendamento do primeiro encontro. O estado da campanha (antes, aberta,
// encerrada) é conferido no navegador e de novo no servidor (/api/black-friday).

const NOME_VALIDO = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function nomeValido(bruto: string) {
  const n = bruto.trim().replace(/\s+/g, " ");
  if (n.length < 2 || n.length > 80 || !NOME_VALIDO.test(n)) return false;
  const partes = n.split(" ");
  return partes.length >= 2 && partes[0].replace(/['-]/g, "").length >= 2 && partes[partes.length - 1].replace(/['-]/g, "").length >= 2;
}

function mascaraWhatsapp(bruto: string) {
  const d = bruto.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  const ddd = d.slice(0, 2);
  const resto = d.slice(2);
  if (resto.length <= 4) return `(${ddd}) ${resto}`;
  const corte = resto.length === 9 ? 5 : 4;
  return `(${ddd}) ${resto.slice(0, corte)}-${resto.slice(corte)}`;
}

function rotulo(p: Pacote) {
  return p.encontros === 1 ? "1 Encontro Individual" : `${p.encontros} Encontros Individuais`;
}

type Resultado = { linkPagamento: string; agenda: string; prazo: string };

export default function CompraCampanha({ conversaUrl }: { conversaUrl: string }) {
  const [estado, setEstado] = useState<EstadoCampanha | null>(null);
  const [pacote, setPacote] = useState<Pacote["id"] | "">("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [wpp, setWpp] = useState("");
  const [termo, setTermo] = useState(false);
  const [consent, setConsent] = useState(false);
  const [isca, setIsca] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<Resultado | null>(null);

  useEffect(() => {
    const atualizar = () => setEstado(estadoCampanha());
    atualizar();
    const t = setInterval(atualizar, 30_000);
    return () => clearInterval(t);
  }, []);

  function escolher(id: Pacote["id"]) {
    setPacote(id);
    setErro("");
    document.getElementById("bf-dados")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    if (!pacote) return setErro("Escolha um pacote.");
    if (!nomeValido(nome)) return setErro("Informe seu nome e sobrenome, só com letras.");
    if (email.trim().length > 254 || !EMAIL_VALIDO.test(email.trim())) return setErro("Confira o e-mail.");
    if (!digitosWhatsappValidos(wpp.replace(/\D/g, ""))) return setErro("Confira o WhatsApp, com DDD.");
    if (!termo) return setErro("Para seguir, leia e aceite o termo de compra.");
    if (!consent) return setErro("Marque a caixa de consentimento para continuar.");
    setEnviando(true);
    try {
      const r = await fetch("/api/black-friday", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pacote, nome: nome.trim().replace(/\s+/g, " "), email: email.trim(), whatsapp: wpp, termo: true, consentimento: true, site: isca }),
      });
      const dados = await r.json().catch(() => ({}));
      if (!r.ok) {
        setEnviando(false);
        if (r.status === 410) setEstado("encerrada");
        return setErro(dados.error ?? "Não foi possível registrar agora. Tente de novo em instantes.");
      }
      setResultado({ linkPagamento: dados.linkPagamento ?? "", agenda: dados.agenda ?? "", prazo: dados.prazo ?? "" });
      document.getElementById("bf-compra")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setErro("Sem conexão. Tente de novo em instantes.");
    }
    setEnviando(false);
  }

  const escolhido = PACOTES.find((p) => p.id === pacote);

  return (
    <div id="bf-compra" className="bf-compra">
      <div className="bf-pacotes">
        {PACOTES.map((p) => (
          <div key={p.id} className={"bf-pacote" + (pacote === p.id ? " bf-pacote--escolhido" : "")}>
            <p className="bf-pacote__nome">{rotulo(p)}</p>
            <p className="bf-pacote__cheio">
              de <s>{reais(p.precoCheio)}</s>
            </p>
            <p className="bf-pacote__preco">{reais(p.precoCampanha)}</p>
            <p className="bf-pacote__economia">{reais(p.precoCheio - p.precoCampanha)} de desconto</p>
            {estado === "aberta" && !resultado && (
              <button type="button" className={pacote === p.id ? "btn-primary bf-pacote__botao" : "btn-secondary bf-pacote__botao"} onClick={() => escolher(p.id)} data-umami-event={`bf-pacote-${p.id}`}>
                {pacote === p.id ? "Escolhido" : "Escolher"}
              </button>
            )}
          </div>
        ))}
      </div>

      {estado === "antes" && (
        <div className="bf-aviso">
          <p className="bf-aviso__titulo">A campanha abre em 24 de novembro de 2026, às 00h.</p>
          <p>Até lá, conheça o guia gratuito e a calculadora no topo desta página.</p>
        </div>
      )}

      {estado === "encerrada" && !resultado && (
        <div className="bf-aviso">
          <p className="bf-aviso__titulo">Campanha encerrada.</p>
          <p>
            A Black Friday + 13º da Abacaxi terminou em 4 de dezembro de 2026. Se quiser conversar sobre o seu momento,{" "}
            <a href={conversaUrl} target="_blank" rel="noopener" data-umami-event="bf-conversa">
              agende uma conversa gratuita
            </a>
            .
          </p>
        </div>
      )}

      {estado === "aberta" && !resultado && (
        <form id="bf-dados" className="calc-card bf-form" onSubmit={enviar} noValidate>
          <h2 className="calc-titulo">Seus dados</h2>
          <p className="calc-desc">
            {escolhido ? `Pacote escolhido: ${rotulo(escolhido)}, por ${reais(escolhido.precoCampanha)}.` : "Escolha um pacote acima para continuar."}
          </p>
          <label className="calc-label" htmlFor="bf-nome">Nome e sobrenome</label>
          <input className="calc-input" id="bf-nome" autoComplete="name" maxLength={80} value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome e sobrenome" />
          <label className="calc-label" htmlFor="bf-email">E-mail</label>
          <input className="calc-input" id="bf-email" type="email" inputMode="email" autoComplete="email" maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" />
          <label className="calc-label" htmlFor="bf-wpp">WhatsApp</label>
          <input className="calc-input" id="bf-wpp" type="tel" inputMode="tel" autoComplete="tel" maxLength={15} value={wpp} onChange={(e) => setWpp(mascaraWhatsapp(e.target.value))} placeholder="(62) 90000-0000" />
          <input type="text" name="site" tabIndex={-1} autoComplete="off" value={isca} onChange={(e) => setIsca(e.target.value)} className="calc-isca" aria-hidden="true" />
          <label className="calc-consent">
            <input type="checkbox" checked={termo} onChange={(e) => setTermo(e.target.checked)} />
            <span>
              Li e aceito o{" "}
              <a href="/black-friday-2026/termo" target="_blank" rel="noopener">termo de compra dos Encontros Individuais</a>.
            </span>
          </label>
          <label className="calc-consent">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>
              Aceito que a Abacaxi use meus dados para a compra, o agendamento e o contato sobre os encontros. Saiba como tratamos seus dados em nossa{" "}
              <a href="/privacidade" target="_blank" rel="noopener">Política de Privacidade</a>.
            </span>
          </label>
          {erro && <p className="calc-erro" role="alert">{erro}</p>}
          <button className="btn-primary calc-botao" type="submit" disabled={enviando} data-umami-event="bf-cadastrar">
            {enviando ? "Registrando…" : "Continuar para o pagamento"}
          </button>
        </form>
      )}

      {resultado && escolhido && (
        <div className="calc-card bf-form">
          <h2 className="calc-titulo">Cadastro feito.</h2>
          <p className="calc-desc">
            Faltam dois passos para garantir {rotulo(escolhido).toLowerCase()} por {reais(escolhido.precoCampanha)}.
          </p>
          <p className="bf-passo">1. Faça o pagamento{resultado.prazo ? ` até ${resultado.prazo}` : ""}.</p>
          {resultado.linkPagamento ? (
            <a className="btn-primary calc-botao" href={resultado.linkPagamento} target="_blank" rel="noopener" data-umami-event="bf-pagar">
              Pagar pelo Mercado Pago
            </a>
          ) : (
            <p className="calc-desc">Você vai receber o link de pagamento pelo WhatsApp.</p>
          )}
          <p className="bf-passo">2. Depois do pagamento, agende o seu primeiro encontro.</p>
          {resultado.agenda ? (
            <a className="btn-secondary calc-botao" href={resultado.agenda} target="_blank" rel="noopener" data-umami-event="bf-agendar">
              Agendar o primeiro encontro
            </a>
          ) : (
            <p className="calc-desc">Você vai receber o link para agendar pelo WhatsApp.</p>
          )}
        </div>
      )}
    </div>
  );
}
