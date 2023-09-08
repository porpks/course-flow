import { Router } from "express";
import supabase from "../utils/db.js";
import jwt from "jsonwebtoken";
const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("register")
      .insert([registerData])
      .select();
    console.log(data);
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
    const result = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });
    const accessToken = result.data.session.access_token;

    try {
      const { data, error } = await supabase
        .from("register")
        .select("*")
        .eq("email", loginData.email);
      console.log(data);
      return res.json({ accessToken: accessToken, data: data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {}
});

// authRouter.get("/logout/:userId", async (req, res) => {
//   await supabase.auth.signOut();
//   const userId = req.params.userId;
//   return res.json({
//     message: "logout",
//     data: userId,
//   });
// });

export default authRouter;
