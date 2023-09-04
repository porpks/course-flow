import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
    const data = req.body
    return res.json({
        message: "register",
        data: data
    })
})

authRouter.post("/login", async (req, res) => {
    const data = req.body
    return res.json({
        message: "login",
        data: data
    })
})

export default authRouter;