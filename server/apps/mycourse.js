import { Router } from "express";
import supabase from "../utils/db.js";

const MyCourseRouter = Router();

// MyCourseRouter.get("/", async (req, res) => {
//   try {
//     const { data, error } = await supabase
//       .from("course")
//       .select("*")
//       .order("course_id", { ascending: true });
//     return res.json({
//       data,
//     });
//   } catch (error) {
//     message: `Get course error message ${error}`;
//   }
// });

MyCourseRouter.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("usercourse").select("*");
    // .order("course_id", { ascending: true });
    return res.json({
      data,
    });
  } catch (error) {
    message: `Get course error message ${error}`;
  }
});

export default MyCourseRouter;
