# Backend — Mercur Unified Systems Corporation

Backend simples em Node.js/Express para receber solicitações do formulário de contato/demonstração da landing page da Mercur.

## Objetivo

Este backend recebe os dados enviados pelo formulário `contato.html`, valida as informações no servidor, aplica proteção básica contra spam, salva os leads localmente e deixa o envio por e-mail preparado para configuração futura.

## Tecnologias usadas

* Node.js
* Express
* CORS
* Dotenv
* Nodemailer
* Express Rate Limit

## Estrutura atual

```txt
backend/
├── controllers/
│   └── contact.controller.js
├── data/
│   └── leads.jsonl
├── middleware/
│   ├── contact-rate-limit.js
│   └── validate-contact.js
├── routes/
│   └── contact.routes.js
├── services/
│   ├── lead-storage.service.js
│   └── mail.service.js
├── .env
├── .env.example
├── package.json
├── package-lock.json
└── server.js
```

## Como rodar localmente

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Rode o servidor:

```bash
npm start
```

Se tudo estiver certo, o terminal exibirá:

```txt
Backend Mercur rodando em http://localhost:3000
```

## Teste rápido

Com o backend rodando, abra no navegador:

```txt
http://localhost:3000
```

A resposta esperada é:

```json
{
  "success": true,
  "message": "Backend da Mercur rodando corretamente."
}
```

## Endpoint do formulário

O formulário envia os dados para:

```txt
POST /api/contact
```

Durante o desenvolvimento local, a URL usada pelo front é:

```txt
http://localhost:3000/api/contact
```

## Campos recebidos

O backend espera receber os seguintes campos:

```txt
name
company
email
phone
operation
message
website
```

O campo `website` é um honeypot, usado como proteção contra spam. Usuários reais não veem esse campo. Se ele vier preenchido, o envio é bloqueado.

## Validações aplicadas

O backend valida:

* campos obrigatórios;
* formato do e-mail;
* tamanho máximo dos campos;
* opção válida no campo `operation`;
* honeypot contra robôs;
* limite de envios repetidos por IP.

## Armazenamento local dos leads

Os leads são salvos em:

```txt
backend/data/leads.jsonl
```

Cada linha representa um lead em formato JSON.

Exemplo:

```json
{"name":"Rafael","company":"Mercur","email":"teste@email.com","phone":"11999999999","operation":"sistemas-desconectados","message":"Teste","createdAt":"2026-05-28T01:00:00.000Z"}
```

## Envio por e-mail

O envio por e-mail já está preparado usando Nodemailer, mas depende da configuração de SMTP no arquivo `.env`.

Enquanto os dados SMTP não estiverem configurados, o backend continuará funcionando normalmente e salvando os leads em `data/leads.jsonl`.

## Variáveis de ambiente

Arquivo usado:

```txt
backend/.env
```

Modelo:

```env
PORT=3000

SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

MAIL_FROM=
MAIL_TO=
```

Nunca envie o arquivo `.env` para o GitHub.

Use o arquivo `.env.example` como modelo público, sem senhas reais.

## Comando principal

```bash
npm start
```

Esse comando executa:

```bash
node server.js
```

## Observações importantes

* O frontend continua em HTML, CSS e JavaScript puro.
* O backend fica isolado dentro da pasta `backend`.
* O arquivo `leads.jsonl` pode conter dados reais de pessoas e não deve ser publicado.
* O e-mail oficial da Mercur ainda poderá ser configurado depois.
* Para produção, o ideal será migrar o armazenamento para banco de dados, como SQLite ou PostgreSQL.
