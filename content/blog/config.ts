export const SITE_URL = "https://abacaxi.cc";

/** Link de agendamento (Google Calendar) usado como CTA no rodapé de cada texto. */
export const BOOKING_URL = "https://calendar.app.google/qLViQu2e4Va2ztVZ6";

/**
 * Link de inscrição na newsletter.
 * Quando existir um formulário hospedado no Brevo, defina NEXT_PUBLIC_NEWSLETTER_URL
 * (Vercel → Settings → Environment Variables). Enquanto não houver, o botão abre
 * um e-mail pedindo a inscrição, para nunca ficar sem destino.
 */
export const NEWSLETTER_SIGNUP_URL =
  process.env.NEXT_PUBLIC_NEWSLETTER_URL ||
  "mailto:fale-com@abacaxi.cc?subject=Quero%20receber%20a%20newsletter%20da%20Abacaxi";

export const NEWSLETTER_NAME = "Newsletter Pública da Abacaxi";

export const AUTHOR = {
  name: "Daniel Oliveira",
  bio: "Fundador da Abacaxi, consultoria de planejamento financeiro em Goiânia.",
};

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/hero-abacaxi.png`,
  width: 1200,
  height: 630,
};

export const DISCLAIMER =
  "Este conteúdo tem finalidade educacional e não constitui recomendação de investimento. Rentabilidade passada não garante resultados futuros. Antes de tomar decisões financeiras, considere seu perfil, seus objetivos e, se necessário, busque orientação profissional.";
