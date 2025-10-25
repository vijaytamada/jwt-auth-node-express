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
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fafafa;">
      <div style="max-width: 560px; margin: 60px auto; padding: 20px;">
        
        <!-- Card -->
        <div style="background: #ffffff; border-radius: 16px; padding: 48px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);">
          
          <!-- Icon -->
          <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>

          <h1 style="margin: 0 0 12px 0; color: #111827; font-size: 24px; font-weight: 600; line-height: 1.3;">
            Reset your password
          </h1>
          
          <p style="margin: 0 0 32px 0; color: #6b7280; font-size: 16px; line-height: 1.6;">
            We received a request to reset the password for your account. Click the button below to choose a new password.
          </p>

          <!-- Button -->
          <a href="${resetLink}" 
             style="display: inline-block; width: 100%; padding: 16px; background: #2563eb; color: #ffffff; text-align: center; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px; box-sizing: border-box;">
            Reset Password
          </a>

          <!-- Expiry Notice -->
          <div style="margin-top: 32px; padding: 16px; background: #fef3c7; border-radius: 10px;">
            <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
              ⏱️ <strong>This link expires in 15 minutes.</strong> For your security, please complete the reset promptly.
            </p>
          </div>

          <!-- Alternative Link -->
          <p style="margin: 32px 0 0 0; color: #9ca3af; font-size: 13px; line-height: 1.6;">
            If the button above doesn't work, copy and paste this URL into your browser:
          </p>
          <p style="margin: 8px 0 0 0; padding: 12px; background: #f9fafb; border-radius: 8px; font-size: 12px; word-break: break-all; color: #2563eb;">
            ${resetLink}
          </p>

        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 32px;">
          <p style="margin: 0; color: #9ca3af; font-size: 14px; line-height: 1.6;">
            Didn't request this? You can safely ignore this email.
          </p>
          <p style="margin: 16px 0 0 0; color: #d1d5db; font-size: 12px;">
            © ${new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>

      </div>
    </body>
    </html>
  `;

  return await sendEmail(to, "Reset your password", html);
}

export const emailService = {
  sendEmail,
  sendPasswordResetEmail,
};
