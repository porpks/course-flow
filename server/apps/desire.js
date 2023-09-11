import { Router } from "express";
import supabase from "../utils/db.js";

const desireRouter = Router();

desireRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const { data, error } = await supabase
      .from("register")
      .select(`*,desirecourse(user_id,course_id)`)
      .eq("register.user_id", userId);

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching user course data:", error.message);
    res.status(500).json({ error });
  }
});

export default desireRouter;
