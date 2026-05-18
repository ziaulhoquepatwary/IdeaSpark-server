import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";

const app = express();


app.use(cors({
    origin: "http://localhost:3001",  // next.js url
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth))

app.get("/", (req, res) => {
    res.send("IdeaSpark server is running successfully")
});

export default app;