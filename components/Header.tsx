"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

// Cabeçalho refeito em 16/11/2026 (Daniel: "o header móvel também não está funcionando visualmente").
// Antes, ele só aparecia depois de rolar a página. Agora fica visível desde o topo e acompanha a rolagem.
// No celular: logo, botão "Fale conosco" e ícone de menu; o menu abre em tela cheia e não fecha ao rolar.
// Roxo-escuro (opção C, Daniel em 16/11/2026 14:10), com o logo sem "planejamento financeiro" e texto branco
// (14:20). No celular, o botão é de contorno branco, para o laranja não brigar com o do logo (14:20).

// 27/11/2026: "Educação" virou "Cursos" e "Blog" saiu do menu, com "Conteúdos" no lugar (conversa de Marketing).
// O /blog (descasca.) continua no ar, com link em /conteudos e no rodapé.
const navLinks = [
  { href: "/pessoas", label: "Pessoas", title: "Serviços para pessoas físicas" },
  { href: "/empresas", label: "Empresas", title: "Serviços para empresas" },
  { href: "/cursos", label: "Cursos", title: "Cursos de educação financeira" },
  { href: "/sobre", label: "Sobre", title: "Sobre a Abacaxi" },
  { href: "/conteudos", label: "Conteúdos", title: "Conteúdos gratuitos da Abacaxi" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Com o menu aberto, a página de trás não rola; Esc fecha o menu.
  useEffect(() => {
    if (!menuOpen) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = anterior;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <nav className="container site-header__barra" aria-label="Principal">
        <Link href="/" title="Abacaxi – Página inicial" className="site-header__logo" onClick={() => setMenuOpen(false)}>
          <img src="/logo-abacaxi-header-claro.png" alt="Abacaxi" width={2272} height={522} />
        </Link>

        <div className="nav-links">
          {navLinks.map(({ href, label, title }) => (
            <Link key={href} href={href} title={title}>
              {label}
            </Link>
          ))}
          <Link href="/contato" data-umami-event="contato-cabecalho" className="btn-primary" title="Fale com a Abacaxi">
            Fale com a Abacaxi
          </Link>
        </div>

        <div className="site-header__celular">
          <Link href="/contato" data-umami-event="contato-cabecalho" className="site-header__contato" title="Fale com a Abacaxi" onClick={() => setMenuOpen(false)}>
            Fale conosco
          </Link>
          <button
            type="button"
            className="nav-hamburger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="menu-celular"
          >
            {menuOpen ? <X size={26} strokeWidth={2} /> : <Menu size={26} strokeWidth={2} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="menu-celular" className="site-header__menu">
          <div className="container">
            {navLinks.map(({ href, label, title }) => (
              <Link
                key={href}
                href={href}
                title={title}
                onClick={() => setMenuOpen(false)}
                className="site-header__item"
                aria-current={pathname === href ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contato" data-umami-event="contato-cabecalho"
              title="Fale com a Abacaxi"
              onClick={() => setMenuOpen(false)}
              className="btn-primary site-header__botao-menu"
            >
              Fale com a Abacaxi
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
