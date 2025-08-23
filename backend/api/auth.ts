import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import User from '../src/models/User';
import { generateToken } from '../src/utils/generateToken';
import { DBConnection } from '../src/config/dbConnection';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await DBConnection();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { action, email, password } = req.body;

  if (!action || !email || !password) {
    return res.status(400).json({ message: "Action, email, and password required" });
  }

  if (action === "register") {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    const token = generateToken(user._id.toString());
    return res.status(201).json({ token, email: user.email });
  }

  if (action === "login") {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Wrong password" });

    const token = generateToken(user._id.toString());
    return res.status(200).json({ token, email: user.email });
  }

  return res.status(400).json({ message: "Invalid action" });
}
