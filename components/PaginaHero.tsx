import Image from "next/image";
import Link from "next/link";

// Primeira tela das páginas (16/11/2026): texto sobre fundo lavanda e foto inteira, sem texto sobre a
// imagem. No celular, a foto vem abaixo do texto; no computador, ao lado. Mesmo padrão na página inicial
// e nas páginas Pessoas, Empresas, Educação e Sobre (Daniel, 14:10: "vamos manter o padrão nas demais páginas").

type Props = {
  rotulo?: string;
  titulo: string;
  frase?: string;
  imagem?: string; // sem imagem: só o texto (Contato, 18/11/2026)
  alt?: string;
  botao?: { texto: string; href: string; title: string };
  principal?: boolean; // página inicial: título maior e texto centralizado no celular
};

export default function PaginaHero({ rotulo, titulo, frase, imagem, alt, botao, principal = false }: Props) {
  return (
    <section className={(principal ? "home-hero home-hero--principal" : "home-hero") + (imagem ? "" : " home-hero--sem-foto")}>
      <div className="container home-hero__grade">
        <div className="home-hero__texto">
          {rotulo && <p className="home-hero__rotulo">{rotulo}</p>}
          <h1 className="home-hero__titulo">{titulo}</h1>
          {frase && <p className="home-hero__frase">{frase}</p>}
          {botao && (
            <Link href={botao.href} data-umami-event="cta-topo" className="btn-primary home-hero__botao" title={botao.title}>
              {botao.texto}
            </Link>
          )}
        </div>
        {imagem && (
        <div className="home-hero__foto">
          <Image
            src={imagem}
            alt={alt ?? ""}
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "50% 35%" }}
          />
        </div>
        )}
      </div>
    </section>
  );
}
