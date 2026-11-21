import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MARCA_CAMPANHA, buscarFatura, variavel } from "../../components/campanha/servidor";
import { PAGAMENTO } from "../../content/campanha";

// Retorno da Iugu depois de qualquer pagamento (URL de sucesso da conta, 20/11/2026 14:29: "1. sim").
// A URL de sucesso vale para todas as cobranças da Iugu, inclusive as dos clientes fora da campanha. Se o endereço
// trouxer o número da fatura e ela for da campanha, a pessoa vai direto para a agenda; senão, a página agradece e
// deixa um link para quem comprou na Black Friday.
export const metadata: Metadata = {
  title: "Obrigado pelo pagamento",
  robots: { index: false, follow: false },
};

const ID_FATURA = /^[0-9A-Fa-f]{32}$|^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(-[0-9a-z]{4})?$/;

export default async function PagamentoConcluidoPage({
  searchParams,
}: {
  searchParams: Promise<{ [chave: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  // Diagnóstico (20/11/2026): ainda não se sabe que parâmetros a Iugu envia neste retorno.
  console.log("Retorno da Iugu, parâmetros:", JSON.stringify(params));

  const valores = Object.values(params).flat().filter((v): v is string => typeof v === "string");
  const candidato = valores.find((v) => ID_FATURA.test(v));
  const token = process.env.IUGU_API_TOKEN;
  if (candidato && token) {
    const id = candidato.replace(/-/g, "").slice(0, 32).toUpperCase();
    const fatura = await buscarFatura(token, id).catch(() => null);
    if (fatura && variavel(fatura, "campanha") === MARCA_CAMPANHA) redirect(PAGAMENTO.paginaAgendar);
  }

  return (
    <div style={{ background: "var(--color-background-soft)", minHeight: "70vh" }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="bf-wrap">
          <h1 className="calc-h1">Obrigado pelo pagamento.</h1>
          <p className="calc-lede">Se precisar de algo, é só falar com a gente.</p>
          <p className="bf-agenda__alternativa">
            Comprou Encontros Individuais na Black Friday?{" "}
            <Link href={PAGAMENTO.paginaAgendar} data-umami-event="bf-pagamento-concluido-agenda">
              Agende o seu primeiro encontro
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
