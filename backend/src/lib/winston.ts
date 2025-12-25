import { Timestamp } from './../../node_modules/bson/src/timestamp';
import winston from "winston";
import config from "@/config";



const { combine, timestamp, printf, colorize, errors } = winston.format;

const transports: winston.transport[] = [];

if (process.env.NODE_ENV !== "production") {
    transports.push(new winston.transports.Console(
        {
            format: combine(
                colorize({ all: true }),
                timestamp({ format: "YYYY-MM-DD HH:mm:ss A" }),
                errors({ stack: true }),
                printf(({ level, message, timestamp, stack }) => {
                    return stack
                        ? `[${timestamp}] ${level}: ${stack}`
                        : `[${timestamp}] ${level}: ${message}`;
                }
                )
            )
        }
    ));
} else {
    transports.push(
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/combined.log" })
    );
}


const logger = winston.createLogger({
    level: config.LOG_LEVEL || "info",
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss A" }),
        errors({ stack: true }),
        printf(({ level, message, timestamp, stack }) => {
            return stack
                ? `[${timestamp}] ${level}: ${stack}`
                : `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports,
    silent: config.NODE_ENV === "test"
});

export {logger};