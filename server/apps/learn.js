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
            .from('course')
            .select('coursename, coursedetail')
            .eq('course_id', courseID)
            .single();

        if (courseError) {
            return res.status(404).json({ 'message': courseError });
        }

        const { data: lessonData, error: lessonError } = await supabase
            .from('lesson')
            .select('lesson_id, lessonname')
            .eq('course_id', courseID);

        if (lessonError) {
            return res.status(404).json({ 'message': lessonError });
        }

        const result = {
            ...courseData,
            lesson: lessonData,
        }

        await Promise.all(result.lesson.map(async (lesson) => {
            const { data: sublessonData, error: sublessonError } = await supabase
                .from('sublesson')
                .select('sublesson_id, sublessonname')
                .eq('lesson_id', lesson.lesson_id)

            if (sublessonError) {
                return res.status(404).json({ 'message': sublessonError });
            }
            else {
                lesson.sublesson = sublessonData
            }
        }))

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
        .from('usersublesson')
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

export default learnRouter;
