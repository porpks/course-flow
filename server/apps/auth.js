import { Router } from "express";
import supabase from "../utils/db.js";
import jwt from "jsonwebtoken";
const authRouter = Router();

authRouter.post("/register", async (req, res) => {
<<<<<<< HEAD
=======
  const registerData = {
    full_name: req.body.name,
    dateofbirth: req.body.dateOfBirth,
    edu_background: req.body.educationBackground,
    email: req.body.email,
  };
>>>>>>> 4999396e16914f9695ca3c3f9ece7810f9e493cc
  try {
    const { data, error } = await supabase
      .from("register")
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
<<<<<<< HEAD
  try {
    const result = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });
    const accessToken = result.data.session.access_token;

=======

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });

    if (error) {
      return res.json({ error: error });
    }
    
    if(data){
      const token = data.session.access_token
      
>>>>>>> 4999396e16914f9695ca3c3f9ece7810f9e493cc
    try {
      const { data, error } = await supabase
        .from("register")
        .select("*")
        .eq("email", loginData.email);
<<<<<<< HEAD
      console.log(data);
      return res.json({ accessToken: accessToken, data: data });
=======

      const userId = data

      if (error) {
        return res.status(500).json({ error: "Supabase query failed" });
      }
      return res.json({ 
        message: "login succesfully",
        token ,
        data : userId
      })
>>>>>>> 4999396e16914f9695ca3c3f9ece7810f9e493cc
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
<<<<<<< HEAD
  } catch (error) {}
=======
    
  }
  } catch (error) {
    res.json({ error: error });
  }
>>>>>>> 4999396e16914f9695ca3c3f9ece7810f9e493cc
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
