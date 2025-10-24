import bcrypt from "bcryptjs";
import { tokenService } from "../services/tokenService.js";
import { daysToMs } from "../utils/helpers.js";
import { config } from "../config/appConfig.js";

// In-memory users store
const users = new Map();

// Helper: Set auth cookies
function setAuthCookies(res, accessToken, refreshToken) {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: daysToMs(config.refreshTokenExpiryDays),
    });
}

// Signup handler
async function signup(req, res) {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "Email & password required" });

    if (users.has(email))
        return res.status(400).json({ message: "User already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    users.set(email, { firstName, lastName, passwordHash });
    res.json({ message: "Signup successful" });
}

// Login handler
async function login(req, res) {
    const { email, password } = req.body;
    const user = users.get(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash)))
        return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = tokenService.generateAccessToken(email);
    const refreshToken = tokenService.generateRefreshToken(email);
    tokenService.storeRefreshToken(refreshToken, email);

    setAuthCookies(res, accessToken, refreshToken);
    res.json({ message: "Login successful" });
}

// Profile handler
function profile(req, res) {
    const email = req.user.email;
    const user = users.get(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ email, firstName: user.firstName, lastName: user.lastName });
}

// Refresh token handler
function refreshToken(req, res) {
    const oldToken = req.cookies.refreshToken;
    if (!oldToken)
        return res.status(401).json({ message: "Refresh token missing" });

    try {
        const payload = tokenService.verifyRefreshToken(oldToken);
        const stored = tokenService.getRefreshToken(oldToken);

        if (!stored || stored.email !== payload.email || stored.expiresAt < Date.now())
            return res.status(403).json({ message: "Refresh token expired or invalid" });

        tokenService.deleteRefreshToken(oldToken);
        const newRefreshToken = tokenService.generateRefreshToken(payload.email);
        const newAccessToken = tokenService.generateAccessToken(payload.email);
        tokenService.storeRefreshToken(newRefreshToken, payload.email);

        setAuthCookies(res, newAccessToken, newRefreshToken);
        res.json({ message: "Tokens refreshed" });
    } catch {
        res.status(403).json({ message: "Invalid refresh token" });
    }
}

// Logout handler
function logout(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) tokenService.deleteRefreshToken(refreshToken);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out" });
}

export const authController = {
    signup,
    login,
    profile,
    refreshToken,
    logout,
};
