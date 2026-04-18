import { siteContent } from "../content/site";
import Link from "next/link";

export default function Home() {
  const { home } = siteContent;

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      {/* HERO */}
      <section style={{ maxWidth: 960, margin: "0 auto", marginBottom: 64 }}>
        <h1>{home.hero.title}</h1>
        <p>{home.hero.subtitle}</p>

        <Link href="/contato">
          <button style={{ marginTop: 16 }}>
            {home.hero.cta}
          </button>
        </Link>
      </section>

      {/* SERVIÇOS */}
      <section style={{ maxWidth: 960, margin: "0 auto", marginBottom: 64 }}>
        <h2>Como a Abacaxi pode ajudar</h2>

        <div style={{ display: "grid", gap: 24, marginTop: 24 }}>
          {home.services.map((service) => (
            <div
              key={service.title}
              style={{
                border: "1px solid #eee",
                padding: 16,
                borderRadius: 4,
              }}
            >
              <h3>{service.title}</h3>
              {service.subtitle && <p><strong>{service.subtitle}</strong></p>}
              <p>{service.description}</p>

              <Link href={service.href}>
                <span style={{ textDecoration: "underline" }}>
                  Saiba mais
                </span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCAÇÃO EM DESENVOLVIMENTO */}
      <section style={{ maxWidth: 960, margin: "0 auto" }}>
        <h2>{home.educationPreview.title}</h2>

        {home.educationPreview.text.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <ul>
          {home.educationPreview.topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>

        <Link href="/contato">
          <span style={{ textDecoration: "underline" }}>
            {home.educationPreview.cta}
          </span>
        </Link>
      </section>
    </main>
  );
}