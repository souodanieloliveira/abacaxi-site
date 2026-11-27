import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Umami (18/11/2026): o arquivo do contador é servido pelo próprio domínio. Pedido direto ao
  // cloud.umami.is a partir de abacaxi.cc voltava 503 e nenhuma visita era contada; pelo próprio
  // domínio, bloqueadores de anúncio também deixam de barrar o arquivo.
  // 18/11/2026 14:10: o envio direto para gateway.umami.is a partir de abacaxi.cc também voltava 503
  // (conferido no Chrome); o envio passa a ir por abacaxi.cc/u/api/send (data-host-url="/u" no layout).
  // 27/11/2026: "Educação" passou a se chamar "Cursos"; o endereço antigo leva para o novo (permanente).
  async redirects() {
    return [
      { source: "/educacao", destination: "/cursos", permanent: true },
      // 27/11/2026: endereço curto da mensagem de WhatsApp para clientes ativos (conversa de Marketing,
      // pendência 36). Temporário (307), porque a campanha acaba em 04/12; a UTM chega ao Umami no destino.
      {
        source: "/bf-clientes",
        destination:
          "/black-friday-2026?utm_source=whatsapp&utm_medium=mensagem&utm_campaign=bf2026-clientes",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/u/script.js", destination: "https://cloud.umami.is/script.js" },
      { source: "/u/api/send", destination: "https://gateway.umami.is/api/send" },
    ];
  },
};

export default nextConfig;
