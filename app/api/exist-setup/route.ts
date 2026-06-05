// ROTA TEMPORÁRIA DE SETUP — rodar uma vez e depois apagar este arquivo.
// Acesse no navegador:
//   https://abacaxi.cc/api/exist-setup?secret=SEU_SYNC_SECRET
// Ela adquire os templates e cria os atributos custom no Exist, usando o
// EXIST_TOKEN que está nas env vars da Vercel (o token não passa pela URL).

import { NextRequest, NextResponse } from "next/server";

const EXIST_BASE = "https://exist.io/api/2";

// Atributos oficiais (templates): só precisam ser adquiridos.
const TEMPLATES = [
  "mood",
  "mood_note",
  "sleep",
  "sleep_start",
  "sleep_end",
  "weight",
  "energy_level",
  "stress_level",
];

// Atributos custom: precisam ser criados.
// value_type: 0=inteiro, 1=decimal, 2=texto, 3=duração(min), 7=booleano, 8=escala 1-9
const CUSTOM = [
  { label: "Nota pessoal", value_type: 8, group: "mood" },
  { label: "Nota Abacaxi", value_type: 8, group: "mood" },
  { label: "Nota brechó", value_type: 8, group: "mood" },
  { label: "Encontros realizados", value_type: 0, group: "productivity" },
  { label: "BPO feito", value_type: 7, group: "custom" },
  { label: "Comercial executado", value_type: 7, group: "custom" },
  { label: "Conteúdo produzido", value_type: 7, group: "custom" },
  { label: "Exercício", value_type: 7, group: "custom" },
  { label: "Dieta feita", value_type: 7, group: "custom" },
  { label: "Tarefas de casa", value_type: 7, group: "custom" },
];

export async function GET(req: NextRequest) {
  const secret = process.env.SYNC_SECRET;
  const given = req.nextUrl.searchParams.get("secret");
  if (!secret || given !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const token = process.env.EXIST_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "EXIST_TOKEN ausente nas env vars" }, { status: 500 });
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-type": "application/json",
  };

  // 1) adquirir os templates
  const acqRes = await fetch(`${EXIST_BASE}/attributes/acquire/`, {
    method: "POST",
    headers,
    body: JSON.stringify(TEMPLATES.map((t) => ({ template: t, manual: false }))),
  });
  const acquireRaw = await acqRes.json().catch(() => ({}));

  // 2) criar os custom
  const createRes = await fetch(`${EXIST_BASE}/attributes/create/`, {
    method: "POST",
    headers,
    body: JSON.stringify(CUSTOM.map((c) => ({ ...c, manual: false }))),
  });
  const createRaw = await createRes.json().catch(() => ({}));

  // extrai os names gerados, se vierem no formato esperado
  const names = Array.isArray((createRaw as { success?: unknown }).success)
    ? (createRaw as { success: Array<Record<string, unknown>> }).success.map((a) => ({
        label: a.label,
        name: a.name,
        group: a.group,
        value_type: a.value_type,
      }))
    : null;

  return NextResponse.json({
    ok: acqRes.ok && createRes.ok,
    acquire_status: acqRes.status,
    create_status: createRes.status,
    names,
    create_raw: createRaw,
    acquire_raw: acquireRaw,
  });
}
