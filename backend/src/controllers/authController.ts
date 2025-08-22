import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { generateToken } from "../utils/generateToken";
import { JWT_SECRET } from "../config/env";
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword });

    res.status(201).json({
        _id: user.id,
        email: user.email,
        token: generateToken(user.id),
    });

};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "wrong" });

    res.json({
        _id: user.id,
        email: user.email,
        token: generateToken(user.id),
    });
};

export const verifyToken = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(401).json({ valid: false, message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        const user = await User.findById(decoded.id).select("-password"); // password ko mat bhejna

        if (!user) return res.status(401).json({ valid: false, message: "User not found" });

        res.json({ valid: true, user });
    } catch (err) {
        res.status(401).json({ valid: false, message: "Invalid token" });
    }
}

export const getProfile = async (req: any, res: Response) => {
    res.json(req.user);
};