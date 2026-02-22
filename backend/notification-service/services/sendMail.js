import transporter from "../config/mail.config.js";

export const sendMail = async ({ to, subject, text, html, from }) => {
  try {
    const info = await transporter.sendMail({
      from: from || process.env.MAIL_FROM,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent:", info.messageId);
    return { success: true };
  } catch (err) {
    console.error("Mail error:", err);
    return { success: false, error: err.message };
  }
};