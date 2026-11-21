// Funções de servidor da compra da campanha: Iugu (faturas), Airtable (Funil de Vendas) e Brevo (lista de compradores).
// Só para uso nas rotas de /api. As chaves ficam nas variáveis de ambiente do Vercel, nunca no código.

const IUGU_API = "https://api.iugu.com/v1";
export const FUNIL_TABLE_ID = "tblPq18e4r0Da3V5v"; // Funil de Vendas (base Abacaxi)

// Identifica as faturas desta campanha (custom_variables), para o aviso de pagamento ignorar as dos outros clientes.
export const MARCA_CAMPANHA = "black-friday-2026";

function cabecalhoIugu(token: string) {
  // Autenticação da Iugu: Basic, com o token como usuário e senha vazia (dev.iugu.com/reference/authentication).
  return { Authorization: `Basic ${Buffer.from(`${token}:`).toString("base64")}`, "Content-Type": "application/json" };
}

export type FaturaIugu = {
  id: string;
  secure_url: string;
  status: string;
  custom_variables?: { name: string; value: string }[];
};

export async function criarFatura(token: string, corpo: Record<string, unknown>) {
  const res = await fetch(`${IUGU_API}/invoices`, { method: "POST", headers: cabecalhoIugu(token), body: JSON.stringify(corpo) });
  const dados = (await res.json().catch(() => ({}))) as FaturaIugu & { errors?: unknown };
  return { ok: res.ok && !!dados.secure_url, status: res.status, dados };
}

export async function buscarFatura(token: string, id: string) {
  const res = await fetch(`${IUGU_API}/invoices/${encodeURIComponent(id)}`, { headers: cabecalhoIugu(token) });
  if (!res.ok) return null;
  return (await res.json()) as FaturaIugu;
}

export function variavel(fatura: FaturaIugu, nome: string) {
  return fatura.custom_variables?.find((v) => v.name === nome)?.value ?? "";
}

export async function airtable(metodo: "POST" | "PATCH" | "GET", caminho: string, corpo?: unknown) {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!token || !baseId) throw new Error("AIRTABLE_TOKEN ou AIRTABLE_BASE_ID não configurados.");
  return fetch(`https://api.airtable.com/v0/${baseId}/${caminho}`, {
    method: metodo,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: corpo === undefined ? undefined : JSON.stringify(corpo),
  });
}

// Coloca quem pagou na lista de compradores do Brevo. A automação dessa lista manda o e-mail com o link da agenda,
// e a lista serve para tirar quem já comprou do e-mail de último dia (sex 04/12).
export async function adicionarCompradorBrevo(email: string, nome: string) {
  const chave = process.env.BREVO_API_KEY;
  const listaId = Number(process.env.BREVO_LIST_ID_COMPRADORES_BF);
  if (!chave || !Number.isInteger(listaId) || listaId <= 0) {
    console.error("BREVO_API_KEY ou BREVO_LIST_ID_COMPRADORES_BF não configurados.");
    return false;
  }
  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "api-key": chave, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, listIds: [listaId], updateEnabled: true, attributes: { NOME: nome } }),
  });
  if (!res.ok) console.error("Brevo recusou o comprador da campanha:", res.status, await res.text());
  return res.ok;
}
