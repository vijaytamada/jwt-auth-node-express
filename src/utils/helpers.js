import { config } from "../config/appConfig.js";

// Convert days to milliseconds
const daysToMs = (days) => days * 24 * 60 * 60 * 1000;

// Set auth cookies
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

export { setAuthCookies, daysToMs };