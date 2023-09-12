import { Router } from "express";
import supabase from "../utils/db.js";

const assignmentRouter = Router();

assignmentRouter.get("/:userID", async (req, res) => {
    const userId = req.params.userID;

    const { data, error } = await supabase
    .from("assignments")
    .select(
      "*,sublessons(sublesson_id,sublesson_name,lessons(lesson_id,lesson_name,courses(course_name,user_courses(*))))"
    );

    const flatData = data;

    function calculateDueDateStatus(assignmentduedate) {
        const dueDate = new Date(assignmentduedate);
        const currentDate = new Date();
        const timeDifference = dueDate - currentDate;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        if (daysDifference < 0) {
            return "Overdue";
        } else if (daysDifference < 1) {
            const hoursDifference = Math.floor(
                (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutesDifference = Math.floor(
                (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
            );

            if (hoursDifference > 0) {
                return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ${minutesDifference} minute${minutesDifference > 1 ? 's' : ''}`;
            } else {
                return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''}`;
            }
        } else {
            return `${Math.ceil(daysDifference)} day${daysDifference > 1 ? 's' : ''}`;
        }
    }

    for (const dataItem of flatData) {
        dataItem.sublesso_name = dataItem.sublessons.sublesson_name;
        dataItem.lesson_name = dataItem.sublessons.lessons.lesson_name;
        dataItem.course_name = dataItem.sublessons.lessons.courses.course_name;
        dataItem.assignment_duedate = calculateDueDateStatus(dataItem.assignment_duedate);
        dataItem.userId = dataItem.sublessons.lessons.courses.user_courses[0].user_id;
        delete dataItem.sublessons;

        if (dataItem.assignment_duedate === "Overdue") {
            const { data: update, error } = await supabase
                .from('assignment')
                .update({ "assignment_status": 'Overdue' })
                .eq('assignment_id', dataItem.assignment_id)
                .select();
            console.log(update);
        }
    }

    res.json({ data:flatData});
});

assignmentRouter.put('/:userID', async (req, res) => {
    const body = req.body;
    const userId = req.params.userID;

    if (!Array.isArray(body)) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    try {
        for (const assignment of body) {
            if (
                assignment &&
                assignment.assignment_status &&
                assignment.assignment_status.trim() === 'Overdue' &&
                assignment.assignment_answer &&
                assignment.assignment_answer.trim() !== ''
            ) {
                assignment.assignment_status = 'Submitted late';
            } else if (
                assignment &&
                assignment.assignment_answer &&
                assignment.assignment_answer.trim() !== ''
            ) {
                assignment.assignment_status = 'Submitted';
            }
        }

        const { data, error } = await supabase
            .from('assignments')
            .upsert(body, { onConflict: ['assignment_id'] });

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


export default assignmentRouter;
