import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsletterBox from "../../components/blog/NewsletterBox";
import { AUTHOR, DEFAULT_OG_IMAGE, SITE_URL } from "../../content/blog/config";
import { formatDate, getAllPosts, readingMinutes, toDate } from "../../content/blog";

const description =
  "Textos sobre dinheiro, decisões e planejamento financeiro, escritos por quem atende pessoas todos os dias. Publicados a cada duas semanas.";

export const metadata: Metadata = {
  title: "descasca. | Blog",
  description,
  alternates: {
    canonical: `${SITE_URL}/blog`,
    types: { "application/rss+xml": `${SITE_URL}/blog/feed.xml` },
  },
  openGraph: {
    url: `${SITE_URL}/blog`,
    title: "descasca. | Blog da Abacaxi",
    description,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "descasca. | Blog da Abacaxi",
    description,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "descasca.",
    alternateName: "Blog da Abacaxi",
    url: `${SITE_URL}/blog`,
    description,
    inLanguage: "pt-BR",
    publisher: { "@type": "Organization", name: "Abacaxi", url: SITE_URL },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: toDate(p.publishedAt).toISOString(),
      author: { "@type": "Person", name: AUTHOR.name, url: `${SITE_URL}/sobre` },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div style={{ background: "var(--color-background-soft)" }}>
        <div className="container" style={{ paddingTop: 72, paddingBottom: 72 }}>
          {/* O blog leva o nome "descasca." (Daniel, 17/11/2026 22:10), o mesmo do Medium, do Substack e da
              newsletter do LinkedIn. O menu continua "Blog", que é a palavra que o visitante entende de cara.
              Título em Fraunces no Roxo Escuro (#3D1A6E, o --color-dark), com o ponto em laranja: o roxo
              canônico #8500DB fica só para o logo (Daniel, 17/11/2026 21:42). */}
          {/* O "d." da descasca. à direita, só no computador (Daniel, 17/11/2026 22:14). No celular ele
              ficaria abaixo do título, repetindo o nome e empurrando a lista de textos. */}
          <div className="blog-topo">
            <div style={{ maxWidth: 640 }}>
              <p className="home-hero__rotulo">Blog da Abacaxi</p>
              <h1
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 500,
                  fontSize: "3rem",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: "var(--color-dark)",
                  marginBottom: 16,
                  marginTop: 0,
                }}
              >
                descasca<span style={{ color: "var(--color-secondary)" }}>.</span>
              </h1>
              <p style={{ fontSize: "1.125rem", opacity: 0.8, lineHeight: 1.7, margin: 0 }}>
                {description}
              </p>
            </div>
            <div className="blog-topo__logo">
              <Image src="/descasca-logo.png" alt="" width={640} height={640} sizes="240px" priority />
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: "#ffffff" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ maxWidth: 720 }}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 40 }}>
              {posts.map((post) => (
                <li key={post.slug}>
                  <article>
                    <p style={{ margin: "0 0 8px", fontSize: "0.875rem", opacity: 0.65 }}>
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                      {" · "}
                      Por {AUTHOR.name}
                      {" · "}
                      {readingMinutes(post.body)} min de leitura
                    </p>
                    <h2 style={{ fontSize: "1.5rem", lineHeight: 1.3, margin: "0 0 8px" }}>
                      <Link
                        href={`/blog/${post.slug}`}
                        style={{ color: "var(--color-dark)" }}
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p style={{ margin: "0 0 12px", lineHeight: 1.7, opacity: 0.85 }}>
                      {post.description}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      style={{ color: "var(--color-text-accent)", fontWeight: 600 }}
                    >
                      Ler o texto →
                    </Link>
                  </article>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 64 }}>
              <NewsletterBox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
