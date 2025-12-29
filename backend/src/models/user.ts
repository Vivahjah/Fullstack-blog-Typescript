import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
    username: string;
    email: string;
    password: string;
    role: "user" | "admin";
    firstName?: string;
    lastName?: string;
    socialLinks?: {
        twitter?: string;
        facebook?: string;
        linkedin?: string;
        instagram?: string;
        youtube?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}


const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: [true, "Username must be unique"],
            minlength: [3, "Username must be at least 3 characters long"],
            maxLength: [30, "Username cannot exceed 30 characters"],

        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email must be unique"],


        },
        password: {
            type: String,
            required: [true, "Password is required"],
            select: false,
        },
        role: {
            type: String,
            enum: {
                values: ["user", "admin"],
                message: "Role must be either 'user' or 'admin'"
            },
            default: "user",
            required: [true, "Role is required"],
        },
        firstName: {
            type: String,
            maxLength: [50, "First name cannot exceed 50 characters"],
        },
        lastName: {
            type: String,
            maxLength: [50, "Last name cannot exceed 50 characters"],
        },
        socialLinks: {
            twitter: { type: String },
            facebook: { type: String },
            linkedin: { type: String },
            instagram: { type: String },
            youtube: { type: String }
        }
    },
    {
        timestamps: true
    }

)


// Hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export default model<IUser>("User", userSchema);