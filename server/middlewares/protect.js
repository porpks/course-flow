import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import supabase from "../utils/db.js";
dotenv.config();

export const validateTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization; // Extract the token from the request headers

  if (!token) {
    return res.status(401).json({ error: 'Token is missing' });
  }

  try {
    // Verify the token using your Supabase secret key
    const decodedToken = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET_KEY);

    // At this point, you can access the user information from the decoded token
    const email = decodedToken.email;

    const { data, error } = await supabase
      .from("register")
      .select("user_id")
      .eq("email", email);

    if (error) {
      return res.status(500).json({ error: 'Error fetching user data' });
    }

    if (data && data.length > 0) {
      next();
    } else {
      res.status(401).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Token is invalid' });
  }
};
