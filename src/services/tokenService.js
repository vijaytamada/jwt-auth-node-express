import jwt from "jsonwebtoken";
import { config } from "../config/appConfig.js";
import { daysToMs } from "../utils/helpers.js";

// In-memory refresh token store
const refreshTokens = new Map();

// Access token
function generateAccessToken(email) {
    return jwt.sign({ email }, config.accessSecret, {
        expiresIn: config.accessTokenExpiry,
    });
}

function verifyAccessToken(token) {
    return jwt.verify(token, config.accessSecret);
}

// Refresh token
function generateRefreshToken(email) {
    return jwt.sign({ email }, config.refreshSecret, {
        expiresIn: `${config.refreshTokenExpiryDays}d`,
    });
}

function verifyRefreshToken(token) {
    return jwt.verify(token, config.refreshSecret);
}

// Refresh token store operations
function storeRefreshToken(token, email) {
    const expiresAt = Date.now() + daysToMs(config.refreshTokenExpiryDays);
    refreshTokens.set(token, { email, expiresAt });
}

function getRefreshToken(token) {
    return refreshTokens.get(token);
}

function deleteRefreshToken(token) {
    refreshTokens.delete(token);
}

// Export all
export const tokenService = {
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    storeRefreshToken,
    getRefreshToken,
    deleteRefreshToken,
};