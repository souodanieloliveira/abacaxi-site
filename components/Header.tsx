import Link from "next/link";

export default function Header() {
  return (
    <header style={{ borderBottom: "1px solid #eee" }}>
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "system-ui",
        }}
      >
        <Link href="/" style={{ fontWeight: "bold", textDecoration: "none" }}>
          Abacaxi
        </Link>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link href="/pessoas">Pessoas</Link>
          <Link href="/empresas">Empresas</Link>
          <Link href="/educacao">Educação</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/blog">Blog</Link>

          <Link
            href="/contato"
            style={{
              padding: "8px 12px",
              border: "1px solid #000",
              textDecoration: "none",
            }}
          >
            Fale com a Abacaxi
          </Link>
        </div>
      </nav>
    </header>
  );
}