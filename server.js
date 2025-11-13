const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.static("public"));

async function sendMail(subject, htmlContent) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Cartinha ❤️" <${process.env.SMTP_USER}>`,
    to: process.env.RECEIVER_EMAIL,
    subject,
    html: htmlContent,
  });
}

app.get("/api/sim", async (req, res) => {
  try {
    await sendMail(
      "Ela respondeu: SIM 💖",
      `
      <h2>💖 Ela respondeu SIM!</h2>
      <p>Ela quer recomeçar com você. 🌹✨</p>
    `
    );
    res.json({ ok: true });
  } catch (e) {
    console.error("Erro SIM:", e);
    res.status(500).json({ error: "Erro ao enviar e-mail" });
  }
});

app.get("/api/nao", async (req, res) => {
  try {
    await sendMail(
      "Ela respondeu: NÃO ❌",
      `
      <h2>❌ Ela respondeu NÃO</h2>
      <p>Ela decidiu não continuar.</p>
    `
    );
    res.json({ ok: true });
  } catch (e) {
    console.error("Erro NÃO:", e);
    res.status(500).json({ error: "Erro ao enviar e-mail" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
