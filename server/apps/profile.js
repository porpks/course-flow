import { Router } from "express";
import multer from "multer";
import supabase from '../utils/db.js'
import { v4 as uuidv4 } from 'uuid';

const profileRouter = Router();

const multerUpload = multer({});
const avatarUpload = multerUpload.fields([{ name: "avatar", maxCount: 1 }]);

profileRouter.get("/:userId", async (req, res) => {
    const userId = req.params.userId
    return res.json({
        message: `user ${userId}`,
    })
})

profileRouter.put("/:userId", avatarUpload, async (req, res) => {
    const userId = req.params.userId

    const file = req.files.avatar[0]
    const fileImage = new Blob([file.buffer], { type: file.mimetype })
    const fileName = file.originalname;

    const { data, error } = await supabase.storage
        .from('test-avatar')
        .upload(`profile/${uuidv4()}${fileName}`, fileImage);

    if (error) {
        console.error(error);
    } else {
        console.log('File uploaded successfully:', data);
    }
    return res.json({
        message: `user ${userId}`,
    })
})

export default profileRouter