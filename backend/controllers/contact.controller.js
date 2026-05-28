const { saveLead } = require("../services/lead-storage.service");
const { sendLeadEmail } = require("../services/mail.service");

async function createContactLead(req, res) {
  const {
    name,
    company,
    email,
    phone,
    operation,
    message
  } = req.body;

  const lead = {
    name: String(name).trim(),
    company: String(company).trim(),
    email: String(email).trim().toLowerCase(),
    phone: phone ? String(phone).trim() : "",
    operation: String(operation).trim(),
    message: message ? String(message).trim() : "",
    createdAt: new Date().toISOString()
  };

  try {
    saveLead(lead);

    try {
      await sendLeadEmail(lead);
    } catch (emailError) {
      console.error("Lead salvo, mas houve erro ao enviar e-mail:", emailError.message);
    }

    return res.status(201).json({
      success: true,
      message: "Solicitação recebida com sucesso."
    });
  } catch (error) {
    console.error("Erro ao processar lead:", error);

    return res.status(500).json({
      success: false,
      message: "Não foi possível processar a solicitação."
    });
  }
}

module.exports = {
  createContactLead
};