import type { Metadata } from "next";
import "./globals.css";
import { Figtree, Fraunces } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-figtree",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
