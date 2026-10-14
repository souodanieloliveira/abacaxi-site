// Roda UMA vez para registrar os atributos no Exist.
// Requer Node 18+ (fetch global) e o token no ambiente:
//   EXIST_TOKEN=xxxxx node scripts/exist-setup.mjs

const TOKEN = process.env.EXIST_TOKEN;
if (!TOKEN) {
  console.error("Defina EXIST_TOKEN no ambiente.");
  process.exit(1);
}

const BASE = "https://exist.io/api/2";
const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-type": "application/json",
};

// Atributos oficiais (templates): só precisam ser "adquiridos".
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

// Atributos custom: precisam ser "criados".
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

async function acquireTemplates() {
  const body = TEMPLATES.map((t) => ({ template: t, manual: false }));
  const res = await fetch(`${BASE}/attributes/acquire/`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  console.log(
    res.ok ? "Templates adquiridos." : "Erro ao adquirir templates:",
    res.ok ? "" : JSON.stringify(data, null, 2)
  );
}

async function createCustom() {
  const body = CUSTOM.map((c) => ({ ...c, manual: false }));
  const res = await fetch(`${BASE}/attributes/create/`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));

  if (Array.isArray(data.success) && data.success.length) {
    console.log("\nCustom criados (confira os 'name' gerados):");
    for (const a of data.success) {
      console.log(`  ${a.label}  ->  name: ${a.name}  (grupo ${a.group}, tipo ${a.value_type})`);
    }
  }
  if (Array.isArray(data.failed) && data.failed.length) {
    console.log("\nFalharam (provavelmente já existem, ou grupo inválido):");
    console.log(JSON.stringify(data.failed, null, 2));
  }
  if (!data.success && !data.failed) {
    console.log("\nResposta do create:", JSON.stringify(data, null, 2));
  }
}

await acquireTemplates();
await createCustom();
console.log("\nPronto. Confira os 'name' acima e ajuste o objeto ATTR no route.ts se algum slug diferir.");
