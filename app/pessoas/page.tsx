import { siteContent } from "../../content/site";

export default function PessoasPage() {
  const { pessoas } = siteContent;

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      {/* INTRO */}
      <section style={{ maxWidth: 960, margin: "0 auto", marginBottom: 48 }}>
        <h1>{pessoas.title}</h1>
        <p><strong>{pessoas.subtitle}</strong></p>
        <h2>{pessoas.headline}</h2>
        <p>{pessoas.intro}</p>
      </section>

      {/* SERVIÇOS */}
      <section style={{ maxWidth: 960, margin: "0 auto" }}>
        {pessoas.services.map((service) => (
          <div
            key={service.name}
            style={{
              borderTop: "1px solid #eee",
              paddingTop: 24,
              marginBottom: 32,
            }}
          >
            <h3>{service.name}</h3>
            <p>{service.description}</p>

            <ul>
              {service.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}