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
    const subCourse = {
      user_id: req.body.user_id,
      course_id: req.body.course_id,
      course_status: false,
    };
  } catch (error) {
    console.log(`Message error :${error}`);
  }
});

export default MyCourseRouter;
