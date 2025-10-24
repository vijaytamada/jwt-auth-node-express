import express from "express";
import { authController } from "../controllers/authController.js";
import { authenticateAccessToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/profile", authenticateAccessToken, authController.profile);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

export default router;
