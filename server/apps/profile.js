import { Router } from "express";

const profileRouter = Router();

profileRouter.get("/:userId", async (req, res) => {
    const userId = req.params.userId
    return res.json({
        message: `user ${userId}`,
    })
})

profileRouter.put("/:userId", async (req, res) => {
    const userId = req.params.userId
    return res.json({
        message: `user ${userId}`,
    })
})

export default profileRouter