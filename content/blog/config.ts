export const SITE_URL = "https://abacaxi.cc";

/** Link de agendamento (Google Calendar) usado como CTA no rodapé de cada texto. */
export const BOOKING_URL = "https://calendar.app.google/qLViQu2e4Va2ztVZ6";

/** Formulário de inscrição hospedado no Brevo. Pode ser trocado via NEXT_PUBLIC_NEWSLETTER_URL. */
export const NEWSLETTER_SIGNUP_URL =
  process.env.NEXT_PUBLIC_NEWSLETTER_URL ||
  "https://68c8a4be.sibforms.com/serve/MUIFAFUrluGqCNQYm3nDLL702qEaDTXC7FL_JJi9Gy1wfwhBM6NGmKNTvd7obA_cXkZJd6N1Y5JWxjo8F4NoShHN4Ia3WoVnj9r9UEnXL2Fq5rzQxsUCe5qbn2Qx9yIOoDO_kvker4AkKzQta8Z7gwxl1ltOwD1rrhuEwp_v2Foa4RsQxYmH0RlQr3lXuGfWf4GDs8bY6GIjV54TCg==";

export const NEWSLETTER_NAME = "Newsletter da Abacaxi";

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
  "Este conteúdo tem finalidade educacional e não constitui recomendação de investimento. Rentabilidade passada não garante resultados futuros. Este conteúdo não substitui orientação tributária individual. Antes de tomar decisões financeiras, considere seu perfil, seus objetivos e, se necessário, busque orientação profissional.";
