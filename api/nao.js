import nodemailer from "nodemailer";

export default async function handler(req, res) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // marcello.machilas@gmail.com
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"Cartinha ❤️" <${process.env.SMTP_USER}>`,
      to: "machilaswestside@gmail.com",
      subject: "Ela respondeu: NÃO",
      html: `
        <h2>❌ Ela respondeu NÃO</h2>
        <p>Ela decidiu não continuar.</p>
      `
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log("Erro:", err);
    return res.status(500).json({ error: "Erro ao enviar e-mail" });
  }
}
