import { tokenService } from "../services/tokenService.js";

export function authenticateAccessToken(req, res, next) {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "Access token missing" });

  try {
    const user = tokenService.verifyAccessToken(token);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired access token" });
  }
}
