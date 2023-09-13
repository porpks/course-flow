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

desireRouter.post("/", async (req, res) => {
  try {
    const desireData = {
      user_id: req.body.user_id,
      course_id: req.body.course_id,
    };

    const { error } = await supabase.from("desire_courses").insert(desireData);

    if (error) {
      throw error;
    }

    res.json({ message: "desire course has been add" });
  } catch (error) {
    console.log(error);
  }
});

desireRouter.delete("/", async (req, res) => {
  try {
    const { error } = await supabase
      .from("desire_courses")
      .delete()
      .eq("user_id", req.body.user_id)
      .eq("course_id", req.body.course_id);
    if (error) {
      throw error;
    }

    res.json({ message: "desire course has been delete" });
  } catch (error) {
    console.log(error);
  }
});

export default desireRouter;
