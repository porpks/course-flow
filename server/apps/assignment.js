import { Router } from "express";
import supabase from "../utils/db.js";

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

const assignmentRouter = Router();

assignmentRouter.get("/:userID", async (req, res) => {
    const userId = req.params.userID;
    const Sublessonid = req.query.sublessonid
    
    if(!Sublessonid){
    const { data, error } = await supabase
    .from("user_assignments")
    .select(
      "*,assignments(sublesson_id,assignment_question,sublessons(lesson_id,sublesson_name,sublesson_video,lessons(*,courses(course_name))))"
    )
    .eq("user_id", `${userId}`);

    let flatData = data;
    
    const flatData2 = flatData.filter(dataItem => {
        if (dataItem.assignment_status === null) {
            return false;
        } else {
            dataItem.sublesson_name = dataItem.assignments.sublessons.sublesson_name;
            dataItem.lesson_name = dataItem.assignments.sublessons.lessons.lesson_name;
            dataItem.course_name = dataItem.assignments.sublessons.lessons.courses.course_name;
            dataItem.assignment_duedate = calculateDueDateStatus(dataItem.assignment_duedate);
            dataItem.userId = dataItem.user_id;
            delete dataItem.assignments;
            delete dataItem.user_id;
            delete dataItem.user_assignment_id;
    
            if (dataItem.assignment_duedate === "Overdue") {
                supabase
                    .from('user_assignments')
                    .update({ "assignment_status": 'Overdue' })
                    .eq('assignment_id', dataItem.assignment_id)
                    .select()
                    .then(response => {
                        dataItem.assignment_status = "Overdue";
                    })
                    .catch(error => {
                        console.error("Error updating assignment_status:", error);
                    });
            }
    
            return true;
        }
    });
    

    res.json({ data:flatData2});
    
    } else{
    const { data, error } = await supabase
    .from("user_assignments")
    .select(
      "*,assignments(sublesson_id,assignment_question,sublessons(lesson_id,sublesson_name,sublesson_video,lessons(*,courses(course_name))))"
    )
    .eq("assignments.sublesson_id", `${Sublessonid}`)
    .eq("user_id", `${userId}`);
    
    let flatData = data;
    const filteredData = flatData.filter(item => item.assignments !== null);
    
    for (const dataItem of filteredData) {
        dataItem.sublesson_name = dataItem.assignments.sublessons.sublesson_name;
        dataItem.lesson_name = dataItem.assignments.sublessons.lessons.lesson_name;
        dataItem.course_name = dataItem.assignments.sublessons.lessons.courses.course_name;
        dataItem.assignment_duedate = calculateDueDateStatus(dataItem.assignment_duedate);
        dataItem.userId = dataItem.user_id;
        dataItem.assignment_status = "Pending"
        delete dataItem.assignments;
        delete dataItem.user_id;
        delete dataItem.user_assignment_id

        if (dataItem.assignment_duedate === "Overdue") {
            const { data: update, error } = await supabase
                .from('user_assignments')
                .update({ "assignment_status": 'Overdue' })
                .eq('assignment_id', dataItem.assignment_id)
                .select();
           dataItem.assignment_status = "Overdue"
        }
        
        
            const { data, error } = await supabase
            .from('user_assignments')
            .update({ assignment_status: 'Pending' })
            .eq('assignment_id', dataItem.assignment_id)


       
    }
    res.json({ data:filteredData});
    }   
   
    // res.json({ data:flatData});
});

assignmentRouter.put('/:userID', async (req, res) => {
    const body = req.body;
    const userId = req.params.userID;
    const assignmentid = req.query.assignmentid

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
        const body2 = body.filter((item) => item.assignment_id == assignmentid)
        
     
        
        if(body2 && body2[0].assignment_id !== undefined){
        const { data:data1, error:err } = await supabase
        .from('user_assignments')
        .update({ "assignment_answer": `${body2[0].assignment_answer}` })
        .eq('assignment_id', body2[0].assignment_id)
        .select()

        const { data:data2, error:err2 } = await supabase
        .from('user_assignments')
        .update({ "assignment_status": `${body2[0].assignment_status}`})
        .eq('assignment_id', body2[0].assignment_id)
        .select()    

        
        console.log(data2)
        res.json({ data2 });
    }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


export default assignmentRouter;
