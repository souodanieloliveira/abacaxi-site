import type { Metadata } from "next";
import Calculadora from "../../components/calculadora/Calculadora";
import { BOOKING_URL } from "../../content/blog/config";

// Calculadora de Limite de Gastos (lead magnet). Desenhada na conversa Conteúdo e assumida pela conversa
// Site em 15/11/2026. Cálculo, cenários e textos vêm do protótipo aprovado; aqui só entram o visual do
// site, o consentimento e o envio pelo servidor (/api/calculadora).
export const metadata: Metadata = {
  title: "Calculadora de Limite de Gastos",
  description:
    "Descubra quanto você tem disponível para gastar, semana a semana. Ferramenta gratuita da Abacaxi, com o resultado na tela e em PDF.",
  alternates: { canonical: "https://abacaxi.cc/calculadora" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Abacaxi",
    url: "https://abacaxi.cc/calculadora",
    images: [{ url: "https://abacaxi.cc/hero-abacaxi.png", width: 1200, height: 630 }],
  },
};

export default function CalculadoraPage() {
  return (
    <div style={{ background: "var(--color-background-soft)", minHeight: "70vh" }}>
      <div className="container" style={{ paddingTop: 96, paddingBottom: 96 }}>
        <div className="calc-wrap">
          <p className="calc-eyebrow">Ferramenta gratuita</p>
          <h1 className="calc-h1">Calculadora de Limite de Gastos</h1>
          <p className="calc-lede">Descubra quanto você tem disponível para gastar, semana a semana.</p>
          <Calculadora bookingUrl={BOOKING_URL} />
        </div>
      </div>
    </div>
  );
}
