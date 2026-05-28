const contactForm = document.querySelector(".contact-form");
const formMessage = document.querySelector("#formMessage");

const nameInput = document.querySelector("#name");
const companyInput = document.querySelector("#company");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const operationInput = document.querySelector("#operation");
const messageInput = document.querySelector("#message");
const websiteInput = document.querySelector("#website");
const submitButton = document.querySelector(".form-button");

const API_URL = "http://localhost:3000/api/contact";

function showMessage(type, text) {
  formMessage.className = `form-message ${type}`;
  formMessage.textContent = text;
}

function clearErrors() {
  const formRows = document.querySelectorAll(".form-row");

  formRows.forEach(function (row) {
    row.classList.remove("error");
  });

  formMessage.className = "form-message";
  formMessage.textContent = "";
}

function setError(input) {
  const formRow = input.closest(".form-row");

  if (formRow) {
    formRow.classList.add("error");
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  clearErrors();

  let hasError = false;

  if (nameInput.value.trim() === "") {
    setError(nameInput);
    hasError = true;
  }

  if (companyInput.value.trim() === "") {
    setError(companyInput);
    hasError = true;
  }

  if (emailInput.value.trim() === "" || !isValidEmail(emailInput.value.trim())) {
    setError(emailInput);
    hasError = true;
  }

  if (operationInput.value === "") {
    setError(operationInput);
    hasError = true;
  }

  if (hasError) {
    showMessage("error", "Preencha os campos obrigatórios antes de enviar.");
    return;
  }

 const leadData = {
  name: nameInput.value.trim(),
  company: companyInput.value.trim(),
  email: emailInput.value.trim(),
  phone: phoneInput.value.trim(),
  operation: operationInput.value,
  message: messageInput.value.trim(),
  website: websiteInput.value.trim()
};

  try {
    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(leadData)
    });

    const result = await response.json();

    if (!response.ok) {
      showMessage(
        "error",
        result.message || "Não foi possível enviar sua solicitação."
      );
      return;
    }

    showMessage(
      "success",
      "Solicitação recebida. Em breve, a equipe da Mercur entrará em contato para entender sua operação."
    );

    contactForm.reset();
  } catch (error) {
    console.error("Erro ao enviar formulário:", error);

    showMessage(
      "error",
      "Não foi possível conectar ao servidor. Verifique se o backend está rodando."
    );
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Enviar solicitação";
  }
});