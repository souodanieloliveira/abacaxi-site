import { NextResponse } from "next/server";
import { FUNIL_TABLE_ID, MARCA_CAMPANHA, adicionarCompradorBrevo, airtable, buscarFatura, variavel } from "../../../../components/campanha/servidor";

// Aviso de pagamento da Iugu para as faturas da campanha Black Friday 2026 (20/11/2026, "5. sim").
// O endereço vai em cada fatura (notification_url). O conteúdo do aviso não é tomado como verdade: a rota busca a
// fatura na própria Iugu, com o token da Abacaxi, e só age se ela estiver paga e for da campanha. Faturas dos
// outros clientes são ignoradas.
// Com a fatura paga: o registro do Funil passa para Ganho e a pessoa entra na lista de compradores do Brevo,
// cuja automação manda o e-mail com o link da agenda.

async function lerId(request: Request) {
  const tipo = request.headers.get("content-type") ?? "";
  try {
    if (tipo.includes("application/json")) {
      const corpo = (await request.json()) as { data?: { id?: string } };
      return corpo.data?.id ?? "";
    }
    const form = await request.formData();
    return String(form.get("data[id]") ?? "");
  } catch {
    return "";
  }
}

export async function POST(request: Request) {
  const id = await lerId(request);
  if (!/^[A-Za-z0-9_-]{8,64}$/.test(id)) return NextResponse.json({ ok: true, ignorado: "sem id" });

  const token = process.env.IUGU_API_TOKEN;
  if (!token) {
    console.error("IUGU_API_TOKEN não configurado.");
    return NextResponse.json({ error: "Configuração incompleta." }, { status: 500 });
  }

  const fatura = await buscarFatura(token, id).catch(() => null);
  if (!fatura) return NextResponse.json({ ok: true, ignorado: "fatura não encontrada" });
  if (variavel(fatura, "campanha") !== MARCA_CAMPANHA) return NextResponse.json({ ok: true, ignorado: "outra cobrança" });
  if (fatura.status !== "paid") return NextResponse.json({ ok: true, ignorado: `status ${fatura.status}` });

  const registroId = variavel(fatura, "registro_funil");
  if (!/^rec[A-Za-z0-9]{14}$/.test(registroId)) {
    console.error("Fatura da campanha paga sem registro do Funil:", id);
    return NextResponse.json({ ok: true, ignorado: "sem registro" });
  }

  try {
    const res = await airtable("GET", `${FUNIL_TABLE_ID}/${registroId}`);
    if (!res.ok) throw new Error(`Airtable ${res.status}`);
    const registro = (await res.json()) as { fields: Record<string, unknown> };
    // Aviso repetido: o registro já está como Ganho, nada a fazer (evita e-mail duplicado).
    if (registro.fields.Status === "Ganho") return NextResponse.json({ ok: true, ignorado: "já registrado" });

    const fatura2 = fatura as typeof fatura & { email?: string; payer_name?: string };
    const email = String(fatura2.email ?? "");
    const nome = String(fatura2.payer_name ?? "");
    const proxima = String(registro.fields["Próxima Ação"] ?? "").replace("aguardando pagamento", "PAGO");

    // Brevo antes do Funil: se o Brevo falhar, a Iugu tenta de novo e o registro ainda não está como Ganho.
    if (email && !(await adicionarCompradorBrevo(email, nome))) throw new Error("Brevo recusou o comprador");

    const upd = await airtable("PATCH", `${FUNIL_TABLE_ID}/${registroId}`, {
      typecast: true,
      fields: { Status: "Ganho", Fase: "Ganho", "Próxima Ação": `${proxima} — agendar o primeiro encontro` },
    });
    if (!upd.ok) throw new Error(`Airtable ${upd.status}: ${await upd.text()}`);

    return NextResponse.json({ ok: true });
  } catch (erro) {
    // Erro devolvido à Iugu, que tenta de novo mais tarde.
    console.error("Falha ao registrar o pagamento da campanha:", id, erro);
    return NextResponse.json({ error: "Falha ao registrar." }, { status: 500 });
  }
}
