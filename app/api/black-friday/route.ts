import { NextResponse } from "next/server";
import { digitosWhatsappValidos } from "../../../components/calculadora/whatsapp";
import { cpfValido, digitosCpf } from "../../../components/campanha/cpf";
import { FUNIL_TABLE_ID, MARCA_CAMPANHA, airtable, criarFatura } from "../../../components/campanha/servidor";
import { CAMPANHA, PACOTES, PAGAMENTO, estadoCampanha, reais } from "../../../content/campanha";

// Cadastro da compra direta da campanha Black Friday 2026 (/black-friday-2026).
// Fluxo: pacote → formulário (com CPF) → aceite do termo → fatura da Iugu (Pix ou cartão em até 3x) → página da agenda.
// Cada cadastro entra no Funil de Vendas com o campo Campanha preenchido, aguardando o pagamento; o aviso de
// pagamento da Iugu (/api/iugu/fatura) marca o registro como Ganho.
// O horário vale pelo servidor: antes de 24/11 00h00 e depois de 04/12 23h59 o cadastro é recusado.

type Corpo = {
  pacote?: string;
  nome?: string;
  email?: string;
  whatsapp?: string;
  cpf?: string;
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

  if (body.site) return NextResponse.json({ ok: true, url: "" });

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
  if (!cpfValido(body.cpf ?? "")) return NextResponse.json({ error: "Confira o CPF." }, { status: 400 });
  if (body.termo !== true) return NextResponse.json({ error: "É preciso aceitar o termo." }, { status: 400 });
  if (body.consentimento !== true) return NextResponse.json({ error: "Consentimento obrigatório." }, { status: 400 });

  const iuguToken = process.env.IUGU_API_TOKEN;
  if (!iuguToken) {
    console.error("IUGU_API_TOKEN não configurado.");
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  // Prazo do pagamento: quem se cadastra no último dia paga até seg 07/12; os demais, no mesmo dia.
  const hoje = hojeBrasilia();
  const prazo = hoje === CAMPANHA.ultimoDia ? CAMPANHA.prazoPagamentoUltimoDia : hoje;
  const rotuloPacote = pacote.encontros === 1 ? "1 encontro" : `${pacote.encontros} encontros`;
  const aguardando = `${email} — ${whatsapp} — ${rotuloPacote} por ${reais(pacote.precoCampanha)} — aguardando pagamento (prazo ${dataBR(prazo)})`;

  // 1. Registro no Funil de Vendas.
  let registroId = "";
  try {
    const res = await airtable("POST", FUNIL_TABLE_ID, {
      typecast: true,
      fields: {
        "Nome do Lead": `${teste ? "[TESTE] " : ""}${nome} — Black Friday (${rotuloPacote})`,
        Origem: "Site",
        Fase: "Fechamento",
        Status: "Qualificado",
        Temperatura: "Quente",
        "Serviço de Interesse": "Encontros Individuais",
        "Valor Estimado": pacote.precoCampanha,
        Campanha: CAMPANHA.nome,
        "Data de Fechamento Esperada": prazo,
        "Próxima Ação": aguardando,
      },
    });
    if (!res.ok) {
      console.error("Erro do Airtable (black-friday):", res.status, await res.text());
      return NextResponse.json({ error: "Não foi possível registrar agora." }, { status: 502 });
    }
    registroId = ((await res.json()) as { id: string }).id;
  } catch (erro) {
    console.error("Falha ao chamar o Airtable (black-friday):", erro);
    return NextResponse.json({ error: "Não foi possível registrar agora." }, { status: 502 });
  }

  // 2. Fatura na Iugu. Os endereços de retorno usam o próprio site (abacaxi.cc na produção; a prévia, nos testes).
  const site = process.env.VERCEL_ENV === "production" ? "https://abacaxi.cc" : new URL(request.url).origin;
  const digitosWpp = whatsapp.slice(3); // +55DD...
  const fatura = await criarFatura(iuguToken, {
    email,
    due_date: prazo,
    items: [
      {
        description: `${pacote.encontros === 1 ? "1 Encontro Individual" : `${pacote.encontros} Encontros Individuais`} - ${CAMPANHA.nomePublico}`, // hífen: o travessão saiu como "?" na fatura (20/11/2026)
        quantity: 1,
        price_cents: pacote.precoCampanha * 100,
      },
    ],
    payable_with: PAGAMENTO.formas,
    max_installments_value: PAGAMENTO.maxParcelas,
    payer: { cpf_cnpj: digitosCpf(body.cpf ?? ""), name: nome, email, phone_prefix: digitosWpp.slice(0, 2), phone: digitosWpp.slice(2) },
    return_url: `${site}${PAGAMENTO.paginaAgendar}`,
    expired_url: `${site}${CAMPANHA.caminho}`,
    notification_url: `${site}/api/iugu/fatura`,
    custom_variables: [
      { name: "campanha", value: MARCA_CAMPANHA },
      { name: "registro_funil", value: registroId },
    ],
  }).catch((erro) => {
    console.error("Falha ao chamar a Iugu (black-friday):", erro);
    return null;
  });

  if (!fatura?.ok) {
    if (fatura) console.error("Erro da Iugu (black-friday):", fatura.status, JSON.stringify(fatura.dados.errors ?? fatura.dados));
    await airtable("PATCH", `${FUNIL_TABLE_ID}/${registroId}`, {
      fields: { "Próxima Ação": `${aguardando} — fatura da Iugu NÃO criada (erro no site)` },
    }).catch(() => {});
    return NextResponse.json({ error: "Não foi possível abrir o pagamento agora. Tente de novo em instantes." }, { status: 502 });
  }

  // 3. Liga a fatura ao registro do Funil.
  await airtable("PATCH", `${FUNIL_TABLE_ID}/${registroId}`, {
    fields: { "Próxima Ação": `${aguardando} — fatura Iugu ${fatura.dados.id} — ${fatura.dados.secure_url}` },
  }).catch((erro) => console.error("Falha ao ligar a fatura ao Funil:", erro));

  return NextResponse.json({ ok: true, url: fatura.dados.secure_url });
}
