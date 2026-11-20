"use client";

import { usePathname } from "next/navigation";

/**
 * Esconde o "chrome" do site (Header/Footer) em rotas standalone como
 * /auth/* — usadas para fluxos internos (ex.: callback OAuth da Conta Azul).
 * O Footer continua sendo um Server Component: ele é passado como children e
 * apenas renderizado (ou não) por este client wrapper.
 */
export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // /black-friday-2026: página de venda com moldura própria (app/black-friday-2026/layout.tsx), 20/11/2026.
  if (pathname?.startsWith("/auth") || pathname?.startsWith("/black-friday-2026")) {
    return null;
  }

  return <>{children}</>;
}
