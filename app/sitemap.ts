import type { MetadataRoute } from "next";
import { getAllPosts, toDate } from "../content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://abacaxi.cc";
  const lastModified = new Date();
  const posts = getAllPosts();

  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/pessoas`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/empresas`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/educacao`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/sobre`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contato`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    {
      url: `${base}/blog`,
      lastModified: posts[0] ? toDate(posts[0].updatedAt ?? posts[0].publishedAt) : lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: toDate(p.updatedAt ?? p.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
