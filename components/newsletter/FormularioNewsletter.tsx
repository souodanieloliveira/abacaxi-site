import Script from "next/script";
import { NEWSLETTER_SIGNUP_URL } from "../../content/blog/config";
import { IconeAviso, MENSAGENS_BREVO, RECAPTCHA_SITE_KEY } from "../brevo/comum";

// Formulário da newsletter do Brevo dentro de /newsletter (decisão de Daniel em 12/11/2026 17:58, opção a).
// Marcação, nomes de campos, ids e scripts vêm do código HTML gerado pelo Brevo; o visual é o do site
// (estilos .ebook-form em globals.css, os mesmos do formulário do ebook). O Brevo continua cuidando da
// lista, do reCAPTCHA e da confirmação dupla (modelo 8).
// Campo NOME obrigatório incluído em 12/11/2026 18:13 (também incluído por Daniel no formulário do Brevo).
// Se o formulário mudar no Brevo (campos, textos, lista), este arquivo precisa ser atualizado junto.

export default function FormularioNewsletter() {
  return (
    <div className="sib-form ebook-form">
      <div id="sib-form-container" className="sib-form-container">
        <div id="error-message" className="sib-form-message-panel ebook-form__aviso ebook-form__aviso--erro">
          <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
            <IconeAviso />
            <span className="sib-form-message-panel__inner-text">Sua assinatura não pôde ser validada.</span>
          </div>
        </div>
        <div></div>
        <div id="success-message" className="sib-form-message-panel ebook-form__aviso ebook-form__aviso--sucesso">
          <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
            <span className="sib-form-message-panel__inner-text">Você fez sua assinatura com sucesso.</span>
          </div>
        </div>
        <div></div>
        <div id="sib-container" className="sib-container--large sib-container--vertical">
          <form id="sib-form" method="POST" action={NEWSLETTER_SIGNUP_URL} data-type="subscription">
            <div className="ebook-form__bloco">
              <div className="sib-input sib-form-block">
                <div className="form__entry entry_block">
                  <div className="form__label-row">
                    <label className="entry__label" htmlFor="NOME" data-required="*">
                      Insira seu Nome
                    </label>
                    <div className="entry__field">
                      <input
                        className="input"
                        maxLength={200}
                        type="text"
                        id="NOME"
                        name="NOME"
                        autoComplete="name"
                        placeholder="Nome e sobrenome"
                        data-required="true"
                        required
                      />
                    </div>
                  </div>
                  <label className="entry__error entry__error--primary"></label>
                </div>
              </div>
            </div>

            <div className="ebook-form__bloco">
              <div className="sib-input sib-form-block">
                <div className="form__entry entry_block">
                  <div className="form__label-row">
                    <label className="entry__label" htmlFor="EMAIL" data-required="*">
                      Insira seu e-mail para fazer sua assinatura
                    </label>
                    <div className="entry__field">
                      <input
                        className="input"
                        type="text"
                        inputMode="email"
                        id="EMAIL"
                        name="EMAIL"
                        autoComplete="email"
                        defaultValue=""
                        placeholder="seu@email.com"
                        data-required="true"
                        required
                      />
                    </div>
                  </div>
                  <label className="entry__error entry__error--primary"></label>
                </div>
              </div>
            </div>

            <div className="ebook-form__bloco">
              <div className="sib-optin sib-form-block" data-required="true">
                <div className="form__entry entry_mcq">
                  <div className="form__label-row">
                    <div className="entry__choice">
                      <label>
                        <input type="checkbox" className="input_replaced" value="1" id="OPT_IN" name="OPT_IN" required />
                        <span className="checkbox checkbox_tick_positive"></span>
                        <span className="ebook-form__consentimento">
                          Quero receber a Newsletter da Abacaxi por e-mail. Posso cancelar quando quiser. Saiba
                          como tratamos seus dados em nossa{" "}
                          <a target="_blank" href="https://abacaxi.cc/privacidade" rel="nofollow noopener">
                            Política de Privacidade
                          </a>
                          .
                          <span data-required="*" className="entry__label entry__label_optin"></span>
                        </span>
                      </label>
                    </div>
                  </div>
                  <label className="entry__error entry__error--primary"></label>
                </div>
              </div>
            </div>

            <div className="ebook-form__bloco">
              <div className="sib-form__declaration ebook-form__aviso-brevo">
                <p>
                  Trabalhamos com a Brevo para coletar seus dados e enviar nossas comunicações. Como parte
                  disso, a Brevo atua sob nossa responsabilidade e de acordo com nossas instruções.
                  Continuamos responsáveis pela forma como seus dados são usados para esse fim. A Brevo
                  também pode, por conta própria, usar alguns desses dados para ajudar a manter a plataforma
                  segura (por exemplo, para identificar tentativas de fraude ou invasão). Para saber mais
                  sobre essa parte, consulte{" "}
                  <a target="_blank" href="https://www.brevo.com/pt/legal/privacypolicy/" rel="nofollow noopener">
                    Política de Privacidade da Brevo.
                  </a>
                </p>
              </div>
            </div>

            <div className="g-recaptcha-v3" data-sitekey={RECAPTCHA_SITE_KEY} style={{ display: "none" }}></div>

            <div className="ebook-form__bloco">
              <div className="sib-form-block">
                <button
                  className="sib-form-block__button sib-form-block__button-with-loader btn-primary ebook-form__botao"
                  form="sib-form"
                  type="submit"
                >
                  <svg
                    className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon"
                    viewBox="0 0 512 512"
                    aria-hidden="true"
                  >
                    <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
                  </svg>
                  Assinar
                </button>
              </div>
            </div>

            <input type="text" name="email_address_check" defaultValue="" className="input--hidden" tabIndex={-1} autoComplete="off" />
            <input type="hidden" name="locale" value="pt" />
          </form>
        </div>
      </div>

      <Script id="brevo-mensagens" strategy="afterInteractive">
        {MENSAGENS_BREVO}
      </Script>
      <Script src="https://sibforms.com/forms/end-form/build/main.js" strategy="afterInteractive" />
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}&hl=pt`}
        strategy="afterInteractive"
      />
    </div>
  );
}
