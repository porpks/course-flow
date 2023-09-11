import { Router } from "express";
import supabase from "../utils/db.js";

const MyCourseRouter = Router();

MyCourseRouter.get("/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    const { data, error } = await supabase
      .from(`userscourse`)
      .select(
        "*, course(course_id, coursename, coursedetail, coverimg, totallearningtime, coursesummary), register(full_name,image_url)"
      )
      .eq("user_id", userID);
    // .order("course_id", { ascending: true });
    return res.json({
      data,
    });
  } catch (error) {
    message: `Get course error message ${error}`;
  }
});

export default MyCourseRouter;
