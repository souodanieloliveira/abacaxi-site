import Script from "next/script";
import { EBOOK_FORM_URL } from "../../content/ebook";

// Formulário "Material Rico" do Brevo dentro de /ebook (decisão de Daniel em 12/11/2026, opção b).
// Marcação, nomes de campos, ids e scripts vêm do código HTML gerado pelo Brevo (Compartilhar > HTML);
// o visual é o do site (estilos .ebook-form em globals.css; a folha de estilos do Brevo não é carregada). O Brevo continua cuidando da lista, do
// reCAPTCHA, do e-mail com o ebook (modelo 9) e do envio para /ebook/obrigado.
// Se o formulário mudar no Brevo (campos, textos, lista), este arquivo precisa ser atualizado junto.

// Chave do site (pública) do reCAPTCHA v3 da Abacaxi (tipo v3, baseada em pontuação), confirmada por Daniel em 12/11/2026 15:59. A chave secreta fica só no Brevo.
const RECAPTCHA_SITE_KEY = "6LcOqAguAAAAAAzcWQSWrHLWTyvTsA2vTovlmrOn";

const MENSAGENS_BREVO = `
  window.REQUIRED_CODE_ERROR_MESSAGE = 'Escolha um código de país';
  window.LOCALE = 'pt';
  window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "A informação fornecida não é valida. Verifique o formato do campo e tente novamente.";
  window.REQUIRED_ERROR_MESSAGE = "Este campo não pode ser deixado em branco. ";
  window.GENERIC_INVALID_MESSAGE = "A informação fornecida não é valida. Verifique o formato do campo e tente novamente.";
  window.INVALID_NUMBER = "A informação fornecida não é valida. Verifique o formato do campo e tente novamente.";
  window.INVALID_DATE = "Insira uma data válida";
  window.REQUIRED_MULTISELECT_MESSAGE = 'Selecione pelo menos 1 opção';
  window.translation = { common: { selectedList: '{quantity} lista selecionada', selectedLists: '{quantity} listas selecionadas', selectedOption: '{quantity} selecionado', selectedOptions: '{quantity} selecionados' } };
  var AUTOHIDE = Boolean(0);
`;

function IconeAviso() {
  return (
    <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon" aria-hidden="true">
      <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
    </svg>
  );
}

export default function FormularioEbook() {
  return (
    <div className="sib-form ebook-form">
      <div id="sib-form-container" className="sib-form-container">
        <div id="error-message" className="sib-form-message-panel ebook-form__aviso ebook-form__aviso--erro">
          <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
            <IconeAviso />
            <span className="sib-form-message-panel__inner-text">Seu cadastro não pôde ser validado.</span>
          </div>
        </div>
        <div></div>
        <div id="success-message" className="sib-form-message-panel ebook-form__aviso ebook-form__aviso--sucesso">
          <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
            <span className="sib-form-message-panel__inner-text">Você se cadastrou com sucesso.</span>
          </div>
        </div>
        <div></div>
        <div id="sib-container" className="sib-container--large sib-container--vertical">
          <form id="sib-form" method="POST" action={EBOOK_FORM_URL} data-type="subscription">
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
                      Insira seu e-mail para acessar o material
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
                          Quero acessar o material. Saiba como tratamos seus dados em nossa{" "}
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
                  Acessar
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
