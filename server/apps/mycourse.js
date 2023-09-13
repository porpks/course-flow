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
    // .order("course_id", { ascending: true });
    console.log(data);
    console.log(data);
    return res.json({
      data,
    });
  } catch (error) {
    message: `Get course error message ${error}`;
  }
});

export default MyCourseRouter;
