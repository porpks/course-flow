import { Router } from "express";
import supabase from "../utils/db.js";

const desireRouter = Router();

desireRouter.get("/", async (req, res) => {
  try {
    const userId = req.params.userId;

    const { data, error } = await supabase
      .from("register")
      .select(
        "register.user_id",
        "course.course_id",
        "course.coursename",
        { count: "lesson.lesson_id", alias: "lesson_count" },
        { count: "course.totallearningtime", alias: "totallearningtime" }
      )
      .join("desirecourse", { "register.user_id": "desirecourse.user_id" })
      .join("course", { "desirecourse.course_id": "course.course_id" })
      .left("lesson", { "course.course_id": "lesson.course_id" })
      .eq("register.user_id", userId)
      .groupBy("course.course_id", "course.coursename", "register.user_id");

    if (error) {
      console.log(error);
    }

    return res.json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Get desire course error message ${error}`,
    });
  }
});

export default desireRouter;
