import { ImageResponse } from "next/og";
import { AUTHOR } from "../../../content/blog/config";
import { getAllPosts, getPost } from "../../../content/blog";

export const alt = "Texto do blog da Abacaxi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Blog da Abacaxi";

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
          padding: 72,
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#FF8B13" }}>
          Abacaxi · Blog
        </div>
        <div style={{ display: "flex", fontSize: title.length > 60 ? 62 : 74, fontWeight: 700, lineHeight: 1.15 }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 32, opacity: 0.9 }}>
          Por {AUTHOR.name} · abacaxi.cc
        </div>
      </div>
    ),
    { ...size },
  );
}
