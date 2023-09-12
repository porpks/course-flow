import { Router } from "express";
import supabase from "../utils/db.js";

const desireRouter = Router();

desireRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const { data, error } = await supabase
      .from("desire_courses")
      .select(
        `*,courses(course_id,course_name,cover_img,course_detail,total_time,lessons(lesson_id,lesson_name))`
      )
      .eq("user_id", userId);

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
