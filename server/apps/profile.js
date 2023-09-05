import { Router } from "express";
import multer from "multer";
import supabase from '../utils/db.js'

const profileRouter = Router();

// const multerUpload = multer({ dest: "public\\files" });
const multerUpload = multer({});
const avatarUpload = multerUpload.fields([{ name: "avatar", maxCount: 1 }]);

profileRouter.get("/:userId", async (req, res) => {
    const userId = req.params.userId
    return res.json({
        message: `user ${userId}`,
    })
})

profileRouter.put("/:userId", avatarUpload, async (req, res) => {
    // const userId = req.params.userId
    // console.log(req.files.avatar[0]);
    // const file = req.files.avatar[0]
    // const fileName = file.originalname.split(".")[0];
    // const fileExt = file.originalname.split(".")[1];

    // const { data, error } = await supabase.storage
    //     .from('test-avatar') // Replace with your storage bucket name
    //     .upload(`profile/${fileName}.${fileExt}`, file);

    // // const result = data
    // // console.log(result);
    // if (error) {
    //     console.error(error);
    // } else {
    //     console.log('File uploaded successfully:', data);
    // }
    return res.json({
        message: `user ${userId}`,
    })
})

export default profileRouter