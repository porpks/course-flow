import { Router } from "express";
import supabase from "../utils/db.js";

const courseRouter = Router();

courseRouter.get("/", async (req, res) => {
  try {
    let start = req.query.start - 1;
    let desc = req.query.desc;
    let course = req.query.course;
    let end = req.query.end - 1;

    const query = supabase
      .from("courses")
      .select("*,lessons(*,sublessons(*))")
      .order("course_id", { ascending: desc });

    const { count } = await supabase
      .from("courses")
      .select("*", { count: "exact", head: true });

    console.log(count);

    if (course) {
      query.ilike("course_name", `%${course}%`);
    }

    query.range(start, end);

    const { data, error } = await query;

    return res.json({
      data,
      count,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Get course error message ${error.message}` });
  }
});

courseRouter.get("/course", async (req, res) => {
  try {
    let keywords = req.query.keywords;
    let start = req.query.start - 1;
    let end = req.query.end - 1;

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
      .order("course_id", { ascending: true })
      .range(start, end);

    const { count } = await supabase
      .from("courses")
      .select("*", { count: "exact", head: true })
      .or(`${queryFullName},${queryKeywords}`);

    return res.json({
      data: data,
      count,
    });
  } catch (error) {
    console.log(error);
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

courseRouter.post("/:courseId", async (req, res) => {
  const lessonData = { lesson_name: req.body.lesson_name };
  // try {
  //   const courseId = req.params.courseId
  //   const { data, error } = await supabase
  //     .from('courses')
  //     .select('*,lessons(*,sublessons(sublesson_name,sublesson_id))')
  //     .eq('course_id', courseId)

  //   if (error) {
  //     throw error
  //   }

  //   return res.json({
  //     data: data[0],
  //   })
  // } catch (error) {
  //   message: error
  // }
});

courseRouter.delete("/:courseId", async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const { error } = await supabase
      .from("courses")
      .delete()
      .eq("course_id", courseId);
    return res.json({
      message: "course has been delete",
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
});

// courseRouter.put("/:courseId", async (req, res) => {
//   const courseId = req.params.courseId;
//   const lessonData = { lesson_name: req.body.lesson_name };

//   if (
//     !req.body.course_name ||
//     !req.body.price ||
//     !req.body.total_time ||
//     !req.body.course_summary ||
//     !req.body.course_detail
//   ) {
//     return res.status(400).json({
//       message: "Please enter all information.",
//     });
//   }
//   // มีไฟล์
//   try {
//     if (req.files.length > 0 || req.files.avatar) {
//       const fileImg = req.files.cover_img[0];
//       const fileImage = new Blob([fileImg.buffer], { type: fileImg.mimetype });

//       const { data: objects, error: err } = await supabase.storage
//         .from("test-avatar")
//         .list(`imgCover/${courseId}`);

//       if (err) {
//         console.error("Error listing objects:", err.message);
//       }

//       for (const object of objects) {
//         const { error: errorRemove } = await supabase.storage
//           .from("test-avatar")
//           .remove(`imgCover/${courseId}/${[object.name]}`);
//         if (errorRemove) {
//           console.error("Error remove objects:", errorRemove.message);
//         }
//       }

//       const { data, error } = await supabase.storage
//         .from("test-avatar")
//         .upload(`imgCover/${courseId}/${uuidv4()}`, fileImage);

//       if (error) {
//         console.error(error);
//       } else {
//         console.log("File uploaded successfully:", data);
//       }

//       const path = data.path;
//       const imgUrl = `${process.env.VITE_SUPABASE_URL}/storage/v1/object/public/test-avatar/${path}`;
//       const now1 = new Date();
//       const formattedDate1 =
//         now1.toISOString().replace(/T/, " ").replace(/\..+/, "") + ".682314+00";

//       try {
//         const { data, error } = await supabase
//           .from("courses")
//           .update({
//             course_name: req.body.courseName,
//             price: req.body.price,
//             total_time: req.body.totalLearningTime,
//             course_summary: req.body.courseSummary,
//             course_detail: req.body.courseDetail,
//             cover_img: imgUrl,
//             updated_at: formattedDate1,
//           })
//           .eq("course_id", req.body.courseId);
//         if (error) {
//           console.log(error);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     // ไม่มีไฟล์
//     else {
//       const now2 = new Date();
//       const formattedDate2 =
//         now2.toISOString().replace(/T/, " ").replace(/\..+/, "") + ".682314+00";

//       try {
//         const { data, error } = await supabase
//           .from("courses")
//           .update({
//             course_name: req.body.courseName,
//             price: req.body.price,
//             total_time: req.body.totalLearningTime,
//             course_summary: req.body.courseSummary,
//             course_detail: req.body.courseDetail,
//             updated_at: formattedDate2,
//           })
//           .eq("course_id", req.body.courseId);

//         if (error) {
//           console.log(error);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }

//   return res.json({
//     message: "Your course has been updated successfully.",
//   });
// });

export default courseRouter;
