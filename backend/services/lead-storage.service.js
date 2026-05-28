const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");
const leadsFile = path.join(dataDir, "leads.jsonl");

function ensureDataFolderExists() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
}

function saveLead(lead) {
  ensureDataFolderExists();

  fs.appendFileSync(leadsFile, JSON.stringify(lead) + "\n");
}

module.exports = {
  saveLead
};