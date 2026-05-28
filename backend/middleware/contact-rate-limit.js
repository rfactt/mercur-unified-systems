const rateLimit = require("express-rate-limit");

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo de 5 envios por IP nesse período
  message: {
    success: false,
    message: "Muitas tentativas de envio. Tente novamente em alguns minutos."
  }
});

module.exports = contactLimiter;