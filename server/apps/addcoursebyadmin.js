import { Router } from 'express'
import supabase from '../utils/db.js'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

const addCourseRouter = Router()
const multerUpload = multer({})
const imageCoverUpload = multerUpload.fields([
  { name: 'cover_img', maxCount: 1 },
  { name: 'video_trailer', maxCount: 1 },
])

addCourseRouter.post('/addcourse', imageCoverUpload, async (req, res) => {

  const body = req.body;

  const courseName = req.body.course_name
  const dataCourse = {
    course_name: req.body?.course_name,
    price: req.body.price,
    total_time: req.body.total_time,
    course_summary: req.body.course_summary,
    course_detail: req.body.course_detail,
    cover_img: req.body.cover_img,
    video_trailer: req.body.video_trailer,
  }


  // UPLOAD FILE IMG
  try {
    if (
      req.files.length > 0 ||
      req.files.cover_img ||
      req.files.video_trailer
    ) {
      const fileImg = req.files.cover_img[0]
      const fileImage = new Blob([fileImg.buffer], { type: fileImg.mimetype })
      const fileVdo = req.files.video_trailer[0]
      const file_Video = new Blob([fileVdo.buffer], { type: fileVdo.mimetype })
      // const fileName = file.originalname.replace(/ /g, "_");

      // const { data: dd, error: ee } = await supabase.storage.from('test-avatar').remove(`profile/${userId}`)

      const { data: objects, error: err } = await supabase.storage
        .from('test-avatar')
        .list(`imgCover/${courseName}`)

      if (err) {
        console.error('Error listing objects:', err.message)
      }

      // Delete each object in the folder
      for (const object of objects) {
        const { error: errorRemove } = await supabase.storage
          .from('test-avatar')
          .remove(`imgCover/${courseName}/${[object.name]}`)
        if (errorRemove) {
          console.error('Error remove objects:', errorRemove.message)
        }
      }

      const { data, error } = await supabase.storage
        .from('test-avatar')
        .upload(`imgCover/${courseName}/${uuidv4()}`, fileImage)

      if (error) {
        console.error(error)
      } else {
        console.log('File uploaded successfully:', data)
      }

      const path = data.path
      const imgUrl = `${process.env.VITE_SUPABASE_URL}/storage/v1/object/public/test-avatar/${path}`

      try {
        if (req.files.length > 0 || req.files.video_trailer) {
          const fileVdo = req.files.video_trailer[0]
          const file_Video = new Blob([fileVdo.buffer], {
            type: fileVdo.mimetype,
          })
          // const fileName = file.originalname.replace(/ /g, "_");

          // const { data: dd, error: ee } = await supabase.storage.from('test-avatar').remove(`profile/${userId}`)

          const { data: objects, error: err } = await supabase.storage
            .from('test-avatar')
            .list(`videoTrailer/${courseName}`)

          if (err) {
            console.error('Error listing objects:', err.message)
          }

          // Delete each object in the folder
          for (const object of objects) {
            const { error: errorRemove } = await supabase.storage
              .from('test-avatar')
              .remove(`videoTrailer/${courseName}/${[object.name]}`)
            if (errorRemove) {
              console.error('Error remove objects:', errorRemove.message)
            }
          }

          const { data, error } = await supabase.storage
            .from('test-avatar')
            .upload(`videoTrailer/${courseName}/${uuidv4()}`, file_Video)

          if (error) {
            console.error(error)
          } else {
            console.log('File uploaded successfully:', data)
          }

          const path = data.path
          const vdoUrl = `${process.env.VITE_SUPABASE_URL}/storage/v1/object/public/test-avatar/${path}`

          try {
            const { data, error } = await supabase
              .from('courses')
              .insert({
                ...dataCourse,
                cover_img: imgUrl,
                video_trailer: vdoUrl,
              })
              .select()
            if (error) {
              console.log(error)
            }
          } catch (error) {
            console.error(error)
          }
        }
      } catch (error) {
        console.log(error)
      }
      // try {
      //   const { data, error } = await supabase
      //     .from("courses")
      //     .insert([dataCourse])

      //     .select();

      //   console.log(data);

      //   if (error) {
      //     return res.status(400).json({
      //       error: "Upload Course failed",
      //       error_message: error.message,
      //     });
      //   }

      //   console.log();

      //   res.status(201).json({
      //     success: "Course uploaded successfully",
      //     data: data,
      //   });
      // } catch (error) {
      //   console.error("Error:", error);
      //   res.status(500).json({
      //     error: "Internal Server Error",
      //     error_message: error.message,
      //   });
      // }
      const extractedData = body;
      const lessons = Object.values(extractedData).filter(item => typeof item === "object");
      let lessonIdMap = {};
      let subLessonId = [];
      let { data: courses, error } = await supabase
        .from('courses')
        .select('course_id')
        .order("course_id", { ascending: false })
        .limit(1)
      try {
        const courseId = courses[0].course_id
        const insertPromises = lessons.map(async (lesson) => {
          const lessonName = lesson.lessonName;


          const { data: lessonData } = await supabase
            .from("lessons")
            .insert({ course_id: courseId, lesson_name: lessonName })
            .select()
            .order("lesson_id", { ascending: false });

          if (!lessonData || lessonData.length === 0) {
            throw new Error("Lesson data is null or empty");
          }

          const lessonId = lessonData[0].lesson_id;
          lessonIdMap[lessonId] = [];


          if (lesson.subLessonData && Array.isArray(lesson.subLessonData)) {
            const subLessonInsertPromises = lesson.subLessonData.map(async (subLesson) => {
              const subLessonName = subLesson.subLessonName;
              console.log(subLessonName)
              const { data: subLessonData, error } = await supabase
                .from("sublessons")
                .insert([{ lesson_id: lessonId, sublesson_name: subLessonName }])
                .select("sublesson_id")
                .order("sublesson_id", { ascending: false });

              subLessonId.push(subLessonData[0].sublesson_id)
              let subLessonId1 = subLessonData[0].sublesson_id;
              lessonIdMap[lessonId].push(subLessonId1);
            });

            await Promise.all(subLessonInsertPromises);
          }
        });

        await Promise.all(insertPromises);
        console.log(lessonIdMap)
        console.log(subLessonId)

        res.json({ success: true, message: "Lessons and sub-lessons inserted successfully" });
      } catch (error) {
        console.error("Error inserting lessons and sub-lessons:", error);
        res.status(500).json({ error: "Internal server error" });
      }

    }
  } catch (error) {
    console.log(error)
  }
})

export default addCourseRouter
