import { Router } from "express";
import supabase from "../utils/db.js";

const learnRouter = Router();

learnRouter.get("/", async (req, res) => {
    const userID = Number(req.query.userID);
    const courseID = Number(req.query.courseID);

    if (!userID || !courseID) {
        return res.status(400).json({
            message: "Invalid query"
        })
    }

    try {
        const { data: courseData, error: courseError } = await supabase
            .from('courses')
            .select('course_name, course_detail, cover_img, lessons(lesson_id, lesson_name, sublessons(sublesson_id, sublesson_name))')
            .eq('course_id', courseID)
            .single();

        if (courseError) {
            return res.status(404).json({ 'message': courseError });
        }

        const result = {
            ...courseData,
        }

        return res.json({
            'data': result
        });

    } catch (err) {
        return res.status(400).json({ 'Error:': err.message });
    }
})

learnRouter.get('/status', async (req, res) => {
    const userID = Number(req.query.userID);
    const sublessonID = Number(req.query.sublessonID);

    if (!userID || !sublessonID) {
        return res.status(400).json({
            message: "Invalid query"
        })
    }


    const { data, error } = await supabase
        .from('user_sublessons')
        .select('sublesson_status')
        // .eq('user_id', userID)
        .eq('sublesson_id', sublessonID);


    if (error) {
        return res.status(404).json({ 'message': error });
    }

    if (data) {
        return res.json({ 'data': data[0].sublesson_status });
    } else {
        return res.status(404).json({ message: 'No data found for the specified criteria.' });
    }

})

learnRouter.get('/videotime', async (req, res) => {
    const userID = Number(req.query.userID);
    const courseID = Number(req.query.courseID);
    console.log(userID, courseID);
    if (!userID || !courseID) {
        return res.status(400).json({
            message: "Invalid query"
        });
    }

    try {
        const { data: interval, error: courseError } = await supabase
            .from('user_sublessons')
            .select('sublesson_status,sublesson_video_timestop,sublessons(*,lessons(*))')
            
           
        for (const dataItem of interval) {
            dataItem.sublesson_id = dataItem.sublessons.sublesson_id;
            dataItem.sublesson_name = dataItem.sublessons.sublesson_name
            dataItem.course_id = dataItem.sublessons.lessons.course_id
            delete dataItem.sublessons;
        }

        // Filter the interval array
        const filteredInterval = interval.filter(dataItem => {
            return (dataItem.sublesson_status === "inprogress" && dataItem.sublesson_video_timestop !== null) && (dataItem.course_id === courseID)
        });

        res.json({ data: filteredInterval });
    } catch (e) {
        // Handle errors here
    }
});

export default learnRouter;
