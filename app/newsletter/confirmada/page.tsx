import type { Metadata } from "next";
import AvisoNewsletter from "../../../components/newsletter/AvisoNewsletter";

// Página depois do clique no link de confirmação (configurada no Brevo).
export const metadata: Metadata = {
  title: "Inscrição confirmada",
  robots: { index: false, follow: false },
};

export default function ConfirmadaPage() {
  return (
    <AvisoNewsletter
      titulo="Inscrição confirmada"
      texto="Você vai receber a próxima edição da Newsletter da Abacaxi. Enquanto isso, as edições anteriores estão no blog."
      botao={{ texto: "Ler o blog", href: "/blog" }}
    />
  );
}
