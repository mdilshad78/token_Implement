import mongoose from 'mongoose'

export const DBConnection = async (mongoUrl: string): Promise<void> => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}