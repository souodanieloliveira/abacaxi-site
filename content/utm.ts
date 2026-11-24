// Origem da visita por UTM (24/11/2026, Daniel: "queremos saber quem clicou, além de quantos").
// Os links do e-mail pessoal da Black Friday levam utm_source, utm_medium, utm_campaign e utm_content (um código por
// pessoa, c01, c02…). O site guarda esses valores na aba (sessionStorage) quando a pessoa chega, porque os parâmetros
// somem ao seguir para outra página, e o cadastro da campanha manda a origem para o Funil de Vendas.
// A correspondência entre código e pessoa fica só no Airtable.

export const CHAVE_UTM = "abx-utm";
export const CAMPOS_UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

export type Utm = Partial<Record<(typeof CAMPOS_UTM)[number], string>>;

// Só letras, números, ponto, hífen e sublinhado, até 60 caracteres por campo.
const VALOR_UTM = /^[A-Za-z0-9._-]{1,60}$/;

export function limparUtm(bruto: unknown): Utm {
  if (!bruto || typeof bruto !== "object") return {};
  const utm: Utm = {};
  for (const campo of CAMPOS_UTM) {
    const valor = (bruto as Record<string, unknown>)[campo];
    if (typeof valor === "string" && VALOR_UTM.test(valor)) utm[campo] = valor;
  }
  return utm;
}

// Texto gravado no Funil: "fonte / meio / campanha / conteúdo", sem os campos vazios.
export function textoUtm(utm: Utm) {
  return CAMPOS_UTM.map((c) => utm[c]).filter(Boolean).join(" / ");
}

// Lê a origem guardada na aba (no navegador). Sem armazenamento, devolve vazio.
export function lerUtmGuardada(): Utm {
  try {
    return limparUtm(JSON.parse(sessionStorage.getItem(CHAVE_UTM) ?? "null"));
  } catch {
    return {};
  }
}
