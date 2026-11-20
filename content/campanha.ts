// Campanha Black Friday 2026 (escopo do Log de Marketing, 19/11/2026 21:40 e 22:03; decisões da
// conversa Site em 19/11/2026 22:37 e 20/11/2026 01:55).
// Período: 00h00 de ter 24/11 a 23h59 de sex 04/12 (horário de Brasília). Quem se cadastra na sexta paga
// até seg 07/12. Depois do fim, a página mostra "campanha encerrada".

export const CAMPANHA = {
  // Mesmo texto da opção do campo Campanha no Funil de Vendas (Airtable).
  // Sem "13º" nos nomes (Daniel, 20/11/2026 14:29: "A promoção é de Black Friday").
  nome: "Black Friday 2026",
  caminho: "/black-friday-2026",
  inicio: "2026-11-24T00:00:00-03:00",
  fim: "2026-12-04T23:59:59-03:00",
  ultimoDia: "2026-12-04",
  prazoPagamentoUltimoDia: "2026-12-07",
  validadeDias: 60,
} as const;

export type Pacote = {
  id: "1" | "2" | "3";
  encontros: number;
  precoCheio: number;
  precoCampanha: number;
  // Para quem o pacote faz sentido (texto aprovado por Daniel em 20/11/2026 15:21).
  descricao: string;
};

export const PACOTES: Pacote[] = [
  { id: "1", encontros: 1, precoCheio: 520, precoCampanha: 420,
    descricao: "Para uma questão pontual: entender para onde o dinheiro está indo, rever o orçamento ou tirar uma dúvida específica." },
  { id: "2", encontros: 2, precoCheio: 936, precoCampanha: 736,
    descricao: "Para organizar e ajustar: no primeiro, a gente monta o retrato do seu orçamento; no segundo, vê como foi colocar em prática e ajusta o que for preciso." },
  { id: "3", encontros: 3, precoCheio: 1248, precoCampanha: 948,
    descricao: "Para mudar a relação com o dinheiro: organizar, ajustar e acompanhar por mais tempo, com espaço para tratar de dívidas, reserva ou o uso do 13º." },
];

// Agenda do primeiro Encontro Individual (página de agendamento criada por Daniel, recebida em 20/11/2026 13:14).
// AGENDA_EMBED_URL é o endereço do código "Inline booking page" (20/11/2026 14:10), embutido em /black-friday-2026/agendar.
export const AGENDA_ENCONTRO_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0soj6n5NBkVT9rpjQ_Pj4AXYORFS93w25kDl2B4nblgvi0etA3BLzWzWony4buotZMRl7p5vHR";
export const AGENDA_EMBED_URL = `${AGENDA_ENCONTRO_URL}?gv=true`;

// Pagamento pela Iugu (20/11/2026 14:03 a 14:10): a cada cadastro, o site cria uma fatura com Pix e cartão
// (sem boleto), cartão em até 3 vezes (juros com a Abacaxi) e retorno para a página da agenda.
export const PAGAMENTO = {
  formas: ["pix", "credit_card"],
  maxParcelas: 3,
  paginaAgendar: "/black-friday-2026/agendar",
  paginaDados: "/black-friday-2026/comprar",
} as const;

export type EstadoCampanha = "antes" | "aberta" | "encerrada";

// Modo de teste (20/11/2026): fora da produção (prévias da Vercel e computador local), a campanha fica aberta
// para testar o fluxo antes de 24/11. Na produção (abacaxi.cc), vale sempre o horário real.
export const MODO_TESTE_NAVEGADOR = !!process.env.NEXT_PUBLIC_VERCEL_ENV && process.env.NEXT_PUBLIC_VERCEL_ENV !== "production";

export function estadoCampanha(agora: Date = new Date()): EstadoCampanha {
  if (agora < new Date(CAMPANHA.inicio)) return "antes";
  if (agora > new Date(CAMPANHA.fim)) return "encerrada";
  return "aberta";
}

export function reais(valor: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(valor);
}

export function rotuloPacote(p: Pacote) {
  return p.encontros === 1 ? "1 Encontro Individual" : `${p.encontros} Encontros Individuais`;
}
