import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import User from '../../src/models/User';
import { generateToken } from '../../src/utils/generateToken';
import { DBConnection } from '../../src/config/dbConnection';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await DBConnection();

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    const token = generateToken(user._id.toString());
    return res.status(201).json({ token, email: user.email });
}
