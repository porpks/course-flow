import { Router } from "express";
import supabase from "../utils/db.js";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const registerData = {
    full_name: req.body.name,
    date_of_birth: req.body.dateOfBirth,
    edu_background: req.body.educationBackground,
    email: req.body.email,
  };
  try {
    const { data, error } = await supabase
      .from("users")
      .insert([registerData])
      .select();
    try {
      const { user, session, error } = await supabase.auth.signUp({
        email: req.body.email,
        password: req.body.password,
      });
    } catch (error) {
      res.status(400).json({
        error: "Registration failed",
        error_message: error,
      });
    }
  } catch (error) {
    return res.json({
      error: "Registration failed",
      error_message: error,
    });
  }
  return res.json({
    message: "register",
    data: registerData,
  });
});

authRouter.post("/login", async (req, res) => {
  const loginData = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });

    if (error) {
      return res.json({ error: error });
    }

    if (data) {
      const token = data.session.access_token;

      try {
        const { data, error } = await supabase
          .from("users")
          .select("user_id")
          .eq("email", loginData.email);

        const userId = data;
        // console.log(userId);

        if (error) {
          return res.status(500).json({ error: "Supabase query failed" });
        }
        return res.json({
          message: "login succesfully",
          token,
          data: userId,
        });
      } catch (error) {
        res.json({ error: error });
      }
    }
  } catch (error) {
    res.json({ error: error });
  }
});

authRouter.get("/logout/:userId", async (req, res) => {
  await supabase.auth.signOut();
  const userId = req.params.userId;
  return res.json({
    message: "logout",
    data: userId,
  });
});

export default authRouter;
