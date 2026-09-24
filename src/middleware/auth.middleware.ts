import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({
            message: "Authorization header missing"
        });
    }
    const [scheme, token] = authorizationHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({
            message: "Invalid authorization format"
        });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined");
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);

        if (typeof decoded === "string") {
            return res.status(401).json({
                message: "Invalid token payload"
            });
        }

        req.user = {
            userId: decoded.userId,
            organizationId: decoded.organizationId,
            role: decoded.role
        };
    } catch {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }

    next();
}