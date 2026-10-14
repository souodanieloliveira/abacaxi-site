# Sync "Fechar o Dia" → Exist.io

Pipeline: cada fechamento (pessoal, Abacaxi, brechó) escreve no Airtable → a linha do dia é consolidada → uma automação chama o endpoint na Vercel → ele reescala os valores e envia ao Exist.

## Variáveis de ambiente (Vercel)

- `EXIST_TOKEN` — token pessoal do app de desenvolvedor do Exist (exist.io/account/apps/). Não expira por design.
- `SYNC_SECRET` — uma string aleatória sua. A automação do Airtable manda o mesmo valor no header `x-sync-secret`.

## Ordem de instalação

1. **Setup (uma vez):** com o token no ambiente, rode

   ```
   EXIST_TOKEN=xxxxx node scripts/exist-setup.mjs
   ```

   Ele adquire os templates e cria os atributos custom. Confira no log os `name` gerados e ajuste o objeto `ATTR` no `route.ts` se algum slug vier diferente (ex.: `tarefas_de_casa`).

2. **Deploy:** suba `app/api/exist-sync/route.ts` e configure `EXIST_TOKEN` e `SYNC_SECRET` nas env vars da Vercel.

3. **Airtable:** crie uma automação com gatilho no fim do dia (ou quando o dia é marcado como concluído), ação "Executar script" com o conteúdo de `airtable-automation.js`. Mapeie os input variables para os campos do registro e cole o `SYNC_SECRET`.

## Contrato JSON (o que o endpoint espera)

- Notas e escalas em **1–10** (reescaladas para 1–9 no servidor): `notaGeral`, `notaPessoal`, `notaAbacaxi`, `notaBrecho`, `energia`, `estresse`.
- Horários em **"HH:MM"** 24h: `horaDormiu`, `horaAcordou`.
- `peso` em kg — envie só nos dias que pesar.
- Tags como true/false: `bpoFeito`, `comercialExecutado`, `conteudoProduzido`, `exercicio`, `dietaFeita`, `tarefasCasa`.
- `encontros` inteiro. `moodNote` texto (opcional).

## Detalhes

- **Sono:** `sleep_start` (minutos a partir do meio-dia), `sleep_end` (minutos a partir da meia-noite) e `sleep` (duração) são calculados a partir de `horaDormiu`/`horaAcordou`.
- **Peso esporádico:** dias sem peso ficam nulos no Exist — comportamento nativo, sem problema.
- **Trocar por wearable depois:** rode um `release` em `sleep`/`weight` (POST `/api/2/attributes/release/` com `[{"name":"sleep"}]`) e conecte a fonte; o histórico digitado continua. Como usamos os templates oficiais, a fonte assume sem série duplicada.
- **Limite:** 300 requisições/hora por token — irrelevante para uma sync diária.
