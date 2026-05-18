import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";

export const auth = betterAuth({
    database: mongodbAdapter(mongoose.connection.db),

    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 * 24 * 7
        }
    },

    emailAndPassword: {
        enabled: true
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },

    trustedOrigins: [
        "http://localhost:3001"
    ]
})