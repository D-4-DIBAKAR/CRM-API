import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/customError";

export interface AuthRequest extends Request {
    user?: { userId: string; role: string };
}

// ✅ Authenticate User with JWT
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string; role: string };
        req.user = decoded;
        next();
    } catch (error: unknown) {
        const err = error as CustomError;
        res.status(err.statusCode || 500).json({ message: err.message || "Invalid Token" });
    }
};

// ✅ Authorize Admin Only
export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admin Access Required" });
    }
    next();
};
