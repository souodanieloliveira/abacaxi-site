import type { Metadata } from "next";
import { redirect } from "next/navigation";
import FormularioCompra from "../../../components/campanha/FormularioCompra";
import { CAMPANHA, PACOTES } from "../../../content/campanha";

// Etapa 2 da compra (20/11/2026 15:21): dados da pessoa para o pacote escolhido na etapa 1. Fora das buscas.
export const metadata: Metadata = {
  title: "Seus dados: Encontros Individuais (Black Friday)",
  robots: { index: false, follow: false },
};

export default async function ComprarPage({
  searchParams,
}: {
  searchParams: Promise<{ [chave: string]: string | string[] | undefined }>;
}) {
  const { pacote: id } = await searchParams;
  const pacote = PACOTES.find((p) => p.id === id);
  if (!pacote) redirect(CAMPANHA.caminho);

  return (
    <div style={{ background: "var(--color-background-soft)", minHeight: "70vh" }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="bf-wrap bf-wrap--estreito">
          <p className="calc-eyebrow">Black Friday · 2026</p>
          <h1 className="calc-h1">Falta pouco.</h1>
          <p className="calc-lede">Preencha seus dados para seguir para o pagamento.</p>
          <FormularioCompra pacote={pacote} />
        </div>
      </div>
    </div>
  );
}
