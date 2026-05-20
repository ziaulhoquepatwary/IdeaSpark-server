import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import ideaRouter from "./modules/idea/idea.routes.js";

const createApp = (auth) => {
    const app = express();

    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }));

    app.use(cookieParser());
    app.use(express.json());

    app.all("/api/auth/*splat", toNodeHandler(auth));

    app.use("/api/ideas", ideaRouter);

    app.get("/", (req, res) => {
        res.send("IdeaSpark server is running successfully");
    });

    return app;
};

export default createApp;