import type { Metadata } from "next";

// Política de Privacidade do site e da Newsletter da Abacaxi.
// Texto aprovado por Daniel em 30/10/2026 (conversa "Site abacaxi.cc").
// Dados de contratações específicas ficam em contratos particulares; Encontros e cursos terão página própria.

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Abacaxi trata os dados pessoais coletados no site abacaxi.cc e na Newsletter da Abacaxi.",
  alternates: { canonical: "https://abacaxi.cc/privacidade" },
  openGraph: { url: "https://abacaxi.cc/privacidade" },
};

const ATUALIZADA_EM = "30 de outubro de 2026";

export default function PrivacidadePage() {
  return (
    <>
      <div style={{ background: "var(--color-background-soft)" }}>
        <div className="container" style={{ paddingTop: 72, paddingBottom: 56 }}>
          <div style={{ maxWidth: 720 }}>
            <h1
              style={{
                fontSize: "2.25rem",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "var(--color-text-main)",
                margin: "0 0 12px",
              }}
            >
              Política de Privacidade
            </h1>
            <p style={{ margin: 0, opacity: 0.7 }}>Última atualização: {ATUALIZADA_EM}</p>
          </div>
        </div>
      </div>

      <div style={{ background: "#ffffff" }}>
        <div className="container" style={{ paddingTop: 48, paddingBottom: 72 }}>
          <div className="post-body" style={{ maxWidth: 720 }}>
            <p>
              Esta política explica como a Abacaxi trata os dados pessoais coletados no site
              abacaxi.cc e na Newsletter da Abacaxi. Os dados dos clientes relativos a contratações
              específicas serão tratados em contratos particulares.
            </p>

            <h2>Quem trata os seus dados</h2>
            <p>
              Abacaxi Serviços Financeiros Ltda., CNPJ 12.329.221/0001-97, Goiânia/GO.
              <br />
              Encarregado: Daniel Oliveira,{" "}
              <a href="mailto:fale-com@abacaxi.cc">fale-com@abacaxi.cc</a>.
            </p>

            <h2>Quais dados coletamos e para quê</h2>
            <ul>
              <li>
                <strong>Newsletter:</strong> seu e-mail e o registro do seu consentimento, para enviar a
                newsletter. Você pode cancelar a qualquer momento pelo link no fim de cada e-mail.
              </li>
              <li>
                <strong>Formulário de contato:</strong> nome, empresa (se você informar), e-mail,
                mensagem e serviço de interesse, para responder ao seu contato.
              </li>
              <li>
                <strong>Lista de espera:</strong> seu e-mail, para avisar quando o que você pediu
                estiver disponível.
              </li>
              <li>
                <strong>Agendamento, WhatsApp e e-mail:</strong> os dados que você mesmo informar nesses
                canais, para marcar e realizar a conversa.
              </li>
              <li>
                <strong>Acesso ao site:</strong> dados técnicos, como endereço IP, navegador e data e
                hora do acesso, guardados pela hospedagem para a segurança e o funcionamento do site.
              </li>
            </ul>
            <p>Não usamos cookies de rastreamento nem ferramentas de publicidade no site.</p>

            <h2>Com quem compartilhamos</h2>
            <p>
              Só com os serviços que usamos para operar: Brevo (newsletter), Airtable (contatos e lista
              de espera), Google (agenda e e-mail) e Vercel (hospedagem). Alguns guardam os dados fora
              do Brasil. Não vendemos nem cedemos seus dados a ninguém.
            </p>

            <h2>Por quanto tempo guardamos</h2>
            <ul>
              <li>Newsletter: enquanto a sua inscrição estiver ativa.</li>
              <li>Contatos que não viram clientes: 12 meses.</li>
              <li>Lista de espera: 12 meses.</li>
            </ul>
            <p>
              Depois desses prazos, os dados são apagados, salvo quando a lei exigir que fiquem
              guardados.
            </p>

            <h2>Seus direitos</h2>
            <p>Pela LGPD, você pode pedir:</p>
            <ul>
              <li>a confirmação de que tratamos seus dados, e o acesso a eles;</li>
              <li>a correção de dados errados;</li>
              <li>a exclusão dos dados;</li>
              <li>a portabilidade para outro fornecedor;</li>
              <li>informações sobre com quem compartilhamos.</li>
            </ul>
            <p>
              Você também pode retirar o seu consentimento quando quiser. Para qualquer pedido,
              escreva para <a href="mailto:fale-com@abacaxi.cc">fale-com@abacaxi.cc</a>. Você também
              pode reclamar à ANPD (Autoridade Nacional de Proteção de Dados).
            </p>

            <h2>Mudanças nesta política</h2>
            <p>Quando esta política mudar, a data no topo será atualizada.</p>
          </div>
        </div>
      </div>
    </>
  );
}
