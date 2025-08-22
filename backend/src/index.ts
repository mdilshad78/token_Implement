import express from 'express';
import dotenv from 'dotenv'
import cors from "cors";
import { DBConnection } from './config/dbConnection';
import authRoutes from "./routes/authRoutes";
import session from 'express-session';

dotenv.config();
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
if (process.env.MONGODB_CONNECTION) {
    DBConnection(process.env.MONGODB_CONNECTION);
} else {
    console.error("MongoDB connection string is missing in .env");
    process.exit(1);
}

app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

// import express from "express";
// import dotenv from "dotenv";
// import { DBConnection } from "./config/dbConnection";

// dotenv.config(); // <-- load .env

// const app = express();
// app.use(express.json());

// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGODB_CONNECTION;

// if (!MONGO_URI) {
//     throw new Error("MongoDB connection string is missing in .env");
// }

// DBConnection();

// app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
// });
