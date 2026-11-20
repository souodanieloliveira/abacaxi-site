import type { Metadata } from "next";
import Link from "next/link";
import CompraCampanha from "../../components/campanha/CompraCampanha";
import { BOOKING_URL } from "../../content/blog/config";

// Página da campanha Black Friday + 13º 2026 (escopo do Log de Marketing, 19/11/2026 21:40 e 22:03).
// Endereço com o ano (Daniel, 19/11/2026 22:37: "coloque o ano também"). Depois de 04/12, a página continua
// no ar e mostra "campanha encerrada" no lugar do formulário.
export const metadata: Metadata = {
  title: "Black Friday + 13º: Encontros Individuais com desconto",
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
          <nav className="bf-atalhos" aria-label="Materiais gratuitos">
            <span className="bf-atalhos__rotulo">Gratuito:</span>
            <Link href="/guia" className="bf-atalho" data-umami-event="bf-guia">
              Guia: quanto tempo dura seu orçamento?
            </Link>
            <Link href="/calculadora" className="bf-atalho" data-umami-event="bf-calculadora">
              Calculadora de Limite de Gastos
            </Link>
          </nav>

          <p className="calc-eyebrow">Black Friday + 13º · 2026</p>
          <h1 className="calc-h1">Encontros Individuais com o único desconto do ano.</h1>
          <p className="calc-lede">
            De 24 de novembro a 4 de dezembro de 2026, os Encontros Individuais de planejamento financeiro saem com
            R$ 100, R$ 200 ou R$ 300 de desconto.
          </p>
          <ul className="bf-regras">
            <li>Desconto único no ano.</li>
            <li>Os encontros valem por 60 dias, contados da data da compra.</li>
            <li>Encontros online, por videochamada, de 60 minutos.</li>
          </ul>

          <CompraCampanha conversaUrl={BOOKING_URL} />

          <div className="bf-duvida">
            <p className="bf-duvida__titulo">Ainda com dúvida sobre qual pacote faz sentido?</p>
            <p>Converse com a gente antes. A conversa é gratuita e serve para entender o seu momento.</p>
            <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn-secondary" data-umami-event="bf-conversa">
              Agendar uma conversa gratuita
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
