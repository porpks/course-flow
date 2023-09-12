import { Router } from "express";
import supabase from "../utils/db.js";

const assignmentRouter = Router();

assignmentRouter.get("/:userID", async (req, res) => {
    const userId = req.params.userID;
    const { data, error } = await supabase
        .from("assignment")
        .select(
            "*,sublesson(sublesson_id,sublessonname,lesson(lesson_id,lessonname,course(coursename,userscourse(*))))"
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
        dataItem.sublessonname = dataItem.sublesson.sublessonname;
        dataItem.lessonname = dataItem.sublesson.lesson.lessonname;
        dataItem.coursename = dataItem.sublesson.lesson.course.coursename;
        dataItem.assignmentduedate = calculateDueDateStatus(dataItem.assignmentduedate);
        dataItem.userId = dataItem.sublesson.lesson.course.userscourse[0].user_id;
        delete dataItem.sublesson;

        if (dataItem.assignmentduedate === "Overdue") {
            const { data: update, error } = await supabase
                .from('assignment')
                .update({ "assignmentstatus": 'Overdue' })
                .eq('assignment_id', dataItem.assignment_id)
                .select();
            console.log(update);
        }
    }

    res.json({ data: flatData });
});

export default assignmentRouter;
