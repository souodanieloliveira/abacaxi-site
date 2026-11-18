import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Umami (18/11/2026): o arquivo do contador é servido pelo próprio domínio. Pedido direto ao
  // cloud.umami.is a partir de abacaxi.cc voltava 503 e nenhuma visita era contada; pelo próprio
  // domínio, bloqueadores de anúncio também deixam de barrar o arquivo. O envio dos dados continua
  // indo direto para gateway.umami.is (padrão do script), para o país e a cidade das visitas saírem certos.
  async rewrites() {
    return [{ source: "/u/script.js", destination: "https://cloud.umami.is/script.js" }];
  },
};

export default nextConfig;
