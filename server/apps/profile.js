import { Router } from "express";
import multer from "multer";
import supabase from "../utils/db.js";
import { v4 as uuidv4 } from "uuid";

const profileRouter = Router();

const multerUpload = multer({});
const avatarUpload = multerUpload.fields([{ name: "avatar", maxCount: 1 }]);

profileRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        message: "Invalid url.",
      });
    }

    const { data, error } = await supabase
      .from("register")
      .select("full_name, dateofbirth, edu_background, email, image_url")
      .eq("user_id", userId);

    if (error) {
      return res.status(500).json({
        message: "An error occurred while fetching data.",
        error: error.message,
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.json({
      message: "User profile data retrieved successfully.",
      data: data[0],
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

profileRouter.get("/image/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const { data, error } = await supabase
      .from("register")
      .select("image_url")
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (data.length === 0 || !data[0].image_url) {
      return res.status(404).json({ message: "Image not found" });
    }

    const imageUrl = data[0].image_url;

    res.json(imageUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

profileRouter.put("/:userId", avatarUpload, async (req, res) => {
  const userId = req.params.userId;

  if (
    !req.body.full_name ||
    !req.body.dateofbirth ||
    !req.body.edu_background ||
    !req.body.email
  ) {
    return res.status(400).json({
      message: "Please enter all information.",
    });
  }

  const nameValidate = /^[a-zA-Z' -]+$/;
  if (!nameValidate.test(req.body.full_name)) {
    return res.status(400).json({
      message: "Invalid name",
    });
  }

  const emailValidate = /^[a-zA-Z0-9._-]+@[^.]+\.(com)$/;
  if (!emailValidate.test(req.body.email)) {
    return res.status(400).json({
      message: "invalid email",
    });
  }
  try {
    const file = req.files.avatar[0];
    const fileImage = new Blob([file.buffer], { type: file.mimetype });
    const fileName = file.originalname.replace(/ /g, "_");

    const { data, error } = await supabase.storage
      .from("test-avatar")
      .upload(`profile/${uuidv4()}${fileName}`, fileImage);

    if (error) {
      console.error(error);
    } else {
      console.log("File uploaded successfully:", data);
    }
    const path = data.path;
    const imgUrl = `https://yzcnxdhntdijwizusqmn.supabase.co/storage/v1/object/public/test-avatar/${path}`;
    const now = new Date(); // Get the current date and time
    const formattedDate =
      now.toISOString().replace(/T/, " ").replace(/\..+/, "") + ".682314+00";

    try {
      const { data, error } = await supabase
        .from("register")
        .update({
          full_name: req.body.full_name,
          dateofbirth: req.body.dateofbirth,
          edu_background: req.body.edu_background,
          email: req.body.email,
          image_url: imgUrl,
          updated_at: formattedDate,
        })
        .eq("user_id", userId);
      console.log(data);
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
    }
  } catch (error) {}

  return res.json({
    message: "You profile has been update",
  });
});

profileRouter.put("/delete/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const { data, error } = await supabase
      .from("register")
      .update({
        image_url: null,
      })
      .eq("user_id", userId);

    if (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update image_url" });
    } else {
      res.status(200).json({ message: "Image URL removed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default profileRouter;
