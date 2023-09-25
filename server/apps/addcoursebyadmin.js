import { Router } from 'express'
import supabase from '../utils/db.js'

const addCourseRouter = Router()


addCourseRouter.post('/addcourse', async (req, res) => {

  const dataCourse = {
    course_name: req.body?.course_name,
    price: req.body.price,
<<<<<<< HEAD
    total_time: req.body.total_time,
    course_summary: req.body.course_summary,
    course_detail: req.body.course_detail,
    // cover_img,
    // video_trailer,
  }

  console.log(dataCourse)

  try {
    const { data, error } = await supabase
      .from('courses')
      .insert([dataCourse])

      .select()

    console.log(data)


    if (error) {
      return res.status(400).json({
        error: 'Upload Course failed',
        error_message: error.message,
      })
    }
=======
    total_time: req.body?.total_time,
    course_summary: req.body?.course_summary,
    course_detail: req.body?.course_detail,
  };

  console.log(dataCourse);
  return res.json({ message: dataCourse });
  // try {
  //   const { data, error } = await supabase
  //     .from("courses")
  //     .insert([dataCourse])
  //     .select();

  //   // console.log(data);

  //   if (error) {
  //     return res.status(400).json({
  //       error: "Upload Course failed",
  //       error_message: error.message,
  //     });
  //   }

  //   // console.log();

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
});
>>>>>>> 17f8f51 (feat : upload img)


    console.log()


    res.status(201).json({
      success: 'Course uploaded successfully',
      data: data,
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      error_message: error.message,
    })
  }
})

export default addCourseRouter
