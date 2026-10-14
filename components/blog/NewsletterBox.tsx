import { NEWSLETTER_NAME, NEWSLETTER_SIGNUP_URL } from "../../content/blog/config";

export default function NewsletterBox() {
  const isMail = NEWSLETTER_SIGNUP_URL.startsWith("mailto:");

  return (
    <aside
      aria-labelledby="newsletter-title"
      style={{
        background: "var(--color-background-soft)",
        borderRadius: 12,
        padding: "28px 28px 32px",
      }}
    >
      <h2
        id="newsletter-title"
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "var(--color-text-accent)",
          margin: "0 0 8px",
        }}
      >
        Receba os próximos textos por e-mail
      </h2>
      <p style={{ margin: "0 0 20px", opacity: 0.85, lineHeight: 1.7 }}>
        A {NEWSLETTER_NAME} chega a cada quinze dias, com um texto sobre decisões
        financeiras que valem a reflexão.
      </p>
      <a
        href={NEWSLETTER_SIGNUP_URL}
        className="btn-primary"
        {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      >
        Assinar a newsletter
      </a>
    </aside>
  );
}
