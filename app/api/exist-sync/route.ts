import { NextRequest, NextResponse } from "next/server";

const EXIST_BASE = "https://exist.io/api/2";

// Nomes dos atributos no Exist.
// Confira contra a saída do exist-setup.mjs e ajuste aqui se algum slug
// vier diferente do esperado (ex.: "Tarefas de casa" -> tarefas_de_casa).
const ATTR = {
  mood: "mood",
  moodNote: "mood_note",
  notaPessoal: "nota_pessoal",
  notaAbacaxi: "nota_abacaxi",
  notaBrecho: "nota_brech",
  energia: "energy_level",
  estresse: "stress_level",
  sleepStart: "sleep_start",
  sleepEnd: "sleep_end",
  sleep: "sleep",
  peso: "weight",
  bpo: "bpo_feito",
  comercial: "comercial_executado",
  conteudo: "contedo_produzido",
  exercicio: "exerccio",
  dieta: "dieta_feita",
  tarefas: "tarefas_de_casa",
  encontros: "encontros_realizados",
} as const;

// ---- conversões ----

// Entrada 1-10 -> escala 1-9 do Exist
function scale10to9(v?: number | null): number | null {
  if (v == null || Number.isNaN(Number(v))) return null;
  const n = Math.round(1 + (Number(v) - 1) * (8 / 9));
  return Math.min(9, Math.max(1, n));
}

function hmToMin(hm?: string | null): number | null {
  if (!hm) return null;
  const [h, m] = String(hm).split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

// sleep_start: minutos a partir do meio-dia
function minsFromMidday(hm?: string | null): number | null {
  const t = hmToMin(hm);
  return t == null ? null : (t - 720 + 1440) % 1440;
}

// sleep_end: minutos a partir da meia-noite
function minsFromMidnight(hm?: string | null): number | null {
  return hmToMin(hm);
}

// duração derivada de hora de dormir + hora de acordar
function sleepDuration(bed?: string | null, wake?: string | null): number | null {
  const b = hmToMin(bed);
  const w = hmToMin(wake);
  if (b == null || w == null) return null;
  return (w - b + 1440) % 1440;
}

function bool01(v: unknown): number {
  return v === true || v === 1 || v === "1" || v === "true" ? 1 : 0;
}

type Update = { name: string; date: string; value: number | string };

export async function POST(req: NextRequest) {
  // proteção do endpoint
  const secret = process.env.SYNC_SECRET;
  if (secret && req.headers.get("x-sync-secret") !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const token = process.env.EXIST_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "EXIST_TOKEN ausente" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const date =
    (body.date as string) ??
    new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });

  const updates: Update[] = [];
  const push = (name: string, value: number | string | null | undefined) => {
    if (value !== null && value !== undefined) updates.push({ name, date, value });
  };

  // notas e escalas (entram 1-10, reescaladas para 1-9)
  push(ATTR.mood, scale10to9(body.notaGeral as number));
  push(ATTR.notaPessoal, scale10to9(body.notaPessoal as number));
  push(ATTR.notaAbacaxi, scale10to9(body.notaAbacaxi as number));
  push(ATTR.notaBrecho, scale10to9(body.notaBrecho as number));
  push(ATTR.energia, scale10to9(body.energia as number));
  push(ATTR.estresse, scale10to9(body.estresse as number));
  if (body.moodNote) push(ATTR.moodNote, String(body.moodNote));

  // sono
  push(ATTR.sleepStart, minsFromMidday(body.horaDormiu as string));
  push(ATTR.sleepEnd, minsFromMidnight(body.horaAcordou as string));
  push(ATTR.sleep, sleepDuration(body.horaDormiu as string, body.horaAcordou as string));

  // peso (esporádico: só vai quando vier)
  if (body.peso != null && !Number.isNaN(Number(body.peso))) {
    push(ATTR.peso, Number(body.peso));
  }

  // tags (0/1) — sempre enviadas, mesmo 0, para marcar o dia
  push(ATTR.bpo, bool01(body.bpoFeito));
  push(ATTR.comercial, bool01(body.comercialExecutado));
  push(ATTR.conteudo, bool01(body.conteudoProduzido));
  push(ATTR.exercicio, bool01(body.exercicio));
  push(ATTR.dieta, bool01(body.dietaFeita));
  push(ATTR.tarefas, bool01(body.tarefasCasa));

  // contagem
  if (body.encontros != null) {
    push(ATTR.encontros, Math.max(0, Math.round(Number(body.encontros))));
  }

  const res = await fetch(`${EXIST_BASE}/attributes/update/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json({ error: "exist_error", detail: data }, { status: res.status });
  }

  return NextResponse.json({ ok: true, sent: updates.length, date, exist: data });
}
