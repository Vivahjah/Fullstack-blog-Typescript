import express from "express";
import config from "@/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import limiter from "@/lib/express-rate-limit";
import type { CorsOptions } from "cors";

import v1Routes from "@/routes/v1";





const app = express();




const corsOptions: CorsOptions = {
    origin(origin, callback) {
        if (config.NODE_ENV === "development" || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"), false);
            console.log(`CORS error : ${origin} is not allowed by CORS`);
        }

    }
};


app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);
app.use(compression({ threshold: 1024 })); // Compress responses larger than 1KB



(async () => {
    try {
        app.use("/api/v1", v1Routes);

        app.listen(config.PORT, () => {
            console.log(`Server is running on http://localhost:${config.PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);

        if (process.env.NODE_ENV === "production") {
            process.exit(1);
        }
    }
})();


const handleServerShutdown = ( ) => {
    try {
        console.log("Shutting down server...");
        process.exit(0);
    } catch (error) {
        console.error("Error during server shutdown:", error);
        
    }
}


process.on("SIGTERM", handleServerShutdown);
process.on("SIGINT", handleServerShutdown);







