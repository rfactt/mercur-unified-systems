const nodemailer = require("nodemailer");

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

async function sendLeadEmail(lead) {
  const requiredConfig = [
    process.env.SMTP_HOST,
    process.env.SMTP_PORT,
    process.env.SMTP_USER,
    process.env.SMTP_PASS,
    process.env.MAIL_FROM,
    process.env.MAIL_TO
  ];

  const hasMissingConfig = requiredConfig.some(function (value) {
    return !value;
  });

  if (hasMissingConfig) {
    console.warn("Envio de e-mail ignorado: configuração SMTP incompleta.");
    return;
  }

  const transporter = createTransporter();

  const subject = `Novo lead Mercur — ${lead.company}`;

  const text = `
Novo lead recebido pelo formulário da Mercur.

Nome: ${lead.name}
Empresa: ${lead.company}
E-mail: ${lead.email}
WhatsApp: ${lead.phone || "Não informado"}
Problema operacional: ${lead.operation}
Mensagem: ${lead.message || "Não informada"}
Data de envio: ${lead.createdAt}
`;

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    replyTo: lead.email,
    subject,
    text
  });
}

module.exports = {
  sendLeadEmail
};