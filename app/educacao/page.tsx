import { siteContent } from "../../content/site";

export default function EducacaoPage() {
  const { educacao } = siteContent;

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      {/* INTRO */}
      <section style={{ maxWidth: 960, margin: "0 auto", marginBottom: 48 }}>
        <h1>{educacao.title}</h1>
        <p><strong>{educacao.subtitle}</strong></p>
        <h2>{educacao.headline}</h2>
      </section>

      {/* FORMATOS */}
      <section style={{ maxWidth: 960, margin: "0 auto", marginBottom: 48 }}>
        <h3>Como a Abacaxi atua com educação financeira</h3>

        <ul>
          {educacao.formats.map((format) => (
            <li key={format}>{format}</li>
          ))}
        </ul>
      </section>

      {/* EM DESENVOLVIMENTO */}
      <section style={{ maxWidth: 960, margin: "0 auto" }}>
        <h3>Cursos e conteúdos em desenvolvimento</h3>
        <p>{educacao.upcoming}</p>
      </section>
    </main>
  );
}