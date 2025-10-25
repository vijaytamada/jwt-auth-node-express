// services/emailService.js
import { Resend } from "resend";
import { config } from "../config/appConfig.js";

// Initialize Resend client
const resend = new Resend(config.resendApiKey);

// Generic email sending function
async function sendEmail(to, subject, html) {
  try {
    const { data, error } = await resend.emails.send({
      from: config.emailFrom,
      to,
      subject,
      html,
    });

    if (error) throw new Error(error.message || "Failed to send email");

    console.log(`✅ Email sent successfully to ${to}`);
    return data;
  } catch (err) {
    console.error("❌ Error sending email:", err.message);
    throw err;
  }
}

async function sendPasswordResetEmail(to, token) {
  const resetLink = `${config.frontendUrl}/reset-password?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>Password Reset Request</h2>
      <p>You requested to reset your password.</p>
      <p>Click the button below to set a new password (valid for 15 minutes):</p>
      <a href="${resetLink}" 
         style="display:inline-block;padding:10px 15px;background:#007BFF;color:#fff;text-decoration:none;border-radius:5px;">
        Reset Password
      </a>
      <p>If you didn’t request this, ignore this email.</p>
    </div>
  `;

  return await sendEmail(to, "Reset your password", html);
}

export const emailService = {
  sendEmail,
  sendPasswordResetEmail,
};
