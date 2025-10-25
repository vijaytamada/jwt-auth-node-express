import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import { config } from "./config/appConfig.js";

const app = express();

app.use(
    cors({
        origin: config.frontendUrl,
        credentials: true, // Allow cookies
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

export default app;
