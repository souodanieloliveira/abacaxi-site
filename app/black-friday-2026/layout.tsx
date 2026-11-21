import Image from "next/image";
import Link from "next/link";

// Moldura própria da página de venda da Black Friday 2026 (20/11/2026 15:39: "pode fazer"): topo só com o logo,
// sem menu, e rodapé de uma linha. O cabeçalho e o rodapé do site ficam escondidos nestas rotas (components/ChromeGate.tsx).
export default function CampanhaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lp">
      <header className="lp-topo">
        <Image src="/logo-abacaxi-header.png" alt="Abacaxi" width={2272} height={522} className="lp-topo__logo" priority />
      </header>
      {children}
      <footer className="lp-rodape">
        <p>
          Abacaxi Serviços Financeiros Ltda. · CNPJ 12.329.221/0001-97 ·{" "}
          <Link href="/privacidade">Política de Privacidade</Link> · <Link href="/black-friday-2026/termo">Termos e Condições</Link>
        </p>
      </footer>
    </div>
  );
}
