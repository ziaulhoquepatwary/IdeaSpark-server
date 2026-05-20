import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";

export const createAuth = () => {
    return betterAuth({
        database: mongodbAdapter(mongoose.connection.db),

        session: {
            cookieCache: {
                enabled: true,
                maxAge: 60 * 60 * 24 * 7
            }
        },

        advanced: {
            defaultCookieAttributes: {
                sameSite: "lax",
                secure: false,
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

        trustedOrigins: ["http://localhost:3000"]
    });
};