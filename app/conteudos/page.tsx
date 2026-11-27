import type { Metadata } from "next";
import Link from "next/link";
import PaginaHero from "../../components/PaginaHero";

// Conteúdos (27/11/2026, conversa de Marketing): entra no menu no lugar de "Blog".
// Reúne o que é gratuito: materiais (guia e calculadora, que continuam em /guia e /calculadora) e a descasca.
// (/blog). As respostas a perguntas entram em /conteudos/perguntas quando o primeiro lote for publicado.
// Textos desta página: rascunho da conversa do Site, a aprovar por Daniel.

const description =
  "Materiais gratuitos da Abacaxi para organizar o seu dinheiro: o guia do Limite de Gastos, a calculadora e a descasca., a nossa newsletter.";

export const metadata: Metadata = {
  title: "Conteúdos",
  description,
  alternates: { canonical: "https://abacaxi.cc/conteudos" },
  openGraph: {
    url: "https://abacaxi.cc/conteudos",
    images: [{ url: "https://abacaxi.cc/hero-abacaxi.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: "https://abacaxi.cc/hero-abacaxi.png", width: 1200, height: 630 }],
  },
};

const materiais = [
  {
    titulo: "Guia: Quanto tempo dura seu orçamento?",
    texto:
      "Passo a passo para chegar ao seu Limite de Gastos, com exemplos com e sem cartão de crédito e uma ficha para preencher com os seus números.",
    href: "/guia",
    botao: "Baixar o guia",
  },
  {
    titulo: "Calculadora do Limite de Gastos",
    texto: "Descubra quanto você tem disponível para gastar, semana a semana, com o resultado na tela e em PDF.",
    href: "/calculadora",
    botao: "Usar a calculadora",
  },
];

export default function ConteudosPage() {
  return (
    <>
      <PaginaHero
        rotulo="Conteúdos"
        titulo="O que a gente aprende nos atendimentos, aberto para você."
        frase="Materiais gratuitos para organizar o seu dinheiro e tomar decisões com mais clareza."
      />

      <div style={{ background: "#ffffff" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text-main)", margin: "0 0 24px" }}>
            Materiais
          </h2>
          <div className="flex-responsive" style={{ gap: 24 }}>
            {materiais.map((m) => (
              <div
                key={m.href}
                style={{
                  flex: 1,
                  border: "1px solid rgba(61, 26, 110, 0.12)",
                  borderRadius: 12,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-text-main)", margin: "0 0 12px" }}>
                  {m.titulo}
                </h3>
                <p style={{ opacity: 0.8, lineHeight: 1.6, margin: "0 0 24px", flexGrow: 1 }}>{m.texto}</p>
                <Link href={m.href} className="btn-secondary" style={{ alignSelf: "flex-start" }} data-umami-event="conteudos-material">
                  {m.botao}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "var(--color-background-soft)" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text-main)", margin: "0 0 12px" }}>
              descasca.
            </h2>
            <p style={{ opacity: 0.8, lineHeight: 1.7, margin: "0 0 24px", fontSize: "1.0625rem" }}>
              A newsletter da Abacaxi: textos sobre dinheiro, decisões e planejamento financeiro, a cada duas semanas.
            </p>
            <Link href="/blog" className="btn-secondary" data-umami-event="conteudos-descasca">
              Ler a descasca.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
