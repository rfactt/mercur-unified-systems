const express = require("express");

const contactLimiter = require("../middleware/contact-rate-limit");
const validateContact = require("../middleware/validate-contact");
const { createContactLead } = require("../controllers/contact.controller");

const router = express.Router();

router.post("/", contactLimiter, validateContact, createContactLead);

module.exports = router;