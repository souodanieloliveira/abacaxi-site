import { siteContent } from "../../content/site";

export default function EmpresasPage() {
  const { empresas } = siteContent;

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      {/* INTRO */}
      <section style={{ maxWidth: 960, margin: "0 auto", marginBottom: 48 }}>
        <h1>{empresas.title}</h1>
        <p><strong>{empresas.subtitle}</strong></p>
        <h2>{empresas.headline}</h2>
        <p>{empresas.intro}</p>
      </section>

      {/* SERVIÇOS */}
      <section style={{ maxWidth: 960, margin: "0 auto" }}>
        {empresas.services.map((service) => (
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