import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Successfully connected: ${conn.connection.host}:${conn.connection.port}`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDb;
