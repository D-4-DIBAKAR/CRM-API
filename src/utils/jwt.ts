import jwt from "jsonwebtoken";

export const generateToken = (payload: { userId: string; role: string }) => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1h" });
};
