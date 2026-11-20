import type { Metadata } from "next";
import { AGENDA_EMBED_URL, AGENDA_ENCONTRO_URL } from "../../../content/campanha";

// Página de retorno da Iugu depois do pagamento da campanha (20/11/2026 13:47: "para uma página", com a agenda
// embutida). Não diz "pagamento confirmado", porque qualquer pessoa pode abrir o endereço. Fora das buscas.
export const metadata: Metadata = {
  title: "Agende o seu primeiro encontro",
  robots: { index: false, follow: false },
};

export default function AgendarPage() {
  return (
    <div style={{ background: "var(--color-background-soft)", minHeight: "70vh" }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="bf-wrap">
          <p className="calc-eyebrow">Black Friday · 2026</p>
          <h1 className="calc-h1">Agora, agende o seu primeiro encontro.</h1>
          <p className="calc-lede">Escolha o dia e o horário que funcionam para você. O encontro é online, por videochamada, e dura 60 minutos.</p>
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
