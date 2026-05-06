import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conteúdos e reflexões sobre finanças pessoais, empresariais e educação financeira da equipe Abacaxi.",
  alternates: { canonical: "https://abacaxi.cc/blog" },
  openGraph: {
    url: "https://abacaxi.cc/blog",
    images: [{ url: "https://abacaxi.cc/hero-abacaxi.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: "https://abacaxi.cc/hero-abacaxi.png", width: 1200, height: 630 }],
  },
};

export default function BlogPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Blog</h1>
      <p>Conteúdos e reflexões sobre dinheiro.</p>
    </main>
  );
}
