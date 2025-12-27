import jwt, { SignOptions, Secret } from "jsonwebtoken";
import config from "@/config";
import { Types } from "mongoose";





export const generateAcessToken = (userId: Types.ObjectId): string => {
    const secret: Secret = config.JWT_ACCESS_TOKEN_SECRET as Secret;
    const options: SignOptions = {
        expiresIn: config.JWT_ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
        subject: "access_token",
    };
    return jwt.sign(
        { id: userId },
        secret,
        options
    );
};

export const generateRefreshToken = (userId: Types.ObjectId): string => {
    const secret: Secret = config.JWT_REFRESH_TOKEN_SECRET as Secret;
    const options: SignOptions = {
        expiresIn: config.JWT_REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
        subject: "refresh_token",
    };
    return jwt.sign(
        { id: userId },
        secret,
        options,
   
    );
};