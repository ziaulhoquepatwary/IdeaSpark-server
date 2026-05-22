import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";

export const createAuth = (db) => {

    const origins = [
        process.env.FRONTEND_URL,
        "http://localhost:3000"
    ]
    
    return betterAuth({
        database: mongodbAdapter(db),

        baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",

        session: {
            cookieCache: {
                enabled: true,
                maxAge: 60 * 60 * 24 * 7
            }
        },

        advanced: {
            defaultCookieAttributes: {
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                secure: process.env.NODE_ENV === "production" ? true : false,
                httpOnly: true,
            }
        },

        emailAndPassword: { enabled: true },

        socialProviders: {
            google: {
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            },
        },

        trustedOrigins: origins
    });
};