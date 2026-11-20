import type { Metadata } from "next";
import Link from "next/link";
import EscolhaPacotes from "../../components/campanha/EscolhaPacotes";
import { BOOKING_URL } from "../../content/blog/config";

// Página da campanha Black Friday 2026 (escopo do Log de Marketing, 19/11/2026 21:40 e 22:03).
// Endereço com o ano (Daniel, 19/11/2026 22:37: "coloque o ano também"). Depois de 04/12, a página continua
// no ar e mostra "campanha encerrada" no lugar dos botões.
// 20/11/2026 15:21: página de venda em etapas (escolha do pacote aqui; dados em /comprar), sem atalhos para o guia e
// a calculadora e sem a conversa gratuita, com a explicação de cada pacote.
export const metadata: Metadata = {
  title: "Black Friday: Encontros Individuais com desconto",
  description:
    "De 24 de novembro a 4 de dezembro de 2026, Encontros Individuais de planejamento financeiro com R$ 100, R$ 200 ou R$ 300 de desconto. O único desconto do ano.",
  alternates: { canonical: "https://abacaxi.cc/black-friday-2026" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Abacaxi",
    url: "https://abacaxi.cc/black-friday-2026",
    images: [{ url: "https://abacaxi.cc/hero-abacaxi.png", width: 1200, height: 630 }],
  },
};

export default function BlackFridayPage() {
  return (
    <div style={{ background: "var(--color-background-soft)", minHeight: "70vh" }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="bf-wrap">
          <p className="calc-eyebrow">Black Friday · 2026</p>
          <h1 className="calc-h1">Encontros Individuais com o único desconto do ano.</h1>
          <p className="calc-lede">
            De 24 de novembro a 4 de dezembro, os Encontros Individuais de planejamento financeiro saem com R$ 100,
            R$ 200 ou R$ 300 de desconto.
          </p>
          <a href="#bf-pacotes" className="btn-primary bf-cta" data-umami-event="bf-escolher-topo">
            Escolher meu pacote
          </a>

          <div className="bf-como">
            <h2 className="bf-como__titulo">Como funciona um Encontro Individual</h2>
            <p>
              São 60 minutos, online, por videochamada, olhando o seu dinheiro com calma. A gente entende o seu momento,
              olha os números e sai do encontro com os próximos passos definidos. Os encontros valem por 60 dias,
              contados da compra.
            </p>
          </div>

          <h2 className="bf-como__titulo bf-pacotes__titulo">Escolha o seu pacote</h2>
          <EscolhaPacotes conversaUrl={BOOKING_URL} />

          <p className="bf-rodape">
            Desconto único no ano. <Link href="/black-friday-2026/termo">Termos e Condições</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
