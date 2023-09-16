import { Router } from "express";
import supabase from "../utils/db.js";

const MyCourseRouter = Router();

MyCourseRouter.get("/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    const { data, error } = await supabase
      .from(`user_courses`)
      .select(
        "*, courses(course_id, course_name, course_detail, cover_img, total_time, course_summary), users(user_id,full_name,image_url)"
      )
      .eq("user_id", userID);

    return res.json({
      data,
    });
  } catch (error) {
    message: `Get course error message ${error}`;
  }
});

MyCourseRouter.post("/", async (req, res) => {
  try {
    const { user_id, course_id } = req.body;
    const dataOnDataBase = await supabase
      .from("user_courses")
      .select("*")
      .eq("user_id", user_id)
      .eq("course_id", course_id);

    if (dataOnDataBase.data.length > 0) {
      return res.json({ error: `course ${course_id} already exists.` });
    }
    const subCourse = {
      user_id: req.body.user_id,
      course_id: req.body.course_id,
      course_status: false,
    };
    const { error } = await supabase.from("user_courses").insert(subCourse);

    if (error) {
      throw error;
    }

    res.json({ message: `course ${course_id} has been added.` });
  } catch (error) {
    
    res.status(500).json({ error: "An error occurred." });
  }
});

MyCourseRouter.get("/", async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const course_id = req.query.course_id;

    const data = await supabase
      .from("user_courses")
      .select("*")
      .eq("user_id", user_id)
      .eq("course_id", course_id);

    res.json(data);
  } catch (error) {
    console.error("Error fetching user course data:", error.message);
    res.status(500).json({ error });
  }
});

export default MyCourseRouter;
