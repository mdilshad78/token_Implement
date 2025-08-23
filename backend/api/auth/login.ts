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

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Wrong password" });

    const token = generateToken(user._id.toString());
    return res.status(200).json({ token, email: user.email });
}
