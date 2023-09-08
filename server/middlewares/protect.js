import dotenv from "dotenv";
import  jwt  from "jsonwebtoken";
import supabase from "../utils/db.js";
dotenv.config();
export const validateTokenMiddleware = async(req, res, next) => {
    const token = req.headers.authorization; // Extract the token from the request headers
  
    if (!token) {
      return res.status(401).json({ error: 'Token is missing' });
    }
  
    try {
      // Verify the token using your Supabase secret key
      const decodedToken = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET_KEY);
  
      // At this point, you can access the user information from the decoded token
      console.log(decodedToken);
      const email = decodedToken.email;

      const { data, error } = await supabase
      .from("register")
      .select("user_id")
      .eq("email", email);
        console.log(data);
        if(data) {
        next();
      } else{
        res.json(data);
      } 
    //   const userId = decodedToken.sub; // User ID from the token
          // You can also add the user information to the request object for further processing
    //   req.userId = userId;
  
      // Continue processing the request
      
    } catch (error) {
      return res.status(401).json({ error: 'Token is invalid' });
    }
  };
  