import { siteContent } from "../../content/site";

export default function SobrePage() {
  const { sobre } = siteContent;

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <section style={{ maxWidth: 960, margin: "0 auto" }}>
        <h1>{sobre.title}</h1>

        {sobre.sections.map((section) => (
          <div key={section.title} style={{ marginBottom: 32 }}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}