import nodemailer from "nodemailer";

export default async function handler(req, res) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // marcello.machilas@gmail.com
        pass: process.env.SMTP_PASS  // senha de app do Google
      }
    });

    await transporter.sendMail({
      from: `"Cartinha ❤️" <${process.env.SMTP_USER}>`,
      to: "machilaswestside@gmail.com", // <-- email que recebe
      subject: "Ela respondeu: SIM 💖",
      html: `
        <h2>💖 Ela respondeu SIM!</h2>
        <p>Ela quer recomeçar com você. 🌹✨</p>
      `
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log("Erro:", err);
    return res.status(500).json({ error: "Erro ao enviar e-mail" });
  }
}
