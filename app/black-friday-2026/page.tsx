import type { Metadata } from "next";
import Image from "next/image";
import { CalendarCheck, ListChecks, Video } from "lucide-react";
import BarraFixa from "../../components/campanha/BarraFixa";
import EscolhaPacotes from "../../components/campanha/EscolhaPacotes";
import { BOOKING_URL } from "../../content/blog/config";
import { PACOTES, reais } from "../../content/campanha";
import { siteContent } from "../../content/site";

// Página de venda da Black Friday 2026 (escopo do Log de Marketing, 19/11/2026 21:40 e 22:03; endereço com o ano,
// 19/11/2026 22:37). Etapa 1 da compra: escolha do pacote; os dados ficam em /black-friday-2026/comprar.
// 20/11/2026 15:21: sem atalhos para o guia e a calculadora e sem a conversa gratuita. 15:39: desenho de página de venda,
// com moldura própria (layout.tsx), pacote de 2 encontros em destaque, depoimento, "Quem conduz" e perguntas frequentes.
// Depois de 04/12, a página continua no ar e mostra "campanha encerrada" no lugar dos botões.
export const metadata: Metadata = {
  title: "Black Friday Abacaxi: Encontros Individuais com desconto",
  description:
    "De 24 de novembro a 4 de dezembro de 2026, Encontros Individuais de planejamento financeiro com desconto. A única promoção do ano.",
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

export default function BlackFridayPage() {
  return (
    <main>
      <section className="lp-hero">
        <div className="lp-faixa">
          <span className="lp-selo">Black Friday Abacaxi</span>
          <h1 className="lp-hero__titulo">Encontros Individuais na única promoção do ano.</h1>
          <p className="lp-hero__texto">
            Planejamento financeiro a partir de <strong>3x de {reais(menorPreco / 3)}</strong> sem juros.
          </p>
          <p className="lp-hero__prazo">De 24 de novembro a 4 de dezembro.</p>
          <a href="#bf-pacotes" className="btn-primary lp-botao" data-umami-event="bf-escolher-topo">
            Escolher meu pacote
          </a>
        </div>
      </section>

      <section className="lp-faixa lp-pontos">
        <div className="lp-ponto">
          <Video aria-hidden="true" className="lp-ponto__icone" />
          <p>
            <strong>Online, 60 minutos.</strong> Por videochamada, de onde você estiver.
          </p>
        </div>
        <div className="lp-ponto">
          <ListChecks aria-hidden="true" className="lp-ponto__icone" />
          <p>
            <strong>Próximos passos definidos.</strong> A gente entende o seu momento, olha os números e você sai sabendo o que fazer.
          </p>
        </div>
        <div className="lp-ponto">
          <CalendarCheck aria-hidden="true" className="lp-ponto__icone" />
          <p>
            <strong>Vale por 60 dias.</strong> Contados da data da compra, para você encaixar na sua agenda.
          </p>
        </div>
      </section>

      <section className="lp-faixa lp-secao">
        <h2 className="lp-secao__titulo">Escolha o seu pacote</h2>
        <EscolhaPacotes conversaUrl={BOOKING_URL} />
      </section>

      <section className="lp-faixa lp-secao">
        <blockquote className="lp-depoimento">
          <p>“{depoimento.testimonial}”</p>
          <footer>Ricardo Barcelos</footer>
        </blockquote>
      </section>

      <section className="lp-faixa lp-secao lp-quem">
        <Image src="/daniel-oliveira.jpg" alt="Daniel Oliveira" width={1000} height={980} className="lp-quem__foto" />
        <div>
          <h2 className="lp-secao__titulo">Quem conduz os encontros</h2>
          <p>
            Daniel Oliveira, planejador financeiro e fundador da Abacaxi. Há mais de 9 anos ajuda pessoas a organizar o
            dinheiro e tomar decisões com clareza, sem vínculo com bancos ou corretoras.
          </p>
          <div className="lp-numeros">
            {numeros.map((n) => (
              <div key={n.label}>
                <p className="lp-numeros__valor">{n.valor}</p>
                <p className="lp-numeros__rotulo">{n.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-faixa lp-secao">
        <h2 className="lp-secao__titulo">Perguntas frequentes</h2>
        <div className="lp-perguntas">
          {PERGUNTAS.map((q) => (
            <details key={q.p} className="lp-pergunta">
              <summary>{q.p}</summary>
              <p>{q.r}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="lp-fecho">
        <div className="lp-faixa">
          <p className="lp-fecho__titulo">A única promoção do ano, até 4 de dezembro.</p>
          <a href="#bf-pacotes" className="btn-primary lp-botao" data-umami-event="bf-escolher-fim">
            Escolher meu pacote
          </a>
        </div>
      </section>

      <BarraFixa />
    </main>
  );
}
