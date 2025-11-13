import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export default async function handler(req, res) {
  try {
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
      subject: "Ela respondeu: SIM 💖",
      html: `
        <h2>💖 Ela respondeu SIM!</h2>
        <p>Ela quer recomeçar com você. 🌹✨</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar e-mail (SIM):", error);
    return res.status(500).json({ error: "Erro ao enviar e-mail" });
  }
}
