"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { digitosWhatsappValidos } from "../calculadora/whatsapp";
import { cpfValido, mascaraCpf } from "./cpf";
import { CAMPANHA, MODO_TESTE_NAVEGADOR, reais, rotuloPacote, type Pacote } from "../../content/campanha";
import { useEstadoCampanha } from "./useEstadoCampanha";

// Etapa 2 da compra da campanha Black Friday 2026 (20/11/2026 15:21): dados da pessoa, aceite dos Termos e Condições e
// consentimento; o servidor (/api/black-friday) cria o registro no Funil e a fatura da Iugu, e a pessoa segue para o pagamento.

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

export default function FormularioCompra({ pacote }: { pacote: Pacote }) {
  const estadoBase = useEstadoCampanha();
  const [encerradaNoEnvio, setEncerradaNoEnvio] = useState(false);
  const estado = encerradaNoEnvio ? "encerrada" : estadoBase;
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [wpp, setWpp] = useState("");
  const [cpf, setCpf] = useState("");
  const [termo, setTermo] = useState(false);
  const [consent, setConsent] = useState(false);
  const [isca, setIsca] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  // Link da fatura já criada (20/11/2026 16:05): a Iugu às vezes devolve erro 500 na primeira abertura da página;
  // o link fica guardado para a pessoa tentar de novo ao voltar para esta etapa.
  const [linkReserva, setLinkReserva] = useState("");
  const chaveReserva = `bf-pagamento-${pacote.id}`;

  // Link guardado numa visita anterior a esta etapa (no servidor, vazio).
  const linkSalvo = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return sessionStorage.getItem(chaveReserva) ?? "";
      } catch {
        return ""; // sem armazenamento no navegador: segue sem o link de reserva
      }
    },
    () => "",
  );
  const linkPagamento = linkReserva || linkSalvo;

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    if (!nomeValido(nome)) return setErro("Informe seu nome e sobrenome, só com letras.");
    if (email.trim().length > 254 || !EMAIL_VALIDO.test(email.trim())) return setErro("Confira o e-mail.");
    if (!digitosWhatsappValidos(wpp.replace(/\D/g, ""))) return setErro("Confira o WhatsApp, com DDD.");
    if (!cpfValido(cpf)) return setErro("Confira o CPF.");
    if (!termo) return setErro("Para seguir, leia e aceite os Termos e Condições.");
    if (!consent) return setErro("Marque a caixa de consentimento para continuar.");
    setEnviando(true);
    try {
      const r = await fetch("/api/black-friday", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pacote: pacote.id, nome: nome.trim().replace(/\s+/g, " "), email: email.trim(), whatsapp: wpp, cpf, termo: true, consentimento: true, site: isca }),
      });
      const dados = await r.json().catch(() => ({}));
      if (!r.ok) {
        setEnviando(false);
        if (r.status === 410) setEncerradaNoEnvio(true);
        return setErro(dados.error ?? "Não foi possível registrar agora. Tente de novo em instantes.");
      }
      if (!dados.url) {
        setEnviando(false);
        return setErro("Não foi possível abrir o pagamento agora. Tente de novo em instantes.");
      }
      try {
        sessionStorage.setItem(chaveReserva, dados.url);
      } catch {
        // sem armazenamento no navegador
      }
      setLinkReserva(dados.url);
      // Espera curta antes de abrir a fatura recém-criada (erro 500 da Iugu na primeira abertura, 20/11/2026).
      // Pagamento na página da Iugu, na mesma aba; depois do pagamento, a Iugu traz a pessoa para a agenda.
      await new Promise((r) => setTimeout(r, 2000));
      window.location.href = dados.url;
      return;
    } catch {
      setErro("Sem conexão. Tente de novo em instantes.");
    }
    setEnviando(false);
  }

  return (
    <div className="bf-compra">
      {MODO_TESTE_NAVEGADOR && (
        <p className="bf-aviso bf-aviso__titulo">Prévia de teste: a campanha aparece aberta e o cadastro entra no Funil marcado [TESTE].</p>
      )}
      <div className="bf-resumo">
        <p className="bf-resumo__rotulo">Pacote escolhido</p>
        <p className="bf-resumo__nome">{rotuloPacote(pacote)}</p>
        <p className="bf-resumo__preco">
          <s>{reais(pacote.precoCheio)}</s> {reais(pacote.precoCampanha)}
        </p>
        <Link href={`${CAMPANHA.caminho}#bf-pacotes`} className="bf-resumo__trocar" data-umami-event="bf-trocar-pacote">
          Trocar de pacote
        </Link>
      </div>

      {estado === "antes" && (
        <div className="bf-aviso">
          <p className="bf-aviso__titulo">A campanha abre em 24 de novembro de 2026, às 00h.</p>
        </div>
      )}

      {estado === "encerrada" && (
        <div className="bf-aviso">
          <p className="bf-aviso__titulo">Campanha encerrada.</p>
          <p>A Black Friday da Abacaxi terminou em 4 de dezembro de 2026.</p>
        </div>
      )}

      {linkPagamento && (
        <div className="bf-aviso">
          <p>
            Se a página de pagamento não abrir,{" "}
            <a href={linkPagamento} data-umami-event="bf-pagamento-reserva">
              toque aqui para abrir de novo
            </a>
            .
          </p>
        </div>
      )}

      {estado === "aberta" && (
        <form className="calc-card bf-form" onSubmit={enviar} noValidate>
          <h2 className="calc-titulo">Seus dados</h2>
          <label className="calc-label" htmlFor="bf-nome">Nome e sobrenome</label>
          <input className="calc-input" id="bf-nome" autoComplete="name" maxLength={80} value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome e sobrenome" />
          <label className="calc-label" htmlFor="bf-email">E-mail</label>
          <input className="calc-input" id="bf-email" type="email" inputMode="email" autoComplete="email" maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" />
          <label className="calc-label" htmlFor="bf-wpp">WhatsApp</label>
          <input className="calc-input" id="bf-wpp" type="tel" inputMode="tel" autoComplete="tel" maxLength={15} value={wpp} onChange={(e) => setWpp(mascaraWhatsapp(e.target.value))} placeholder="(62) 90000-0000" />
          <label className="calc-label" htmlFor="bf-cpf">CPF</label>
          <input className="calc-input" id="bf-cpf" inputMode="numeric" autoComplete="off" maxLength={14} value={cpf} onChange={(e) => setCpf(mascaraCpf(e.target.value))} placeholder="000.000.000-00" />
          <input type="text" name="site" tabIndex={-1} autoComplete="off" value={isca} onChange={(e) => setIsca(e.target.value)} className="calc-isca" aria-hidden="true" />
          <label className="calc-consent">
            <input type="checkbox" checked={termo} onChange={(e) => setTermo(e.target.checked)} />
            <span>
              Li e aceito os{" "}
              <a href="/black-friday-2026/termo" target="_blank" rel="noopener">Termos e Condições</a>.
            </span>
          </label>
          <label className="calc-consent">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>
              Aceito que a Abacaxi use meus dados para a compra, o agendamento e o contato sobre os encontros. Saiba como tratamos seus dados em nossa{" "}
              <a href="/privacidade" target="_blank" rel="noopener">Política de Privacidade</a>.
            </span>
          </label>
          <p className="calc-desc">
            Ao clicar no botão abaixo, você será levado à página de pagamento, processada por uma plataforma de terceiros escolhida pela Abacaxi.
          </p>
          {erro && <p className="calc-erro" role="alert">{erro}</p>}
          <button className="btn-primary calc-botao" type="submit" disabled={enviando} data-umami-event="bf-cadastrar">
            {enviando ? "Abrindo o pagamento…" : "Ir para o pagamento"}
          </button>
        </form>
      )}
    </div>
  );
}
