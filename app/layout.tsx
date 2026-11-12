import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChromeGate from "../components/ChromeGate";
import { Analytics } from "@vercel/analytics/next";

// Fontes servidas pelo próprio site (arquivos em app/fonts, licença SIL OFL 1.1), em vez de baixadas do
// Google Fonts a cada build: o download falhou em builds de 11 e 12/11/2026. Decisão de Daniel em 12/11/2026.
const figtree = localFont({
  src: [
    { path: "./fonts/figtree-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/figtree-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/figtree-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/figtree-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-figtree",
  display: "swap",
});

const fraunces = localFont({
  src: [
    { path: "./fonts/fraunces-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/fraunces-latin-500-italic.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abacaxi.cc"),
  title: {
    template: "%s | Abacaxi",
    default: "Abacaxi – Roteiro Financeiro para Momentos Decisivos",
  },
  description:
    "Ajudamos pessoas, empresas e instituições a organizar suas finanças, planejar o futuro e tomar decisões com mais clareza.",
  alternates: {
    canonical: "https://abacaxi.cc",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://abacaxi.cc",
    siteName: "Abacaxi",
    images: [{ url: "https://abacaxi.cc/hero-abacaxi.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://abacaxi.cc/hero-abacaxi.png"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "FinancialPlanningService",
  name: "Abacaxi",
  description: "Roteiro Financeiro para Momentos Decisivos",
  url: "https://abacaxi.cc",
  telephone: "+5561999665697",
  email: "fale-com@abacaxi.cc",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR",
    addressRegion: "GO",
  },
  sameAs: [
    "https://www.instagram.com/abacaxi.cc/",
    "https://www.facebook.com/abacaxi.cc",
    "https://www.linkedin.com/company/abacaxi-cc/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${figtree.variable} ${fraunces.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <ChromeGate>
          <Header />
        </ChromeGate>
        {children}
        <ChromeGate>
          <Footer />
        </ChromeGate>
        {/* Contagem de visitas (Vercel Web Analytics), sem cookies de terceiros. Decisão de 30/10/2026. */}
        <Analytics />
      </body>
    </html>
  );
}
