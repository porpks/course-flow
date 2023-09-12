import { Router } from "express";
import supabase from "../utils/db.js";

const courseRouter = Router();

courseRouter.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*,lessons(*,sublessons(*))")
      .order("course_id", { ascending: true });
    return res.json({
      data,
    });
  } catch (error) {
    message: `Get course error message ${error}`;
  }
});

courseRouter.get("/courses", async (req, res) => {
  try {
    let keywords = req.query.keywords;

    if (keywords === undefined) {
      return res.status(400).json({
        message: "Please send keywords parameter in the URL endpoint",
      });
    }

    const regexKeywords = keywords
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .split(/\s+/) // Split on whitespace
      .map((word) => word.replace(/\s/g, "\\s*"))
      .join(" ");

    const queryFullName = `course_name.ilike.${keywords}`;
    const queryKeywords = `course_name.ilike.%${regexKeywords}%`;

    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .or(`${queryFullName},${queryKeywords}`)
      .order("course_id", { ascending: true });

    if (error) {
      throw error;
    }

    return res.json({
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching data from Supabase",
      error: error.message,
    });
  }
});

courseRouter.get("/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { data, error } = await supabase
      .from("courses")
      .select("*,lessons(*,sublessons(sublesson_name,sublesson_id))")
      .eq("course_id", courseId);

    if (error) {
      throw error;
    }

    return res.json({
      data: data[0],
    });
  } catch (error) {
    message: error;
  }
});

export default courseRouter;
