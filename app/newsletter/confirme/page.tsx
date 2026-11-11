import type { Metadata } from "next";
import AvisoNewsletter from "../../../components/newsletter/AvisoNewsletter";

// Página depois do envio do formulário da newsletter (configurada no Brevo).
export const metadata: Metadata = {
  title: "Confira seu e-mail",
  robots: { index: false, follow: false },
};

export default function ConfirmePage() {
  return (
    <AvisoNewsletter
      titulo="Confira seu e-mail"
      texto="Enviamos um link de confirmação. Se não encontrar, olhe a caixa de spam ou de promoções."
    />
  );
}
