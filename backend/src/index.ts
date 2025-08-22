import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import cors from "cors";
import { DBConnection } from './config/dbConnection';
import authRoutes from "./routes/authRoutes";
import session from 'express-session';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// ✅ Session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || "mySecretKey",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // set true if using https
    })
);

// Database Connection
if (process.env.MONGO_URI) {
    DBConnection();
} else {
    console.error("MongoDB connection string is missing in .env");
    process.exit(1);
}
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

