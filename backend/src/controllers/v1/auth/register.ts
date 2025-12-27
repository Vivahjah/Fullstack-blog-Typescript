import {logger} from "@/lib/winston"
import type {Request, Response} from "express"
import type { IUser } from "@/models/user"
import config from "@/config"
import User from "@/models/user"
import { generateUserName } from "@/utils"



type UserData = Pick<IUser,  | "email" | "password" | "role">;



const register = async (req: Request, res : Response) : Promise<void> => {
const { email, password, role } : UserData = req.body as UserData;
// console.log({email, password, role});
    try {
        const username = generateUserName();
        const newUser = await User.create({
            email,
            password,
            role,
            username
        })

        res.status(201).json({ 
            user : {
                email: newUser.email,
                username: newUser.username,
                role: newUser.role,
               
            }
        })
        
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