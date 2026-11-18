import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { AUTHOR, NEWSLETTER_NAME } from "../../../content/blog/config";
import { getAllPosts, getPost } from "../../../content/blog";

// Imagem de compartilhamento dos textos (18/11/2026, Daniel, opção B): identidade da descasca.
// Fundo Roxo Escuro, "descasca." em Fraunces branca com ponto laranja, "d." apagado no canto,
// título em Fraunces e rodapé com o autor e abacaxi.cc/blog. Fontes em assets/og (woff, SIL OFL 1.1).
export const alt = "Texto da descasca., a newsletter da Abacaxi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

const fonte = (arquivo: string) => readFile(join(process.cwd(), "assets/og", arquivo));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? NEWSLETTER_NAME;
  const nome = NEWSLETTER_NAME.endsWith(".") ? NEWSLETTER_NAME.slice(0, -1) : NEWSLETTER_NAME;
  const tamanho = title.length < 25 ? 76 : title.length < 48 ? 68 : 62;

  const [fraunces, figtree500, figtree700] = await Promise.all([
    fonte("fraunces-latin-500-normal.woff"),
    fonte("figtree-latin-500-normal.woff"),
    fonte("figtree-latin-700-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#3D1A6E",
          color: "#ffffff",
          padding: "64px 72px",
          fontFamily: "Figtree",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: 44, letterSpacing: "-0.02em", lineHeight: 1 }}>
              {nome}
              <span style={{ color: "#FF8B13" }}>.</span>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 12,
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#C9B8EA",
              }}
            >
              A NEWSLETTER DA ABACAXI
            </div>
          </div>
          <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: 150, lineHeight: 0.8, color: "rgba(255,255,255,0.12)" }}>
            d<span style={{ color: "#FF8B13" }}>.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Fraunces",
            fontSize: tamanho,
            lineHeight: 1.08,
            letterSpacing: "-0.015em",
            maxWidth: 960,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid rgba(255,255,255,0.18)",
            paddingTop: 22,
            fontSize: 24,
            fontWeight: 500,
            color: "#D9CCF0",
          }}
        >
          <span>Por {AUTHOR.name}</span>
          <span style={{ color: "#FF8B13", fontWeight: 700 }}>abacaxi.cc/blog</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 500 },
        { name: "Figtree", data: figtree500, style: "normal", weight: 500 },
        { name: "Figtree", data: figtree700, style: "normal", weight: 700 },
      ],
    },
  );
}
