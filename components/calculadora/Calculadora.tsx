"use client";

import { useState } from "react";
import { digitosWhatsappValidos } from "./whatsapp";

// Lógica, etapas, cenários e textos copiados do protótipo da conversa Conteúdo
// (artifact "Calculadora de Limite de Gastos | Abacaxi"). Parâmetros por pessoa aprovados por Daniel
// (turnos 20 e 22: "é só um parâmetro"); faixas dos cenários 2 a 5 mantidas para teste (15/11/2026).
// Os valores preenchidos ficam só neste navegador; apenas nome, e-mail e WhatsApp vão para /api/calculadora.

const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

type Rec = { id: number; desc: string; val: string };
type Comp = { id: number; desc: string; val: string; dia: string };
type Fat = { id: number; nome: string; val: string; venc: string };
type Par = { id: number; desc: string; val: string; tipo: "parcelas" | "recorrente"; atual: string; total: string };
type Anu = { id: number; desc: string; val: string; ini: string; fim: string };

let _id = 100;
const uid = () => ++_id;

function pc(s: string) {
  return parseFloat(String(s || "").replace(/\./g, "").replace(",", ".")) || 0;
}
// Limites dos campos aprovados por Daniel em 16/11/2026 12:21 (nome e sobrenome obrigatórios).
const MAX_DESC = 60;
const NOME_VALIDO = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Nome e sobrenome: só letras (com acento), espaço, apóstrofo e hífen; 2 a 80 caracteres;
// pelo menos duas palavras, a primeira e a última com 2 letras ou mais.
function nomeValido(bruto: string) {
  const n = bruto.trim().replace(/\s+/g, " ");
  if (n.length < 2 || n.length > 80 || !NOME_VALIDO.test(n)) return false;
  const partes = n.split(" ");
  return partes.length >= 2 && partes[0].replace(/['-]/g, "").length >= 2 && partes[partes.length - 1].replace(/['-]/g, "").length >= 2;
}

// Valor em reais: só números e uma vírgula, até 2 casas e até R$ 9.999.999,99, com ponto de milhar automático.
function mascaraValor(bruto: string) {
  const limpo = bruto.replace(/[^\d,]/g, "");
  const virgula = limpo.indexOf(",");
  let inteiro = (virgula >= 0 ? limpo.slice(0, virgula) : limpo).replace(/^0+(?=\d)/, "").slice(0, 7);
  const dec = virgula >= 0 ? limpo.slice(virgula + 1).replace(/,/g, "").slice(0, 2) : null;
  if (!inteiro && dec !== null) inteiro = "0";
  inteiro = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return dec !== null ? `${inteiro},${dec}` : inteiro;
}

// Dia do mês: só números de 1 a 31.
function mascaraDia(bruto: string, anterior: string) {
  const d = bruto.replace(/\D/g, "").replace(/^0+/, "").slice(0, 2);
  if (!d) return "";
  return Number(d) <= 31 ? d : anterior;
}

// Número de parcelas: só números de 1 a 120.
function mascaraParcela(bruto: string, anterior: string) {
  const d = bruto.replace(/\D/g, "").replace(/^0+/, "").slice(0, 3);
  if (!d) return "";
  return Number(d) <= 120 ? d : anterior;
}

// WhatsApp: só números, formatado como (62) 99999-9999 ou (62) 9999-9999.
function mascaraWhatsapp(bruto: string) {
  const d = bruto.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  const ddd = d.slice(0, 2);
  const resto = d.slice(2);
  if (resto.length <= 4) return `(${ddd}) ${resto}`;
  const corte = resto.length === 9 ? 5 : 4;
  return `(${ddd}) ${resto.slice(0, corte)}-${resto.slice(corte)}`;
}
function whatsappValido(v: string) {
  return digitosWhatsappValidos(v.replace(/\D/g, ""));
}

function fc(n: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
}
function esc(s: string) {
  return String(s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

type Cenario = { tom: "perigo" | "atencao" | "ok" | "melhor"; bt: string; tit: string; txt: string; ac: string[] };

const C: Record<number, Cenario> = {
  1: { tom: "perigo", bt: "Alerta Máximo", tit: "Seus compromissos são maiores do que o que você ganha", txt: "Antes mesmo de gastar um real com o dia a dia, o dinheiro que entra já acabou. É preciso agir agora.", ac: ["Mapeie todos os compromissos e identifique o que pode ser cortado ou renegociado imediatamente", "Priorize os essenciais: moradia, alimentação, saúde", "Busque formas de aumentar a renda enquanto corta compromissos"] },
  2: { tom: "perigo", bt: "Demanda Ação Urgente", tit: "O limite que sobra é muito pequeno para o seu grupo", txt: "Seus compromissos consomem quase tudo — o que sobra para o dia a dia é insuficiente para o tamanho da sua família.", ac: ["Revise os compromissos: algum pode ser cancelado ou renegociado?", "Separe os essenciais dos opcionais", "Trabalhe para aumentar a renda ou cortar compromissos antes de qualquer outra mudança"] },
  3: { tom: "atencao", bt: "Precisa de Ajuste", tit: "O limite existe, mas falta um pouco", txt: "Você está perto do ideal. Pequenos ajustes já resolveriam — não é necessário cortar tudo, só afinar.", ac: ["Experimente reduzir o gasto semanal em R$ 50 a R$ 200", "Revise os compromissos: algum pode ser ajustado?", "Faça o balanço semanal (15 min) para ver se ficou dentro do limite"] },
  4: { tom: "atencao", bt: "Precisa de Ajuste Significativo", tit: "O limite está insuficiente para o seu contexto", txt: "Falta mais do que pequenos ajustes. É preciso trabalhar nos dois lados ao mesmo tempo.", ac: ["Mapeie os compromissos e identifique o que pode ser cortado", "Reduza o gasto semanal de forma progressiva", "Revise parcelas e faturas — há algo que pode ser eliminado?"] },
  5: { tom: "ok", bt: "No Meio do Caminho", tit: "O limite está no ponto — mas dá para melhorar", txt: "Você não está em apuros, mas também não está sobrando. Uma pequena redução no gasto semanal já geraria sobra todo mês.", ac: ["Experimente reduzir o limite semanal em R$ 50 a R$ 100", "Faça o balanço semanal (15 min) para acompanhar de perto", "Se sobrar, comece uma reserva — mesmo que pequena"] },
  6: { tom: "melhor", bt: "Melhor dos Cenários", tit: "Sobra dinheiro — agora é hora de usar bem", txt: "Você tem uma margem boa. Esse é o momento certo para começar ou fortalecer uma reserva.", ac: ["Separe uma parte da sobra para uma reserva de emergência", "Se sentir que gasta demais, reduza o limite semanal progressivamente", "Com a reserva formada, você terá mais segurança para decisões maiores"] },
  7: { tom: "atencao", bt: "Atenção ao Cartão", tit: "As parcelas estão pressionando o seu orçamento", txt: "O volume de parcelas e recorrentes no cartão já é maior do que o seu maior compromisso mensal.", ac: ["Não faça novas parcelas por enquanto", "Aguarde as parcelas atuais encerrarem antes de assumir novos compromissos", "Acompanhe mês a mês a queda do volume de parcelas"] },
  8: { tom: "perigo", bt: "Ação Urgente", tit: "A fatura está maior do que todos os seus compromissos", txt: "Os gastos no cartão — fora as parcelas — estão muito acima do que o orçamento suporta.", ac: ["Projete quanto de parcela está embutida na fatura atual", "Revise os compromissos e ajuste o que for possível", "Ajuste os gastos diários com urgência — esse mês está comprometido"] },
};

// Parâmetro de limite semanal para 1 pessoa, por faixa de ganhos mensais (é referência, não limite).
// Faixas graduais (16/11/2026 11:54) aumentadas em 50% e regra 50/50 (opção b, aprovada às 12:07):
// metade do parâmetro é da casa (fixa) e metade se repete por pessoa. Assim, R$ 9 mil de ganhos e
// 3 pessoas têm referência de R$ 900 por semana, considerada adequada por Daniel (11:51).
const FAIXAS: [number, number][] = [
  [3000, 300],
  [6000, 375],
  [10000, 450],
  [15000, 600],
  [20000, 750],
  [30000, 975],
  [Infinity, 1275],
];
function referenciaDaCasa(ganhos: number, pessoas: number) {
  return parametroPorPessoa(ganhos) * (0.5 + 0.5 * pessoas);
}
function parametroPorPessoa(ganhos: number) {
  return (FAIXAS.find(([teto]) => ganhos <= teto) ?? FAIXAS[FAIXAS.length - 1])[1];
}

const AVISO_PDF =
  "Este resultado é uma estimativa feita a partir dos valores que você informou. Tem finalidade meramente educacional. Não constitui recomendação de investimento. Para uma análise pessoal e personalizada, solicite um atendimento.";

// Pedido de Daniel em 16/11/2026 12:09: deixar claro de onde vêm as recomendações de ajuste.
const AVISO_CENARIOS =
  "As recomendações de ajuste são baseadas na experiência de atendimento da Abacaxi e não representam, necessariamente, a sua realidade individual ou a da sua família.";

const NOMES_ETAPAS = ["", "Pessoas", "Recebimentos", "Compromissos", "Faturas", "Parcelas", "Anuais", "Resultado", "Seu momento"];
const TOTAL_ETAPAS = 8;

export default function Calculadora({ bookingUrl }: { bookingUrl: string }) {
  const [step, setStep] = useState(0);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [wpp, setWpp] = useState("");
  const [consent, setConsent] = useState(false);
  const [contato, setContato] = useState(false);
  const [isca, setIsca] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [adultos, setAdultos] = useState(1);
  const [criancas, setCriancas] = useState(0);
  const [recs, setRecs] = useState<Rec[]>([{ id: 1, desc: "", val: "" }]);
  const [comps, setComps] = useState<Comp[]>([{ id: 1, desc: "", val: "", dia: "" }]);
  const [fats, setFats] = useState<Fat[]>([{ id: 1, nome: "", val: "", venc: "" }]);
  const [pars, setPars] = useState<Par[]>([{ id: 1, desc: "", val: "", tipo: "parcelas", atual: "", total: "" }]);
  const [anus, setAnus] = useState<Anu[]>([{ id: 1, desc: "", val: "", ini: "1", fim: "12" }]);

  function ir(n: number) {
    setErro("");
    setStep(n);
    if (typeof window !== "undefined") {
      document.getElementById("calculadora")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function calcular() {
    const now = new Date(), ma = now.getMonth() + 1, mp = ma === 12 ? 1 : ma + 1;
    const tg = recs.reduce((s, r) => s + pc(r.val), 0);
    const tc = comps.reduce((s, c) => s + pc(c.val), 0);
    const tf = fats.reduce((s, f) => s + pc(f.val), 0);
    const tp = pars.reduce((s, p) => s + pc(p.val), 0);
    const anu = (m: number) =>
      anus.reduce((s, a) => {
        const i = parseInt(a.ini) || 0, f = parseInt(a.fim) || 0;
        if (!i || !f) return s;
        const meses = f >= i ? f - i + 1 : 12 - i + f + 1;
        const dentro = f >= i ? m >= i && m <= f : m >= i || m <= f; // período que vira o ano (ex.: novembro a fevereiro)
        return dentro ? s + pc(a.val) / meses : s;
      }, 0);
    const av = anu(ma), ap = anu(mp);
    const lmv = tg - tc - av - tf, lsv = lmv / 4.33;
    const lmp = tg - tc - ap - tp, lsp = lmp / 4.33;
    return { tg, tc, tf, tp, av, ap, lmv, lsv, lmp, lsp };
  }

  function cenario(c: ReturnType<typeof calcular>) {
    const { tg, tc, tp, tf, lsv } = c;
    const np = Math.max((adultos || 1) + (criancas || 0), 1);
    const lpp = lsv; // limite semanal da casa, comparado com a referência da casa (regra 50/50)
    const bm = referenciaDaCasa(tg, np);
    const mc = comps.length ? Math.max(...comps.map((x) => pc(x.val))) : 0;
    if (tc > tg) return 1;
    if (tf > tc && tf > 0) return 8;
    if (mc > 0 && tp > mc) return 7;
    if (lpp <= 0) return 2;
    if (lpp < bm * 0.25) return 2;
    if (lpp < bm * 0.75) return 4;
    if (lpp < bm) return 3;
    if (lpp < bm * 1.5) return 5;
    return 6;
  }

  async function acessar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    if (!nome.trim() || !email.trim()) return setErro("Preencha o nome e o e-mail.");
    if (!nomeValido(nome)) return setErro("Informe seu nome e sobrenome, só com letras.");
    if (email.trim().length > 254 || !EMAIL_VALIDO.test(email.trim())) return setErro("Confira o e-mail.");
    if (contato && !wpp.trim()) return setErro("Informe o WhatsApp ou desmarque a autorização de contato.");
    if (contato && !whatsappValido(wpp)) return setErro("Confira o WhatsApp, com DDD.");
    if (!consent) return setErro("Marque a caixa de consentimento para continuar.");
    setEnviando(true);
    try {
      const resposta = await fetch("/api/calculadora", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome.trim().replace(/\s+/g, " "), email: email.trim(), whatsapp: contato ? wpp.trim() : "", contatoWhatsapp: contato, consentimento: true, site: isca }),
      });
      // O Brevo recusou o número (16/11/2026 12:49): a pessoa corrige antes de seguir.
      if (resposta.status === 422) {
        const dados = await resposta.json().catch(() => ({}));
        if (dados.campo === "whatsapp") {
          setEnviando(false);
          return setErro("Confira o WhatsApp, com DDD.");
        }
      }
    } catch {
      // Falha de rede não impede o uso da calculadora.
    }
    setEnviando(false);
    ir(1);
  }

  function gerarPDF() {
    const c = calcular();
    const sc = C[cenario(c)];
    const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">
<title>Limite de Gastos — ${esc(nome)}</title>
<style>
body{font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:40px auto;color:#1A1A1A;font-size:14px}
.logo{width:150px;height:auto;margin-bottom:18px}
h1{color:#8500DB;font-size:20px;margin:0 0 3px}
.sub{color:#6B6475;font-size:12px;margin-bottom:22px}
h2{font-size:15px;color:#3D1A6E;border-bottom:2px solid #ECE4FA;padding-bottom:5px;margin:20px 0 10px}
.row{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #F4F0FB}
.total{font-weight:bold;border-top:2px solid #E3DCF2;border-bottom:none;padding-top:8px}
.hero{background:#8500DB;color:#fff;border-radius:10px;padding:18px;text-align:center;margin:16px 0;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.hero .big{font-size:30px;font-weight:800}
.hero .s{color:rgba(255,255,255,.85);font-size:12px;margin-top:4px}
.badge{display:inline-block;padding:3px 10px;border-radius:99px;font-size:11px;font-weight:700;background:#ECE4FA;color:#3D1A6E;margin-bottom:8px}
.box{background:#F4F0FB;border-radius:8px;padding:12px;margin-top:8px}
.box ul{padding-left:16px;margin:6px 0 0}
.box li{margin-bottom:5px}
.aviso{margin-top:28px;padding:12px 14px;background:#F4F0FB;border-radius:8px;font-size:12px;line-height:1.5;color:#3D1A6E;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.footer{margin-top:16px;padding-top:12px;border-top:1px solid #E3DCF2;font-size:11px;color:#6B6475;text-align:center}
</style></head><body>
<img class="logo" src="${location.origin}/logo-abacaxi-email.png" alt="Abacaxi">
<h1>Calculadora de Limite de Gastos</h1>
<div class="sub">Resultado para ${esc(nome)} · ${new Date().toLocaleDateString("pt-BR")}</div>
<div class="hero">
  <div class="s" style="margin:0 0 4px">Limite semanal — mês vigente</div>
  <div class="big">${fc(c.lsv)}</div>
  <div class="s">${fc(c.lmv)} por mês</div>
</div>
<h2>Resumo</h2>
<div class="row"><span>Ganhos</span><span>${fc(c.tg)}</span></div>
<div class="row"><span>− Compromissos</span><span>${fc(c.tc)}</span></div>
${c.av > 0 ? `<div class="row"><span>− Anuais (mês vigente)</span><span>${fc(c.av)}</span></div>` : ""}
<div class="row"><span>− Fatura do cartão</span><span>${fc(c.tf)}</span></div>
<div class="row total"><span>Limite mensal (mês vigente)</span><span>${fc(c.lmv)}</span></div>
${c.ap > 0 ? `<div class="row" style="margin-top:8px"><span>− Anuais (próximo mês)</span><span>${fc(c.ap)}</span></div>` : ""}
<div class="row"><span>− Parcelas e recorrentes</span><span>${fc(c.tp)}</span></div>
<div class="row total"><span>Limite mensal (próximo mês)</span><span>${fc(c.lmp)}</span></div>
<div class="row"><span>Limite semanal (mês vigente)</span><span><strong>${fc(c.lsv)}</strong></span></div>
<div class="row"><span>Limite semanal (próximo mês)</span><span><strong>${fc(c.lsp)}</strong></span></div>
<h2>Seu Momento</h2>
<span class="badge">${sc.bt}</span>
<p style="margin:6px 0 10px"><strong>${sc.tit}</strong></p>
<p style="color:#6B6475;margin-bottom:12px">${sc.txt}</p>
<div class="box"><strong style="font-size:12px;text-transform:uppercase;letter-spacing:.5px;color:#8500DB">O que fazer</strong><ul>${sc.ac.map((a) => `<li>${a}</li>`).join("")}</ul><p style="margin:10px 0 0;font-size:12px;color:#6B6475">${AVISO_CENARIOS}</p></div>
<div class="aviso">${AVISO_PDF}</div>
<div class="footer">Abacaxi Serviços Financeiros · abacaxi.cc</div>
</body></html>`;
    const w = window.open("", "_blank", "width=700,height=900");
    if (w) {
      w.document.write(html);
      w.document.close();
      setTimeout(() => w.print(), 600);
    }
  }

  const pct = step === 0 ? 0 : Math.round((step / TOTAL_ETAPAS) * 100);

  return (
    <div id="calculadora" className="calc">
      {step > 0 && (
        <div className="calc-progresso" aria-live="polite">
          <div className="calc-trilho"><div className="calc-preenchido" style={{ width: `${pct}%` }} /></div>
          <div className="calc-etapa">{NOMES_ETAPAS[step]} · Etapa {step} de {TOTAL_ETAPAS}</div>
        </div>
      )}

      {step === 0 && (
        <form className="calc-card" onSubmit={acessar} noValidate>
          <h2 className="calc-titulo">Vamos começar</h2>
          <p className="calc-desc">Preencha seus dados para acessar a calculadora. É rápido e gratuito.</p>
          <label className="calc-label" htmlFor="c-nome">Nome e sobrenome</label>
          <input className="calc-input" id="c-nome" autoComplete="name" maxLength={80} value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome e sobrenome" />
          <label className="calc-label" htmlFor="c-email">E-mail</label>
          <input className="calc-input" id="c-email" type="email" inputMode="email" autoComplete="email" maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" />
          <label className="calc-label" htmlFor="c-wpp">WhatsApp (opcional)</label>
          <input className="calc-input" id="c-wpp" type="tel" inputMode="tel" autoComplete="tel" maxLength={15} value={wpp} onChange={(e) => setWpp(mascaraWhatsapp(e.target.value))} placeholder="(62) 90000-0000" />
          <input type="text" name="site" tabIndex={-1} autoComplete="off" value={isca} onChange={(e) => setIsca(e.target.value)} className="calc-isca" aria-hidden="true" />
          <label className="calc-consent">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>
              Quero acessar a calculadora. Saiba como tratamos seus dados em nossa{" "}
              <a href="/privacidade" target="_blank" rel="noopener">Política de Privacidade</a>.
            </span>
          </label>
          <label className="calc-consent">
            <input type="checkbox" checked={contato} onChange={(e) => setContato(e.target.checked)} />
            <span>Aceito que a Abacaxi entre em contato comigo pelo WhatsApp. (opcional)</span>
          </label>
          {erro && <p className="calc-erro" role="alert">{erro}</p>}
          <button className="btn-primary calc-botao" type="submit" disabled={enviando}>
            {enviando ? "Abrindo…" : "Acessar a calculadora"}
          </button>
          <p className="calc-nota">Os valores que você preencher ficam só no seu navegador e não são enviados à Abacaxi.</p>
        </form>
      )}

      {step === 1 && (
        <div className="calc-card">
          <h2 className="calc-titulo">Quem depende dessa renda?</h2>
          <p className="calc-desc">Isso ajuda a calcular se o limite é suficiente para todo o seu grupo familiar.</p>
          <Contador rotulo="Adultos (incluindo você)" valor={adultos} min={1} singular="adulto" plural="adultos" onChange={setAdultos} />
          <Contador rotulo="Crianças" valor={criancas} min={0} singular="criança" plural="crianças" onChange={setCriancas} />
          <Avancar onClick={() => ir(2)} />
        </div>
      )}

      {step === 2 && (
        <div className="calc-card">
          <h2 className="calc-titulo">O que entra todo mês?</h2>
          <p className="calc-desc">Salário, freela, aluguel recebido, pensão — tudo que chega de forma regular.</p>
          {recs.map((r, i) => (
            <div className="calc-item" key={r.id}>
              <div className="calc-duas">
                <input className="calc-input" aria-label="Descrição" maxLength={MAX_DESC} value={r.desc} onChange={(e) => setRecs(atualiza(recs, i, { desc: e.target.value }))} placeholder="Ex.: Salário, Freela, Aluguel recebido…" />
                <input className="calc-input calc-valor" aria-label="Valor" inputMode="decimal" maxLength={12} value={r.val} onChange={(e) => setRecs(atualiza(recs, i, { val: mascaraValor(e.target.value) }))} placeholder="R$ 0,00" />
              </div>
              {recs.length > 1 && <Remover onClick={() => setRecs(recs.filter((_, j) => j !== i))} />}
            </div>
          ))}
          <button type="button" className="calc-add" onClick={() => setRecs([...recs, { id: uid(), desc: "", val: "" }])}>+ Adicionar</button>
          <Total valor={recs.reduce((s, r) => s + pc(r.val), 0)} rotulo="Total" />
          <Avancar onClick={() => ir(3)} />
        </div>
      )}

      {step === 3 && (
        <div className="calc-card">
          <h2 className="calc-titulo">O que é fixo e tem data?</h2>
          <p className="calc-desc">Aluguel, financiamento, escola, plano de saúde, academia… Só conta o que tem um dia certo pra sair todo mês.</p>
          {comps.map((c, i) => (
            <div className="calc-item" key={c.id}>
              <input className="calc-input" aria-label="Descrição" maxLength={MAX_DESC} value={c.desc} onChange={(e) => setComps(atualiza(comps, i, { desc: e.target.value }))} placeholder="Ex.: Aluguel, Escola, Plano de saúde, Financiamento…" />
              <div className="calc-duas calc-mt">
                <input className="calc-input" aria-label="Valor" inputMode="decimal" maxLength={12} value={c.val} onChange={(e) => setComps(atualiza(comps, i, { val: mascaraValor(e.target.value) }))} placeholder="R$ 0,00" />
                <input className="calc-input calc-dia" aria-label="Dia" inputMode="numeric" maxLength={2} value={c.dia} onChange={(e) => setComps(atualiza(comps, i, { dia: mascaraDia(e.target.value, c.dia) }))} placeholder="Dia" />
              </div>
              {comps.length > 1 && <Remover onClick={() => setComps(comps.filter((_, j) => j !== i))} />}
            </div>
          ))}
          <button type="button" className="calc-add" onClick={() => setComps([...comps, { id: uid(), desc: "", val: "", dia: "" }])}>+ Adicionar compromisso</button>
          <Total valor={comps.reduce((s, c) => s + pc(c.val), 0)} rotulo="Total" />
          <Avancar onClick={() => ir(4)} />
        </div>
      )}

      {step === 4 && (
        <div className="calc-card">
          <h2 className="calc-titulo">Quanto está nas faturas?</h2>
          <p className="calc-desc">O valor total da fatura <strong>deste mês</strong> de cada cartão — o que aparece para pagar agora.</p>
          {fats.map((f, i) => (
            <div className="calc-item" key={f.id}>
              <input className="calc-input" aria-label="Nome do cartão" maxLength={MAX_DESC} value={f.nome} onChange={(e) => setFats(atualiza(fats, i, { nome: e.target.value }))} placeholder="Nome do cartão" />
              <div className="calc-duas calc-mt">
                <input className="calc-input" aria-label="Valor da fatura" inputMode="decimal" maxLength={12} value={f.val} onChange={(e) => setFats(atualiza(fats, i, { val: mascaraValor(e.target.value) }))} placeholder="Valor da fatura" />
                <input className="calc-input calc-dia" aria-label="Dia do vencimento" inputMode="numeric" maxLength={2} value={f.venc} onChange={(e) => setFats(atualiza(fats, i, { venc: mascaraDia(e.target.value, f.venc) }))} placeholder="Dia venc." />
              </div>
              {fats.length > 1 && <Remover onClick={() => setFats(fats.filter((_, j) => j !== i))} />}
            </div>
          ))}
          <button type="button" className="calc-add" onClick={() => setFats([...fats, { id: uid(), nome: "", val: "", venc: "" }])}>+ Adicionar cartão</button>
          <Total valor={fats.reduce((s, f) => s + pc(f.val), 0)} rotulo="Total faturas" />
          <Avancar onClick={() => ir(5)} />
          <button type="button" className="btn-secondary calc-botao" onClick={() => { setFats([{ id: uid(), nome: "", val: "", venc: "" }]); ir(5); }}>Não tenho cartão de crédito</button>
        </div>
      )}

      {step === 5 && (
        <div className="calc-card">
          <h2 className="calc-titulo">O que o cartão já comprometeu?</h2>
          <p className="calc-desc">Parcelas em andamento e assinaturas recorrentes — o que já está comprometido, independente do valor da fatura.</p>
          {pars.map((p, i) => (
            <div className="calc-item" key={p.id}>
              <input className="calc-input" aria-label="Descrição" maxLength={MAX_DESC} value={p.desc} onChange={(e) => setPars(atualiza(pars, i, { desc: e.target.value }))} placeholder="Ex.: Notebook, Curso online, Netflix…" />
              <div className="calc-duas calc-mt">
                <input className="calc-input" aria-label="Valor mensal" inputMode="decimal" maxLength={12} value={p.val} onChange={(e) => setPars(atualiza(pars, i, { val: mascaraValor(e.target.value) }))} placeholder="Valor mensal" />
                <select className="calc-input calc-tipo" aria-label="Tipo" value={p.tipo} onChange={(e) => setPars(atualiza(pars, i, { tipo: e.target.value as Par["tipo"] }))}>
                  <option value="parcelas">Parcelado</option>
                  <option value="recorrente">Recorrente</option>
                </select>
              </div>
              {p.tipo === "parcelas" && (
                <div className="calc-iguais calc-mt">
                  <input className="calc-input" aria-label="Parcela atual" inputMode="numeric" maxLength={3} value={p.atual} onChange={(e) => setPars(atualiza(pars, i, { atual: mascaraParcela(e.target.value, p.atual) }))} placeholder="Parcela atual (ex: 3)" />
                  <input className="calc-input" aria-label="Total de parcelas" inputMode="numeric" maxLength={3} value={p.total} onChange={(e) => setPars(atualiza(pars, i, { total: mascaraParcela(e.target.value, p.total) }))} placeholder="Total (ex: 10)" />
                </div>
              )}
              {pars.length > 1 && <Remover onClick={() => setPars(pars.filter((_, j) => j !== i))} />}
            </div>
          ))}
          <button type="button" className="calc-add" onClick={() => setPars([...pars, { id: uid(), desc: "", val: "", tipo: "parcelas", atual: "", total: "" }])}>+ Adicionar parcela ou recorrente</button>
          <Total valor={pars.reduce((s, p) => s + pc(p.val), 0)} rotulo="Total mensal" />
          {erro && <p className="calc-erro" role="alert">{erro}</p>}
          <Avancar
            onClick={() => {
              const errada = pars.some((p) => p.tipo === "parcelas" && p.atual && p.total && Number(p.atual) > Number(p.total));
              if (errada) return setErro("A parcela atual não pode ser maior que o total de parcelas.");
              ir(6);
            }}
          />
          <button type="button" className="btn-secondary calc-botao" onClick={() => { setPars([{ id: uid(), desc: "", val: "", tipo: "parcelas", atual: "", total: "" }]); ir(6); }}>Não tenho parcelas nem recorrentes</button>
        </div>
      )}

      {step === 6 && (
        <div className="calc-card">
          <h2 className="calc-titulo">Tem algum gasto anual?</h2>
          <p className="calc-desc">IPTU, IPVA, seguro, matrícula… Coloque o valor total e o período em que ele acontece.</p>
          {anus.map((a, i) => (
            <div className="calc-item" key={a.id}>
              <input className="calc-input" aria-label="Descrição" maxLength={MAX_DESC} value={a.desc} onChange={(e) => setAnus(atualiza(anus, i, { desc: e.target.value }))} placeholder="Ex.: IPTU, IPVA, Matrícula, Seguro…" />
              <input className="calc-input calc-mt" aria-label="Valor total" inputMode="decimal" maxLength={12} value={a.val} onChange={(e) => setAnus(atualiza(anus, i, { val: mascaraValor(e.target.value) }))} placeholder="Valor total" />
              <div className="calc-iguais calc-mt">
                <label className="calc-mini">Começa em
                  <select className="calc-input" value={a.ini} onChange={(e) => setAnus(atualiza(anus, i, { ini: e.target.value }))}>
                    {MESES.map((m, mi) => <option key={m} value={String(mi + 1)}>{m}</option>)}
                  </select>
                </label>
                <label className="calc-mini">Termina em
                  <select className="calc-input" value={a.fim} onChange={(e) => setAnus(atualiza(anus, i, { fim: e.target.value }))}>
                    {MESES.map((m, mi) => <option key={m} value={String(mi + 1)}>{m}</option>)}
                  </select>
                </label>
              </div>
              {anus.length > 1 && <Remover onClick={() => setAnus(anus.filter((_, j) => j !== i))} />}
            </div>
          ))}
          <button type="button" className="calc-add" onClick={() => setAnus([...anus, { id: uid(), desc: "", val: "", ini: "1", fim: "12" }])}>+ Adicionar valor anual</button>
          <button type="button" className="btn-primary calc-botao" onClick={() => ir(7)} data-umami-event="calculadora-calcular">Calcular</button>
          <button type="button" className="btn-secondary calc-botao" onClick={() => { setAnus([{ id: uid(), desc: "", val: "", ini: "1", fim: "12" }]); ir(7); }}>Não tenho gastos anuais</button>
        </div>
      )}

      {step === 7 && <Resultado c={calcular()} onNext={() => ir(8)} onBack={() => ir(6)} />}

      {step === 8 && (() => {
        const c = calcular();
        const sc = C[cenario(c)];
        return (
          <div className="calc-card">
            <span className={`calc-selo calc-selo--${sc.tom}`}>{sc.bt}</span>
            <h2 className="calc-titulo calc-titulo--cenario">{sc.tit}</h2>
            <p className="calc-texto">{sc.txt}</p>
            <div className="calc-fazer">
              <h3>O que fazer</h3>
              <ul>{sc.ac.map((a) => <li key={a}>{a}</li>)}</ul>
              <p className="calc-aviso-cenario">{AVISO_CENARIOS}</p>
            </div>
            <div className="calc-resumo">
              <div><span>Limite semanal — mês vigente</span><strong>{fc(c.lsv)}</strong></div>
              <div><span>Limite semanal — próximo mês</span><strong>{fc(c.lsp)}</strong></div>
            </div>
            <div className="calc-cta">
              <p>&ldquo;Se quiser fazer essa conta com alguém ao lado, ou se os seus números caíram num dos cenários mais difíceis, a gente pode conversar.&rdquo;</p>
              <a href={bookingUrl} className="btn-primary" data-umami-event="calculadora-agendar" target="_blank" rel="noopener noreferrer">Agendar conversa com a Abacaxi</a>
            </div>
            <button type="button" className="btn-secondary calc-botao" onClick={gerarPDF}>Salvar resultado em PDF</button>
            <button type="button" className="calc-voltar" onClick={() => ir(7)}>← Voltar ao resultado</button>
          </div>
        );
      })()}

      {step > 0 && step < 7 && step !== 1 && (
        <button type="button" className="calc-voltar" onClick={() => ir(step - 1)}>← Voltar</button>
      )}
    </div>
  );
}

function atualiza<T>(lista: T[], i: number, mudanca: Partial<T>): T[] {
  return lista.map((item, j) => (j === i ? { ...item, ...mudanca } : item));
}

function Contador({ rotulo, valor, min, singular, plural, onChange }: { rotulo: string; valor: number; min: number; singular: string; plural: string; onChange: (n: number) => void }) {
  return (
    <div className="calc-contador-bloco">
      <span className="calc-label">{rotulo}</span>
      <div className="calc-contador">
        <button type="button" aria-label={`Diminuir ${rotulo}`} onClick={() => valor > min && onChange(valor - 1)}>−</button>
        <span className="calc-contador-valor">{valor}</span>
        <span className="calc-contador-rotulo">{valor !== 1 ? plural : singular}</span>
        <button type="button" aria-label={`Aumentar ${rotulo}`} onClick={() => onChange(valor + 1)}>+</button>
      </div>
    </div>
  );
}

function Avancar({ onClick }: { onClick: () => void }) {
  return <button type="button" className="btn-primary calc-botao" onClick={onClick}>Próximo</button>;
}

function Remover({ onClick }: { onClick: () => void }) {
  return <button type="button" className="calc-remover" onClick={onClick}>remover</button>;
}

function Total({ valor, rotulo }: { valor: number; rotulo: string }) {
  return valor > 0 ? <div className="calc-total">{rotulo}: {fc(valor)}</div> : null;
}

function Resultado({ c, onNext, onBack }: { c: { tg: number; tc: number; tf: number; tp: number; av: number; ap: number; lmv: number; lsv: number; lmp: number; lsp: number }; onNext: () => void; onBack: () => void }) {
  const vn = c.lmv < 0, pn = c.lmp < 0;
  return (
    <div className="calc-card">
      <h2 className="calc-titulo">Seu Limite de Gastos</h2>
      <p className="calc-desc">O quanto sobra para o dia a dia — de forma sustentável.</p>
      <div className="calc-res-grade">
        <div className="calc-res calc-res--vigente">
          <div className="calc-res-rotulo">Mês vigente</div>
          <div className={`calc-res-valor${vn ? " calc-neg-claro" : ""}`}>{fc(c.lsv)}</div>
          <div className="calc-res-sub">por semana</div>
          <div className="calc-res-sub">{fc(c.lmv)} / mês</div>
        </div>
        <div className="calc-res calc-res--proximo">
          <div className="calc-res-rotulo">Próximo mês</div>
          <div className={`calc-res-valor${pn ? " calc-neg" : ""}`}>{fc(c.lsp)}</div>
          <div className="calc-res-sub">por semana</div>
          <div className="calc-res-sub">{fc(c.lmp)} / mês</div>
        </div>
      </div>
      <div className="calc-detalhe">
        <div><span>Ganhos</span><span>{fc(c.tg)}</span></div>
        <div><span>− Compromissos</span><span>{fc(c.tc)}</span></div>
        {c.av > 0 && <div><span>− Anuais (mês vigente)</span><span>{fc(c.av)}</span></div>}
        <div><span>− Fatura do cartão</span><span>{fc(c.tf)}</span></div>
        <div className={`calc-detalhe-total${vn ? " calc-neg" : ""}`}><span>= Limite mensal (mês vigente)</span><span>{fc(c.lmv)}</span></div>
        {c.ap > 0 && <div><span>Anuais (próximo mês)</span><span>{fc(c.ap)}</span></div>}
        <div className={pn ? "calc-neg" : ""}><span>− Parcelas e recorrentes</span><span>{fc(c.tp)}</span></div>
        <div className={`calc-detalhe-total${pn ? " calc-neg" : ""}`}><span>= Limite mensal (próximo mês)</span><span>{fc(c.lmp)}</span></div>
      </div>
      <button type="button" className="btn-primary calc-botao" onClick={onNext}>Ver meu momento</button>
      <button type="button" className="btn-secondary calc-botao" onClick={onBack}>Revisar dados</button>
    </div>
  );
}
