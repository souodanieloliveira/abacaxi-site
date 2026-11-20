import type { Metadata } from "next";

// Termo de compra dos Encontros Individuais da campanha Black Friday 2026.
// Texto proposto pela conversa Site e aprovado por Daniel em 20/11/2026 01:55 ("sim. pode confirmar os itens") e 02:03 (duração de 60 minutos),
// com os itens antes marcados "a confirmar" confirmados como propostos. Não há contrato: a compra é por este termo.
export const metadata: Metadata = {
  title: "Termo de compra: Encontros Individuais (Black Friday 2026)",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://abacaxi.cc/black-friday-2026/termo" },
};

const ITENS: { titulo: string; texto: string }[] = [
  {
    titulo: "Quem presta o serviço",
    texto: "Abacaxi Serviços Financeiros Ltda., CNPJ 12.329.221/0001-97, Goiânia/GO.",
  },
  {
    titulo: "O que você está comprando",
    texto: "Um pacote de 1, 2 ou 3 Encontros Individuais de planejamento financeiro com Daniel Oliveira, online, por videochamada, com duração planejada de 60 minutos cada um.",
  },
  {
    titulo: "Preço",
    texto:
      "O valor do pacote escolhido, com o desconto da campanha: R$ 420 (1 encontro), R$ 736 (2 encontros) ou R$ 948 (3 encontros). O pagamento é feito na página de pagamento da Iugu, por Pix ou cartão de crédito em até 3 vezes sem juros. A compra só vale depois que o pagamento é confirmado.",
  },
  {
    titulo: "Validade",
    texto:
      "Os encontros devem ser realizados em até 60 dias, contados da data da compra. Encontro não realizado nesse prazo expira, sem reembolso.",
  },
  {
    titulo: "Agendamento e remarcação",
    texto:
      "O primeiro encontro é agendado na página que abre depois do pagamento ou pelo link enviado por e-mail, conforme a disponibilidade da agenda. A remarcação pode ser feita com pelo menos 24 horas de antecedência. Falta sem aviso conta como encontro realizado.",
  },
  {
    titulo: "Arrependimento",
    texto:
      "Você pode desistir em até 7 dias depois da compra e receber o valor de volta, como prevê o Código de Defesa do Consumidor (art. 49). Se algum encontro já tiver acontecido nesse prazo, o valor dele é descontado.",
  },
  {
    titulo: "Natureza do serviço",
    texto:
      "Os encontros têm finalidade de organização e educação financeira. Não são recomendação de investimento nem orientação tributária individual.",
  },
  {
    titulo: "Seus dados",
    texto:
      "Nome, e-mail, WhatsApp e CPF são usados para a compra, a cobrança, a nota fiscal, o agendamento e o contato sobre os encontros, conforme a Política de Privacidade (abacaxi.cc/privacidade).",
  },
];

export default function TermoPage() {
  return (
    <div style={{ background: "var(--color-background-soft)" }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="bf-wrap">
          <p className="calc-eyebrow">Black Friday · 2026</p>
          <h1 className="calc-h1">Termo de compra dos Encontros Individuais</h1>
          <ol className="bf-termo">
            {ITENS.map((item) => (
              <li key={item.titulo}>
                <strong>{item.titulo}.</strong> {item.texto}
              </li>
            ))}
          </ol>
          <p className="bf-termo__data">Versão de 20 de novembro de 2026.</p>
        </div>
      </div>
    </div>
  );
}
