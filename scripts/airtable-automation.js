// Ação "Executar script" numa automação do Airtable.
// Gatilho sugerido: horário no fim do dia, ou quando o dia é marcado como concluído.
// A automação lê a linha consolidada do dia e envia ao endpoint na Vercel.
//
// Configure os "Input variables" desta ação mapeando os campos do registro
// para os nomes abaixo (à esquerda). Horários no formato "HH:MM" (24h).
//   date, notaGeral, notaPessoal, notaAbacaxi, notaBrecho, energia, estresse,
//   moodNote, horaDormiu, horaAcordou, peso,
//   bpoFeito, comercialExecutado, conteudoProduzido, exercicio,
//   dietaFeita, tarefasCasa, encontros

const cfg = input.config();

const ENDPOINT = "https://abacaxi.cc/api/exist-sync";
const SECRET = "COLE_AQUI_O_MESMO_SYNC_SECRET"; // igual ao SYNC_SECRET da Vercel

const payload = {
  date: cfg.date, // "yyyy-mm-dd"
  notaGeral: cfg.notaGeral,
  notaPessoal: cfg.notaPessoal,
  notaAbacaxi: cfg.notaAbacaxi,
  notaBrecho: cfg.notaBrecho,
  energia: cfg.energia,
  estresse: cfg.estresse,
  moodNote: cfg.moodNote,
  horaDormiu: cfg.horaDormiu,
  horaAcordou: cfg.horaAcordou,
  peso: cfg.peso, // deixe vazio nos dias que não pesar
  bpoFeito: cfg.bpoFeito,
  comercialExecutado: cfg.comercialExecutado,
  conteudoProduzido: cfg.conteudoProduzido,
  exercicio: cfg.exercicio,
  dietaFeita: cfg.dietaFeita,
  tarefasCasa: cfg.tarefasCasa,
  encontros: cfg.encontros,
};

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-sync-secret": SECRET,
  },
  body: JSON.stringify(payload),
});

const out = await res.json();
if (!res.ok) {
  throw new Error("Falha no sync com o Exist: " + JSON.stringify(out));
}
console.log("Sync ok:", out);
