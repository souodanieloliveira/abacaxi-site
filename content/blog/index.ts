import type { BlogPost } from "./types";
import escolhaOSeuInimigo from "./posts/escolha-o-seu-inimigo";

// Para publicar um texto novo: crie o arquivo em ./posts e adicione-o aqui.
const posts: BlogPost[] = [escolhaOSeuInimigo];

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Data ao meio-dia de Brasília, para evitar virada de dia por fuso. */
export function toDate(isoDay: string): Date {
  return new Date(`${isoDay}T12:00:00-03:00`);
}

export function formatDate(isoDay: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(toDate(isoDay));
}

export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
