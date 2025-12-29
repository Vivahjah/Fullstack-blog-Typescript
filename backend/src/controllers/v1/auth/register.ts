
import {logger} from "@/lib/winston"
import type {Request, Response} from "express"
import type { IUser } from "@/models/user"
import config from "@/config"
import User from "@/models/user"
import { generateUserName } from "@/utils"
import Token from "@/models/token"
import {generateAcessToken, generateRefreshToken} from "@/lib/jwt"



type UserData = Pick<IUser,  | "email" | "password" | "role">;



const register = async (req: Request, res : Response) : Promise<void> => {
const { email, password, role } : UserData = req.body as UserData;

//if role is "admin" but is not on the allowed list, return error

if(role === "admin" && !config.ALLOWED_ADMIN_EMAILS?.includes(email)) {
    res.status(403).json({
        code : "FORBIDDEN",
        message: "You are not allowed to register as admin",
    });
    logger.warn(`Forbidden admin registration attempt for email: ${email}`);
    return;
}
// console.log({email, password, role});
    try {
        const username = generateUserName();
        const newUser = await User.create({
            email,
            password,
            role,
            username
        })

        const accessToken = generateAcessToken(newUser._id);
        const refreshToken = generateRefreshToken(newUser._id);

        //store refresh token in the database
        await Token.create({
            userId: newUser._id,
            token: refreshToken,
        });
        logger.info("Refresh token created for user", {
            userId: newUser._id,
            refreshToken: refreshToken,
        })

        res.cookie( "refreshToken", refreshToken, {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: "strict",
         
        });

        res.status(201).json({ 
            user : {
                email: newUser.email,
                username: newUser.username,
                role: newUser.role, 
            },
            accessToken,
           
        })
        logger.info("User registered successfully", newUser);
        
    } catch (error) {
        res.status(500).json({
            code : "SERVER_ERROR",
            message: "Internal Server Error",
            error: error
        })
        logger.error(`Register Error: ${error}`)  
        
    }
}


export default register