import dotenv from "dotenv";
import mongoose from "mongoose";
import { createAuth } from "./src/lib/auth.js";
import createApp from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB using Mongoose!!");

        // DB connect after auth create
        const auth = createAuth();
        global.auth = auth; // requireAuth middleware এ ব্যবহার হবে

        // send auth then create app
        const app = createApp(auth);

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.log("MongoDB connection failed", error);
    }
};

startServer();