import { NextResponse } from "next/server";

// Tabela "Funil de Vendas" na base "Abacaxi".
const TABLE_ID = "tblPq18e4r0Da3V5v";

type ContatoBody = {
  nome?: string;
  empresa?: string;
  email?: string;
  mensagem?: string;
  servico?: string;
};

export async function POST(request: Request) {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) {
    console.error("AIRTABLE_TOKEN ou AIRTABLE_BASE_ID não configurados.");
    return NextResponse.json(
      { error: "Configuração do servidor incompleta." },
      { status: 500 }
    );
  }

  let body: ContatoBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo inválido." }, { status: 400 });
  }

  const nome = body.nome?.trim();
  const email = body.email?.trim();
  const mensagem = body.mensagem?.trim();
  const empresa = body.empresa?.trim();
  const servico = body.servico?.trim();

  if (!nome || !email || !mensagem) {
    return NextResponse.json(
      { error: "Nome, e-mail e mensagem são obrigatórios." },
      { status: 400 }
    );
  }

  // Não existem campos próprios de e-mail/mensagem no Funil de Vendas,
  // então concatenamos em "Próxima Ação".
  const fields: Record<string, string> = {
    "Nome do Lead": empresa ? `${nome} — ${empresa}` : nome,
    Gatilho: "Site",
    Fase: "Novos",
    Status: "Novo",
    Temperatura: "Morno",
    "Próxima Ação": `${email} — ${mensagem}`,
  };

  if (servico) {
    fields["Serviço de Interesse"] = servico;
  }

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${baseId}/${TABLE_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields, typecast: true }),
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("Erro do Airtable (contato):", res.status, detail);
      return NextResponse.json(
        { error: "Não foi possível registrar o contato." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Falha ao chamar o Airtable (contato):", err);
    return NextResponse.json(
      { error: "Não foi possível registrar o contato." },
      { status: 502 }
    );
  }
}
