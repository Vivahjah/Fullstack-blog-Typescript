import mongoose from "mongoose";
import config from "@/config";
import { logger } from "@/lib/winston";
import type { ConnectOptions } from "mongoose";



const clientOptions: ConnectOptions = {
    dbName: "blog-db",
    appName: "FullStackBlogApp",
    serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true
    },


};



export const connectToDatabase = async (): Promise<void> => {
    if (!config.MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined in the configuration.");
    }

    try {
        await mongoose.connect(config.MONGODB_URI, clientOptions);
        logger.info("Connected to MongoDB");
    } catch (error) {
        logger.error("Error connecting to MongoDB:", error);
        process.exit(1);

    }
}



export const disconnectFromDatabase = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        logger.warn("Disconnected from MongoDB");
    } catch (error) {
        logger.error("Error disconnecting from MongoDB:", error);
    }
}


