import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsletterBox from "../../../components/blog/NewsletterBox";
import PostBody from "../../../components/blog/PostBody";
import {
  AUTHOR,
  BOOKING_URL,
  DEFAULT_OG_IMAGE,
  DISCLAIMER,
  NEWSLETTER_NAME,
  SITE_URL,
} from "../../../content/blog/config";
import {
  formatDate,
  getAllPosts,
  getPost,
  readingMinutes,
  toDate,
} from "../../../content/blog";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: AUTHOR.name }],
    alternates: {
      canonical: url,
      types: { "application/rss+xml": `${SITE_URL}/blog/feed.xml` },
    },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: toDate(post.publishedAt).toISOString(),
      modifiedTime: toDate(post.updatedAt ?? post.publishedAt).toISOString(),
      authors: [AUTHOR.name],
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      inLanguage: "pt-BR",
      datePublished: toDate(post.publishedAt).toISOString(),
      dateModified: toDate(post.updatedAt ?? post.publishedAt).toISOString(),
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      image: DEFAULT_OG_IMAGE.url,
      keywords: post.keywords?.join(", "),
      author: { "@type": "Person", name: AUTHOR.name, url: `${SITE_URL}/sobre` },
      publisher: {
        "@type": "Organization",
        name: "Abacaxi",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-abacaxi-email.png` },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  const others = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div style={{ background: "var(--color-background-soft)" }}>
        <div className="container" style={{ paddingTop: 72, paddingBottom: 56 }}>
          <div style={{ maxWidth: 720 }}>
            <nav aria-label="Você está em" style={{ fontSize: "0.875rem", marginBottom: 20 }}>
              <Link href="/" style={{ opacity: 0.7 }}>Início</Link>
              <span aria-hidden="true" style={{ opacity: 0.4 }}> / </span>
              <Link href="/blog" style={{ opacity: 0.7 }}>Blog</Link>
            </nav>

            <h1
              style={{
                fontSize: "2.25rem",
                fontWeight: 700,
                lineHeight: 1.2,
                margin: "0 0 16px",
              }}
            >
              {post.title}
            </h1>

            {post.newsletter && (
              <p style={{ margin: "0 0 12px", fontSize: "1rem", lineHeight: 1.7, opacity: 0.85 }}>
                <em>
                  Este texto foi publicado originalmente em{" "}
                  <time dateTime={post.newsletter.sentAt}>
                    {formatDate(post.newsletter.sentAt)}
                  </time>
                  , como parte da {NEWSLETTER_NAME} (edição {post.newsletter.edition}).
                </em>
              </p>
            )}

            <p style={{ margin: 0, fontSize: "0.875rem", opacity: 0.65 }}>
              Por {AUTHOR.name} ·{" "}
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> ·{" "}
              {readingMinutes(post.body)} min de leitura
            </p>
          </div>
        </div>
      </div>

      <div style={{ background: "#ffffff" }}>
        <div className="container" style={{ paddingTop: 48, paddingBottom: 56 }}>
          <article style={{ maxWidth: 720 }}>
            <PostBody body={post.body} />

            <div style={{ marginTop: 48 }}>
              <NewsletterBox />
            </div>

            <p style={{ margin: "32px 0 0", fontSize: "0.875rem", lineHeight: 1.7, opacity: 0.65, fontStyle: "italic" }}>
              {DISCLAIMER}
            </p>
          </article>

          {others.length > 0 && (
            <section aria-labelledby="mais-textos" style={{ maxWidth: 720, marginTop: 56 }}>
              <h2 id="mais-textos" style={{ fontSize: "1.25rem", margin: "0 0 16px" }}>
                Mais textos
              </h2>
              <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 8 }}>
                {others.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} style={{ color: "var(--color-text-accent)", fontWeight: 600 }}>
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {/* Rodapé do texto: único CTA de venda, fora do corpo */}
      <div style={{ background: "var(--color-dark)", color: "#ffffff" }}>
        <div
          className="container flex-cta"
          style={{ paddingTop: 40, paddingBottom: 40, gap: 20 }}
        >
          <div style={{ maxWidth: 520 }}>
            <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: "1.125rem" }}>
              Quer olhar a sua realidade financeira por inteiro?
            </p>
            <p style={{ margin: 0, opacity: 0.85 }}>
              O primeiro passo é uma conversa. Sem compromisso.
            </p>
          </div>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Agendar uma conversa
          </a>
        </div>
      </div>
    </>
  );
}
