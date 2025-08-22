import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../src/models/User"; // adjust path as per your folder
// import { DBConnection } from '../src/config/dbConnection';

// DB connection helper
async function DBConnection() {
    console.log("DEBUG MONGO_URI =", process.env.MONGODB_CONNECTION); // 👈 Vercel logs me check karo
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.MONGODB_CONNECTION as string, {
        dbName: "token",
    });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        await DBConnection();

        if (req.method === "POST" && req.query.action === "register") {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password required" });
            }

            const userExists = await User.findOne({ email });
            if (userExists) return res.status(400).json({ message: "User already exists" });

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ email, password: hashedPassword });

            return res.status(201).json({
                _id: user.id,
                email: user.email,
                token: jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1d" }),
            });
        }

        if (req.method === "POST" && req.query.action === "login") {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password required" });
            }

            const user = await User.findOne({ email });
            if (!user) return res.status(401).json({ message: "Invalid credentials" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

            return res.json({
                _id: user.id,
                email: user.email,
                token: jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1d" }),
            });
        }

        return res.status(405).json({ message: "Method not allowed" });
    } catch (err: any) {
        console.error("Server Error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}
