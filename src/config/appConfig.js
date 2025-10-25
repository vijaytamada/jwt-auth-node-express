import dotenv from "dotenv";
import path from "path";

// Determine environment
const env = process.env.NODE_ENV || "development";

// Load base .env first
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Load environment-specific file (.env.development, .env.production, etc.)
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`), override: true });

// Load .env.local last (optional local overrides)
dotenv.config({ path: path.resolve(process.cwd(), ".env.local"), override: true });

// Application configuration
export const config = {
  // JWT config
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenExpiry: "15m",
  refreshTokenExpiryDays: 7,

  // Resend email service config
  resendApiKey: process.env.RESEND_API_KEY,
  emailFrom: process.env.EMAIL_FROM || "App <onboarding@resend.dev>",

  // General config
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  port: process.env.PORT || 5000,
};
