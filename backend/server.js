require("dotenv").config();

const express = require("express");
const cors = require("cors");

const contactRoutes = require("./routes/contact.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Permite que o frontend converse com o backend durante o desenvolvimento
app.use(cors());

// Permite receber JSON no corpo das requisições
app.use(express.json({ limit: "20kb" }));

// Rota simples para testar se o backend está online
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend da Mercur rodando corretamente."
  });
});

// Rotas do formulário de contato
app.use("/api/contact", contactRoutes);

// Liga o servidor
app.listen(PORT, () => {
  console.log(`Backend Mercur rodando em http://localhost:${PORT}`);
});