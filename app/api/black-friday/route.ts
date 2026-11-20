import { NextResponse } from "next/server";
import { digitosWhatsappValidos } from "../../../components/calculadora/whatsapp";
import { AGENDA_ENCONTRO_URL, CAMPANHA, PACOTES, estadoCampanha, reais } from "../../../content/campanha";

// Cadastro da compra direta da campanha Black Friday + 13º 2026 (/black-friday-2026).
// Fluxo aprovado: pacote → formulário → aceite do termo → link de pagamento → agendamento do primeiro encontro.
// Cada cadastro entra no Funil de Vendas com o campo Campanha preenchido, aguardando o pagamento.
// O horário vale pelo servidor: antes de 24/11 00h00 e depois de 04/12 23h59 o cadastro é recusado.

const TABLE_ID = "tblPq18e4r0Da3V5v"; // Funil de Vendas (base Abacaxi)

type Corpo = {
  pacote?: string;
  nome?: string;
  email?: string;
  whatsapp?: string;
  termo?: boolean;
  consentimento?: boolean;
  site?: string; // campo-isca
};

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NOME_VALIDO = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

function nomeValido(n: string) {
  if (n.length < 2 || n.length > 80 || !NOME_VALIDO.test(n)) return false;
  const partes = n.split(" ");
  return partes.length >= 2 && partes[0].replace(/['-]/g, "").length >= 2 && partes[partes.length - 1].replace(/['-]/g, "").length >= 2;
}

function normalizarWhatsapp(bruto: string): string | null {
  let d = bruto.replace(/\D/g, "");
  if (d.startsWith("55") && (d.length === 12 || d.length === 13)) d = d.slice(2);
  if (!digitosWhatsappValidos(d)) return null;
  return `+55${d}`;
}

// Data de hoje em Brasília, no formato AAAA-MM-DD.
function hojeBrasilia() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());
}

function dataBR(iso: string) {
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}

export async function POST(request: Request) {
  let body: Corpo;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo inválido." }, { status: 400 });
  }

  if (body.site) return NextResponse.json({ ok: true, linkPagamento: "", agenda: "" });

  // Fora da produção (prévia da Vercel ou local), o período não é conferido e o registro sai marcado [TESTE].
  const teste = process.env.VERCEL_ENV !== "production";
  const estado = teste ? "aberta" : estadoCampanha();
  if (estado === "antes") return NextResponse.json({ error: "A campanha abre em 24/11, às 00h." }, { status: 403 });
  if (estado === "encerrada") return NextResponse.json({ error: "A campanha foi encerrada." }, { status: 410 });

  const pacote = PACOTES.find((p) => p.id === body.pacote);
  const nome = body.nome?.trim().replace(/\s+/g, " ") ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const whatsapp = normalizarWhatsapp(body.whatsapp ?? "");

  if (!pacote) return NextResponse.json({ error: "Escolha um pacote." }, { status: 400 });
  if (!nomeValido(nome)) return NextResponse.json({ error: "Informe nome e sobrenome." }, { status: 400 });
  if (email.length > 254 || !EMAIL_VALIDO.test(email)) return NextResponse.json({ error: "Confira o e-mail." }, { status: 400 });
  if (!whatsapp) return NextResponse.json({ error: "Confira o WhatsApp, com DDD." }, { status: 400 });
  if (body.termo !== true) return NextResponse.json({ error: "É preciso aceitar o termo." }, { status: 400 });
  if (body.consentimento !== true) return NextResponse.json({ error: "Consentimento obrigatório." }, { status: 400 });

  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!token || !baseId) {
    console.error("AIRTABLE_TOKEN ou AIRTABLE_BASE_ID não configurados.");
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  // Prazo do pagamento: quem se cadastra no último dia paga até seg 07/12; os demais, no mesmo dia.
  const hoje = hojeBrasilia();
  const prazo = hoje === CAMPANHA.ultimoDia ? CAMPANHA.prazoPagamentoUltimoDia : hoje;
  const rotuloPacote = pacote.encontros === 1 ? "1 encontro" : `${pacote.encontros} encontros`;

  const fields: Record<string, unknown> = {
    "Nome do Lead": `${teste ? "[TESTE] " : ""}${nome} — Black Friday (${rotuloPacote})`,
    Origem: "Site",
    Fase: "Fechamento",
    Status: "Qualificado",
    Temperatura: "Quente",
    "Serviço de Interesse": "Encontros Individuais",
    "Valor Estimado": pacote.precoCampanha,
    Campanha: CAMPANHA.nome,
    "Data de Fechamento Esperada": prazo,
    "Próxima Ação": `${email} — ${whatsapp} — ${rotuloPacote} por ${reais(pacote.precoCampanha)} — aguardando pagamento (prazo ${dataBR(prazo)})`,
  };

  try {
    const res = await fetch(`https://api.airtable.com/v0/${baseId}/${TABLE_ID}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ fields, typecast: true }),
    });
    if (!res.ok) {
      console.error("Erro do Airtable (black-friday):", res.status, await res.text());
      return NextResponse.json({ error: "Não foi possível registrar agora." }, { status: 502 });
    }
  } catch (erro) {
    console.error("Falha ao chamar o Airtable (black-friday):", erro);
    return NextResponse.json({ error: "Não foi possível registrar agora." }, { status: 502 });
  }

  // O prazo só aparece para quem se cadastra no último dia (paga até seg 07/12).
  const prazoVisivel = hoje === CAMPANHA.ultimoDia ? dataBR(prazo) : "";
  return NextResponse.json({ ok: true, linkPagamento: pacote.linkPagamento, agenda: AGENDA_ENCONTRO_URL, prazo: prazoVisivel });
}
