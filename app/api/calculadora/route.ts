import { NextResponse } from "next/server";

// Cadastro de quem acessa a Calculadora de Limite de Gastos (/calculadora) na lista própria do Brevo.
// Decisões da conversa Conteúdo (turnos 26 a 30) e assumidas pela conversa Site em 15/11/2026:
// lista separada, nome + e-mail + WhatsApp, envio por função no servidor (a chave do Brevo não vai
// para o navegador). Os valores preenchidos na calculadora NÃO passam por aqui: ficam só no navegador.
//
// Variáveis de ambiente (Vercel):
//   BREVO_API_KEY            chave de API do Brevo
//   BREVO_LIST_ID_CALCULADORA ID numérico da lista "Lead Magnet — Calculadora Limite de Gastos"

type Corpo = {
  nome?: string;
  email?: string;
  whatsapp?: string;
  consentimento?: boolean;
  contatoWhatsapp?: boolean; // segunda caixa: aceita contato pelo WhatsApp
  site?: string; // campo-isca: pessoas não veem; robôs costumam preencher
};

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Nome e sobrenome (16/11/2026 12:21): só letras, espaço, apóstrofo e hífen; 2 a 80 caracteres; duas palavras ou mais.
const NOME_VALIDO = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

function nomeValido(n: string) {
  if (n.length < 2 || n.length > 80 || !NOME_VALIDO.test(n)) return false;
  const partes = n.split(" ");
  return partes.length >= 2 && partes[0].replace(/['-]/g, "").length >= 2 && partes[partes.length - 1].replace(/['-]/g, "").length >= 2;
}

// Celular ou fixo brasileiro com DDD (10 ou 11 dígitos), com ou sem +55. Formato aceito pelo Brevo: +55DDDNÚMERO.
function normalizarWhatsapp(bruto: string): string | null {
  let d = bruto.replace(/\D/g, "");
  if (d.startsWith("55") && (d.length === 12 || d.length === 13)) d = d.slice(2);
  if ((d.length !== 10 && d.length !== 11) || d[0] === "0") return null;
  return `+55${d}`;
}

async function enviarAoBrevo(chave: string, corpo: Record<string, unknown>) {
  return fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "api-key": chave, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(corpo),
  });
}

export async function POST(request: Request) {
  let body: Corpo;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo inválido." }, { status: 400 });
  }

  // Robô: responde como se tivesse dado certo e não grava nada.
  if (body.site) return NextResponse.json({ ok: true });

  const nome = body.nome?.trim().replace(/\s+/g, " ") ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  if (!nomeValido(nome) || email.length > 254 || !EMAIL_VALIDO.test(email)) {
    return NextResponse.json({ error: "Nome e sobrenome e e-mail válidos são obrigatórios." }, { status: 400 });
  }
  if (body.consentimento !== true) {
    return NextResponse.json({ error: "Consentimento obrigatório." }, { status: 400 });
  }

  // Com a autorização marcada, o número precisa ser válido (16/11/2026 12:21): recusa em vez de descartar sem avisar.
  const whatsapp = body.contatoWhatsapp === true ? normalizarWhatsapp(body.whatsapp ?? "") : null;
  if (body.contatoWhatsapp === true && !whatsapp) {
    return NextResponse.json({ error: "WhatsApp inválido." }, { status: 400 });
  }

  const chave = process.env.BREVO_API_KEY;
  const listaId = Number(process.env.BREVO_LIST_ID_CALCULADORA);
  if (!chave || !Number.isInteger(listaId) || listaId <= 0) {
    console.error("BREVO_API_KEY ou BREVO_LIST_ID_CALCULADORA não configurados.");
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  // O número só é guardado com a autorização de contato (segunda caixa, 16/11/2026): ter WHATSAPP
  // na lista da calculadora indica que a pessoa aceitou o contato.
  const atributos: Record<string, unknown> = { NOME: nome, OPT_IN: true };
  if (whatsapp) atributos.WHATSAPP = whatsapp;

  const base = { email, listIds: [listaId], updateEnabled: true };

  try {
    let resposta = await enviarAoBrevo(chave, { ...base, attributes: atributos });

    // O Brevo recusa um WhatsApp já usado por outro contato; nesse caso, grava sem ele.
    if (resposta.status === 400 && whatsapp) {
      const { WHATSAPP: _descartado, ...semWhatsapp } = atributos;
      void _descartado;
      resposta = await enviarAoBrevo(chave, { ...base, attributes: semWhatsapp });
    }

    if (!resposta.ok) {
      console.error("Brevo recusou o contato da calculadora:", resposta.status, await resposta.text());
      return NextResponse.json({ error: "Não foi possível registrar agora." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (erro) {
    console.error("Falha ao falar com o Brevo:", erro);
    return NextResponse.json({ error: "Não foi possível registrar agora." }, { status: 502 });
  }
}
