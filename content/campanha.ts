// Campanha Black Friday + 13º 2026 (escopo do Log de Marketing, 19/11/2026 21:40 e 22:03; decisões da
// conversa Site em 19/11/2026 22:37 e 20/11/2026 01:55).
// Período: 00h00 de ter 24/11 a 23h59 de sex 04/12 (horário de Brasília). Quem se cadastra na sexta paga
// até seg 07/12. Depois do fim, a página mostra "campanha encerrada".

export const CAMPANHA = {
  // Mesmo texto da opção do campo Campanha no Funil de Vendas (Airtable).
  nome: "Black Friday + 13º 2026",
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
  // Link de pagamento do Mercado Pago (criado por Daniel). Vazio até ele mandar.
  linkPagamento: string;
};

export const PACOTES: Pacote[] = [
  { id: "1", encontros: 1, precoCheio: 520, precoCampanha: 420, linkPagamento: "" },
  { id: "2", encontros: 2, precoCheio: 936, precoCampanha: 736, linkPagamento: "" },
  { id: "3", encontros: 3, precoCheio: 1248, precoCampanha: 948, linkPagamento: "" },
];

// Agenda do primeiro Encontro Individual (página de agendamento criada por Daniel). Vazia até ele mandar.
export const AGENDA_ENCONTRO_URL = "";

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
