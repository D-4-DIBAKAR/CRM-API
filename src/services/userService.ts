import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import { createUser, findUserByEmail } from "../repository/userRepository";
import { Request, Response } from "express";
import { CustomError } from "../utils/customError";

export const registerUser = async (req: Request, res: Response) => {
    try {
        
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error: unknown) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



export const loginUser = async (req: Request, res: Response) => {
    try {
        const user = await findUserByEmail(req.body.email);
        if (!user || !(await comparePassword(req.body.password, user.password))) {
            throw new CustomError("Invalid credentials", 400);
        }

        
        const token = generateToken({ userId: user._id.toString(), role: user.role });

        res.json({ token,role: user.role });
    } catch (error: unknown) {
        res.status(500).json({ error: (error as CustomError).message || "Internal Server Error" });
    }
};



