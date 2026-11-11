import type { Metadata } from "next";
import AvisoNewsletter from "../../../components/newsletter/AvisoNewsletter";

// Página depois do clique no link de confirmação (configurada no Brevo).
export const metadata: Metadata = {
  title: "Inscrição Confirmada",
  robots: { index: false, follow: false },
};

export default function ConfirmadaPage() {
  return (
    <AvisoNewsletter
      titulo="Inscrição Confirmada"
      texto={[
        "Você vai receber a próxima edição da Newsletter da Abacaxi na sua caixa de entrada.",
        "Enquanto isso, confira as edições anteriores no link abaixo.",
      ]}
      botao={{ texto: "Ler o blog", href: "/blog" }}
    />
  );
}
