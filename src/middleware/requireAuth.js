import { fromNodeHeaders } from "better-auth/node";

export const requireAuth = () => {
    return async (req, res, next) => {
        try {
            const auth = req.app.get("auth");

            if (!auth) {
                throw new Error("Better Auth instance not found.");
            }

            const session = await auth.api.getSession({
                headers: fromNodeHeaders(req.headers),
            });

            console.log(session);

            if (!session || !session.user) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized. Please login first.",
                });
            }

            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
            };

            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error);
            return res.status(401).json({
                success: false,
                message: "Session invalid or expired.",
            });
        }
    };
};