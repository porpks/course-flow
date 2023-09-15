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
            .select('course_name, course_detail, cover_img, lessons(lesson_id, lesson_name, sublessons(sublesson_id, sublesson_name,sublesson_video))')
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
    const courseID = Number(req.query.courseID);

    if (!userID) {
        return res.status(400).json({
            message: "Invalid query"
        })
    }

    const { data, error } = await supabase
        .from('user_sublessons')
        .select('sublesson_id,sublesson_status, sublessons(lesson_id, lessons(course_id))')
        .eq('user_id', userID)

    const result = data.filter((item) => item.sublessons.lessons.course_id === courseID)
    const newResult = {}
    let count = 0
    let complete = 0
    result.map((item) => {
        newResult[item.sublesson_id] = item.sublesson_status
        count++
        if (item.sublesson_status === "complete") {
            complete++
        }

    })
    let percentComplete = (complete / count * 100).toFixed(2)

    if (error) {
        return res.status(404).json({ 'message': error });
    }

    if (data) {
        return res.json({ 'data': newResult, percentComplete });
    } else {
        return res.status(404).json({ message: 'No data found for the specified criteria.' });
    }

})

learnRouter.get('/videotime', async (req, res) => {
    const courseID = Number(req.query.courseID);

    if (!courseID) {
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
            dataItem.sublesson_video = dataItem.sublessons.sublesson_video
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
