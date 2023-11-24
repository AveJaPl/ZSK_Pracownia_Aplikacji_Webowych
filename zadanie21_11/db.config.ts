import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI: string | undefined = process.env.MONGO_DB_URL;

if (!MONGODB_URI) {
    console.error("No mongo connection string. Set MONGO_DB_URL environment variable.");
    process.exit(1);
}
export const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to the database.");
    } catch (error) {
        console.log("Could not connect to the database.", error);
        process.exit(1);
    }
}
