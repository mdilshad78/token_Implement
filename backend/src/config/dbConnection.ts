// import mongoose from 'mongoose'

// export const DBConnection = async (mongoUrl: string): Promise<void> => {
//     try {
//         await mongoose.connect(mongoUrl);
//         console.log("MongoDB connected successfully");
//     } catch (error) {
//         console.error("MongoDB connection failed:", error);
//     }
// }

import mongoose from "mongoose";

export async function DBConnection() {
    try {
        if (mongoose.connection.readyState >= 1) return;

        if (!process.env.MONGO_URI) {
            throw new Error("❌ MONGO_URI not found in environment variables");
        }

        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "token",
        });

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        throw error;
    }
}

// ✅ isko add karo
export default DBConnection;



// import mongoose from "mongoose";

// export async function DBConnection() {
//     if (mongoose.connection.readyState >= 1) {
//         return;
//     }

//     if (!process.env.MONGODB_CONNECTION) {
//         throw new Error("❌ MONGO_URI not found in environment variables");
//     }

//     try {
//         await mongoose.connect(process.env.MONGODB_CONNECTION, {
//             dbName: "token", // apna db name daal sakte ho
//         });
//         console.log("✅ MongoDB Connected");
//     } catch (error) {
//         console.error("MongoDB Connection Error:", error);
//         throw error;
//     }
// }
