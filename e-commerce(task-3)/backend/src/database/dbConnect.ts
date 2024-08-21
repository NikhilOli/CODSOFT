import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL;        
        if (!mongoUrl) {
            throw new Error('CLOUD_URL is not defined in environment variables');
        }

        await mongoose.connect(mongoUrl, { dbName: "E-Commerce" });
        console.log(`MongoDB connected successfully in ${process.env.MONGO_URL}`);
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error connecting database", error.message);
        } else {
            console.log("Error connecting database", error);
        }
    }
};