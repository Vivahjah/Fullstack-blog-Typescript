import { Router } from "express";
import register from "@/controllers/v1/auth/register";
import {body} from "express-validator";
import validationError from "@/middlewares/validationError";
import user from "@/models/user";


const router = Router();

router.post("/register", 
    body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email address"), 
    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .custom(async (value) => {
        const existingUser = await user.exists({ email: value });
        if (existingUser) {
            throw new Error ("Email already in use");
        }
    }),
    body("role")
    .optional()
    .isIn(["user", "admin"]).withMessage("Role must be either 'user' or 'admin'"),
    validationError,
    register
);


router.post("/login", (req, res) => {
    res.send("Login route");
});





export default router;