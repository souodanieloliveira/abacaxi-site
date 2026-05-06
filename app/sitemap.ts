import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://abacaxi.cc";
  const lastModified = new Date();

  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/pessoas`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/empresas`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/educacao`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/sobre`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contato`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
}
