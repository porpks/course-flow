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
            console.error('Error fetching course:', courseError);
            return;
        }

        const { data: lessonData, error: lessonError } = await supabase
            .from('lesson')
            .select('lesson_id, lessonname')
            .eq('course_id', courseID);

        if (lessonError) {
            console.error('Error fetching lessons:', lessonError);
            return;
        }

        const result = {
            ...courseData,
            lessons: lessonData,
        }

        await Promise.all(result.lessons.map(async (lesson) => {
            lesson.sublesson = []
            const { data: sublessonData, error: sublessonError } = await supabase
                .from('sublesson')
                .select('sublesson_id, sublessonname')
                .eq('lesson_id', lesson.lesson_id)

            if (sublessonError) {
                console.error('Error fetching sublessons:', sublessonError);
                return;
            }
            else {
                lesson.sublesson.push(sublessonData)
            }
        }))

        // await Promise.all(result.lessons.map(async (lesson) => {
        //     lesson.sublesson.map(async (sublesson) => {
        //         const { data: substatusData, error: substatusError } = await supabase
        //             .from('usersublesson')
        //             .select('sublesson_status')
        //             .eq('user_id', userID)
        //             .eq('sublesson_id', sublesson.sublesson_id)
        //         if (substatusError) {
        //             console.error('Error fetching sublessons:', substatusError);
        //             return;
        //         }
        //         else {
        //             console.log(substatusData);
        //         }
        //     })
        // }))

        return res.json({
            'data': result
        });

    } catch (err) {
        return res.status(400).json({ 'Error:': err.message });
    }
})

export default learnRouter;
