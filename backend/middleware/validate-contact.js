function normalizeField(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function validateContact(req, res, next) {
  const name = normalizeField(req.body.name);
  const company = normalizeField(req.body.company);
  const email = normalizeField(req.body.email).toLowerCase();
  const phone = normalizeField(req.body.phone);
  const operation = normalizeField(req.body.operation);
  const message = normalizeField(req.body.message);
  const website = normalizeField(req.body.website);

  const allowedOperations = [
    "sistemas-desconectados",
    "dados-espalhados",
    "processos-manuais",
    "falta-de-visao",
    "outro"
  ];

  if (website) {
    return res.status(400).json({
      success: false,
      message: "Envio bloqueado."
    });
  }

  if (!name || !company || !email || !operation) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos obrigatórios."
    });
  }

  if (name.length > 80) {
    return res.status(400).json({
      success: false,
      message: "O nome informado é muito longo."
    });
  }

  if (company.length > 120) {
    return res.status(400).json({
      success: false,
      message: "O nome da empresa é muito longo."
    });
  }

  if (email.length > 120) {
    return res.status(400).json({
      success: false,
      message: "O e-mail informado é muito longo."
    });
  }

  if (phone.length > 30) {
    return res.status(400).json({
      success: false,
      message: "O telefone informado é muito longo."
    });
  }

  if (message.length > 1200) {
    return res.status(400).json({
      success: false,
      message: "A mensagem é muito longa."
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Informe um e-mail válido."
    });
  }

  if (!allowedOperations.includes(operation)) {
    return res.status(400).json({
      success: false,
      message: "Selecione uma opção válida."
    });
  }

  req.body = {
    name,
    company,
    email,
    phone,
    operation,
    message
  };

  next();
}

module.exports = validateContact;