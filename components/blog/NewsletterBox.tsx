import { NEWSLETTER_NAME } from "../../content/blog/config";

// O botão leva para /newsletter (formulário do Brevo dentro do site, 12/11/2026). Link comum <a>, com
// navegação completa, para os scripts do Brevo e do reCAPTCHA carregarem na página.

export default function NewsletterBox() {
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
          color: "var(--color-dark)",
          margin: "0 0 8px",
        }}
      >
        Receba a {NEWSLETTER_NAME} por e-mail
      </h2>
      <p style={{ margin: "0 0 20px", opacity: 0.85, lineHeight: 1.7 }}>
        A {NEWSLETTER_NAME}, a newsletter da Abacaxi, chega a cada duas semanas, com um texto
        sobre decisões financeiras que valem a reflexão.
      </p>
      <a href="/newsletter" className="btn-primary" data-umami-event="newsletter-quadro">
        Assinar a {NEWSLETTER_NAME}
      </a>
    </aside>
  );
}
