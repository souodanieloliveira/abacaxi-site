import { NextResponse } from "next/server";

// Tabela "Lista de Espera" na base "Abacaxi".
const TABLE_ID = "tblg5KBb3cLk6nZLo";

type ListaEsperaBody = {
  email?: string;
  origem?: string;
};

// Opções válidas do singleSelect "Origem" na tabela Lista de Espera.
const ORIGENS_VALIDAS = ["Cursos online", "Lead magnet", "Newsletter"] as const;
const ORIGEM_PADRAO = "Cursos online";

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

  let body: ListaEsperaBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo inválido." }, { status: 400 });
  }

  const email = body.email?.trim();

  if (!email) {
    return NextResponse.json(
      { error: "E-mail é obrigatório." },
      { status: 400 }
    );
  }

  // Só aceita origens conhecidas; o client não pode injetar valores arbitrários.
  const origemInformada = body.origem?.trim();
  const origem = ORIGENS_VALIDAS.includes(
    origemInformada as (typeof ORIGENS_VALIDAS)[number]
  )
    ? (origemInformada as string)
    : ORIGEM_PADRAO;

  // Data atual em formato ISO (YYYY-MM-DD).
  const dataInscricao = new Date().toISOString().slice(0, 10);

  const fields: Record<string, string> = {
    "E-mail": email,
    Origem: origem,
    "Data de Inscrição": dataInscricao,
  };

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
      console.error("Erro do Airtable (lista-espera):", res.status, detail);
      return NextResponse.json(
        { error: "Não foi possível registrar o e-mail." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Falha ao chamar o Airtable (lista-espera):", err);
    return NextResponse.json(
      { error: "Não foi possível registrar o e-mail." },
      { status: 502 }
    );
  }
}
