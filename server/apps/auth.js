import { Router } from "express";
import supabase from '../utils/db.js'

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
    const registerData = {
        full_name: req.body.name,
        dateofbirth: req.body.dateOfBirth,
        edu_background: req.body.educationBackground,
        email: req.body.email,
    }
    try {
        const { data, error } = await supabase.from('register').insert([registerData]).select()
        try {
            const { user, session, error } = await supabase.auth.signUp({
                email: req.body.email,
                password: req.body.password,
            });

        } catch (error) {
            res.status(400).json({
                error: "Registration failed",
                error_message: error
            });
        }
    } catch (error) {
        return res.json({
            error: "Registration failed",
            error_message: error
        })
    }
    return res.json({
        message: "register",
        data: registerData
    })
})

authRouter.post("/login", async (req, res) => {
    const data = req.body
    return res.json({
        message: "login",
        data: data
    })
})

authRouter.get("/logout/:userId", async (req, res) => {
    const userId = req.params.userId
    return res.json({
        message: "logout",
        data: userId
    })
})

export default authRouter;