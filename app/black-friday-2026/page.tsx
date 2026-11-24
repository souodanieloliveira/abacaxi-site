import type { Metadata } from "next";
import Image from "next/image";
import { CalendarCheck, ListChecks, Video } from "lucide-react";
import BarraFixa from "../../components/campanha/BarraFixa";
import EscolhaPacotes from "../../components/campanha/EscolhaPacotes";
import { Letreiro } from "../../components/campanha/FaixaCampanha";
import { BOOKING_URL } from "../../content/blog/config";
import { PACOTES, reais } from "../../content/campanha";
import { siteContent } from "../../content/site";

// Desenho: opção C, entre a sóbria (A) e a vibrante (B), escolhida por Daniel em 20/11/2026 15:58 ("1. sim").
// Página de venda da Black Friday 2026 (escopo do Log de Marketing, 19/11/2026 21:40 e 22:03; endereço com o ano,
// 19/11/2026 22:37). Etapa 1 da compra: escolha do pacote; os dados ficam em /black-friday-2026/comprar.
// 20/11/2026 15:21: sem atalhos para o guia e a calculadora e sem a conversa gratuita. 15:39: desenho de página de venda,
// com moldura própria (layout.tsx), pacote de 2 encontros em destaque, depoimento, "Quem conduz" e perguntas frequentes.
// Depois de 04/12, a página continua no ar e mostra "campanha encerrada" no lugar dos botões.
export const metadata: Metadata = {
  title: "Black Friday Abacaxi: Encontros Individuais com desconto",
  description:
    "De 25 de novembro a 4 de dezembro de 2026, Encontros Individuais de planejamento financeiro com desconto. A única promoção do ano.",
  alternates: { canonical: "https://abacaxi.cc/black-friday-2026" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Abacaxi",
    url: "https://abacaxi.cc/black-friday-2026",
    images: [{ url: "https://abacaxi.cc/hero-abacaxi.png", width: 1200, height: 630 }],
  },
};

const menorPreco = Math.min(...PACOTES.map((p) => p.precoCampanha));
const depoimento = siteContent.pessoas.services.find((s) => s.testimonial)!;
const numeros = siteContent.sobre.numeros;

const PERGUNTAS = [
  {
    p: "Os encontros são online?",
    r: "Sim. Os encontros são por videochamada, com duração planejada de 60 minutos cada um.",
  },
  {
    p: "Por quanto tempo vale a compra?",
    r: "Os encontros devem ser feitos em até 60 dias, contados da data da compra.",
  },
  {
    p: "Como faço o pagamento?",
    r: "Por Pix ou cartão de crédito em até 3 vezes sem juros, numa página de pagamento segura. Depois do pagamento, você já agenda o primeiro encontro.",
  },
  {
    p: "E se eu desistir?",
    r: "Você pode desistir em até 7 dias depois da compra e receber o valor de volta. Se algum encontro já tiver acontecido nesse prazo, o valor dele é descontado.",
  },
];

const FRASES = ["Única promoção do ano", "Até R$ 500 de desconto", "De 25/11 a 4/12", "Online, de onde você estiver"];

export default function BlackFridayPage() {
  return (
    <main className="lpb lpc">
      <section className="lpb-hero lpc-hero">
        <span className="lpb-bola lpb-bola--1" aria-hidden="true" />
        <span className="lpb-bola lpb-bola--2" aria-hidden="true" />
        <div className="lp-faixa lpb-hero__conteudo">
          <p className="lpb-hero__marca">Black Friday Abacaxi</p>
          <h1 className="lpb-hero__titulo">Encontros Individuais na única promoção do ano.</h1>
          <p className="lpb-hero__preco">
            a partir de <span>3x {reais(menorPreco / 3)}</span> sem juros
          </p>
          <p className="lpb-hero__prazo">De 25 de novembro a 4 de dezembro.</p>
          <a href="#bf-pacotes" className="lpb-botao lpb-botao--laranja" data-umami-event="bf-escolher-topo">
            Escolher meu pacote
          </a>
        </div>
      </section>

      {/* Mesma identidade da faixa do topo do site (Daniel, 20/11/2026 21:39). */}
      <div className="bf-faixa bf-faixa--pagina" aria-hidden="true">
        <Letreiro frases={FRASES} />
      </div>

      <section className="lpb-pontos lpc-pontos">
        <div className="lp-faixa lpb-pontos__grade">
          <div className="lpb-ponto">
            <Video aria-hidden="true" />
            <p className="lpb-ponto__titulo">Online, 60 minutos</p>
            <p>Por videochamada, de onde você estiver.</p>
          </div>
          <div className="lpb-ponto">
            <ListChecks aria-hidden="true" />
            <p className="lpb-ponto__titulo">Próximos passos definidos</p>
            <p>A gente entende o seu momento, olha os números e você sai sabendo o que fazer.</p>
          </div>
          <div className="lpb-ponto">
            <CalendarCheck aria-hidden="true" />
            <p className="lpb-ponto__titulo">Vale por 60 dias</p>
            <p>Contados da data da compra, para você encaixar na sua agenda.</p>
          </div>
        </div>
      </section>

      <section className="lp-faixa lp-secao">
        <h2 className="lpb-titulo">Escolha o seu pacote</h2>
        <EscolhaPacotes conversaUrl={BOOKING_URL} />
      </section>

      <section className="lpb-depoimento lpc-depoimento">
        <div className="lp-faixa">
          <p className="lpb-depoimento__aspas" aria-hidden="true">“</p>
          <blockquote>
            <p>{depoimento.testimonial}</p>
            <footer>Ricardo Barcelos</footer>
          </blockquote>
        </div>
      </section>

      <section className="lp-faixa lp-secao lp-quem">
        <Image src="/daniel-oliveira.jpg" alt="Daniel Oliveira" width={1000} height={980} className="lp-quem__foto lpb-quem__foto" />
        <div>
          <h2 className="lpb-titulo">Quem conduz os encontros</h2>
          <p>
            Daniel Oliveira, planejador financeiro e fundador da Abacaxi. Há mais de 9 anos ajuda pessoas a organizar o
            dinheiro e tomar decisões com clareza, sem vínculo com bancos ou corretoras.
          </p>
          <div className="lp-numeros">
            {numeros.map((n) => (
              <div key={n.label}>
                <p className="lp-numeros__valor lpb-numeros__valor">{n.valor}</p>
                <p className="lp-numeros__rotulo">{n.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-faixa lp-secao">
        <h2 className="lpb-titulo">Perguntas frequentes</h2>
        <div className="lp-perguntas">
          {PERGUNTAS.map((q) => (
            <details key={q.p} className="lp-pergunta">
              <summary>{q.p}</summary>
              <p>{q.r}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="lpb-fecho lpc-fecho">
        <div className="lp-faixa">
          <p className="lpb-fecho__titulo">A única promoção do ano, até 4 de dezembro.</p>
          <a href="#bf-pacotes" className="lpb-botao" data-umami-event="bf-escolher-fim">
            Escolher meu pacote
          </a>
        </div>
      </section>

      <BarraFixa />
    </main>
  );
}
