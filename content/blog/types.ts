export interface BlogPost {
  /** Parte final da URL: /blog/<slug>. Não mude depois de publicado. */
  slug: string;
  title: string;
  /** Resumo de 120–160 caracteres, usado no Google e nas redes. */
  description: string;
  /** Data de publicação original do texto (AAAA-MM-DD). */
  publishedAt: string;
  /** Preencha só se o texto for revisado depois de publicado (AAAA-MM-DD). */
  updatedAt?: string;
  /** Edição da newsletter em que o texto saiu primeiro. */
  newsletter?: { edition: number; sentAt: string };
  /** Frase extra anexada ao aviso padrão no fim do texto (opcional). */
  disclaimerExtra?: string;
  keywords?: string[];
  /**
   * Corpo em markdown simples: parágrafos separados por linha em branco;
   * "## " para subtítulo; **negrito**; *itálico*; [texto](url) para links;
   * tabela com linhas "| a | b |" e separador "|---|---:|" (":" à direita alinha à direita).
   */
  body: string;
}
