import { Router } from "express";
import supabase from "../utils/db.js";

const profileRouter = Router();

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
      .select("full_name, dateofbirth, edu_background, email")
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

profileRouter.put("/:userId", async (req, res) => {
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

  const { data, error } = await supabase
    .from("register")
    .update({
      full_name: req.body.full_name,
      dateofbirth: req.body.dateofbirth,
      edu_background: req.body.edu_background,
      email: req.body.email,
    })
    .eq("user_id", userId);
  return res.json({
    message: "You profile has been update",
  });
});

export default profileRouter;
