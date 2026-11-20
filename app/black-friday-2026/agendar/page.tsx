import type { Metadata } from "next";
import { AGENDA_EMBED_URL, AGENDA_ENCONTRO_URL } from "../../../content/campanha";

// Página de retorno da Iugu depois do pagamento da campanha (20/11/2026 13:47: "para uma página", com a agenda
// embutida). Textos de 20/11/2026 15:13–15:21 (Daniel). A página não confere o pagamento: quem tiver o endereço vê o
// texto de pagamento concluído. O recibo da Iugu está ligado (conferido em 20/11/2026 15:18). Fora das buscas.
export const metadata: Metadata = {
  title: "Agende o seu encontro",
  robots: { index: false, follow: false },
};

export default function AgendarPage() {
  return (
    <div style={{ background: "var(--color-background-soft)", minHeight: "70vh" }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="bf-wrap">
          <p className="calc-eyebrow">Black Friday Abacaxi</p>
          <h1 className="calc-h1">Agende o seu encontro.</h1>
          <p className="calc-lede">Seu pagamento foi concluído. Você vai receber o comprovante por e-mail.</p>
          <p className="calc-lede bf-agenda__passo">O próximo passo é agendar o seu encontro.</p>
          <p className="calc-lede bf-agenda__passo">Na janela abaixo, escolha o dia e o horário que funcionam melhor para você.</p>
          <p className="calc-lede bf-agenda__passo">O encontro é online, por videochamada, e dura 60 minutos.</p>
          <div className="bf-agenda">
            <iframe src={AGENDA_EMBED_URL} title="Agenda do primeiro Encontro Individual" className="bf-agenda__quadro" loading="lazy" />
          </div>
          <p className="bf-agenda__alternativa">
            A agenda não carregou?{" "}
            <a href={AGENDA_ENCONTRO_URL} target="_blank" rel="noopener" data-umami-event="bf-agenda-outra-aba">
              Abrir a agenda em outra aba
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
