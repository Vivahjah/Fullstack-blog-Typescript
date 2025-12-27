import { Router } from 'express';
import authRoutes from "@/routes/v1/auth";



const router = Router();


router.get("/", (req, res) => {
    res.status(200).json({
        message: "API is Live",
        status: "success",
        version: "1.0.0",
        docs: "http://api.example.com/docs",
        time: new Date().toISOString()
    })
});

router.use("/auth", authRoutes);


export default router;
