import { useState } from "react";
import "./Assignment.css";
const AssignmentBox = () => {
  const mockAssignment = [
    {
      assignment_id: 1,
      coursename: "Service Design Essentials",
      lessonname: "introduction",
      sublessonname: "4 Levels of Service Design in an Organization",
      assignmentstatus: "Pending",
      assignmentquestion: "What are the 4 elements of service design?",
      assignmentduedate: 2,
      assignmentanswer: null,
    },
    {
      assignment_id: 2,
      coursename: "Service Design Essentials",
      lessonname: "introduction",
      sublessonname: "4 Levels of Service Design in an Organization",
      assignmentstatus: "Pending",
      assignmentquestion: "What are the 4 elements of service design?",
      assignmentduedate: "2",
      assignmentanswer: null,
    },
    {
      assignment_id: 3,
      coursename: "Service Design Essentials",
      lessonname: "introduction",
      sublessonname: "4 Levels of Service Design in an Organization",
      assignmentstatus: "Pending",
      assignmentquestion: "What are the 4 elements of service design?",
      assignmentduedate: "2",
      assignmentanswer: null,
    },
    {
      assignment_id: 4,
      coursename: "Service Design Essentials",
      lessonname: "introduction",
      sublessonname: "4 Levels of Service Design in an Organization",
      assignmentstatus: "Pending",
      assignmentquestion: "What are the 4 elements of service design?",
      assignmentduedate: "2",
      assignmentanswer: null,
    },
    {
      assignment_id: 5,
      coursename: "Service Design Essentials",
      lessonname: "introduction",
      sublessonname: "4 Levels of Service Design in an Organization",
      assignmentstatus: "Pending",
      assignmentquestion: "What are the 4 elements of service design?",
      assignmentduedate: "2",
      assignmentanswer: null,
    },
    {
      assignment_id: 6,
      coursename: "Service Design Essentials",
      lessonname: "introduction",
      sublessonname: "4 Levels of Service Design in an Organization",
      assignmentstatus: "Pending",
      assignmentquestion: "What are the 4 elements of service design?",
      assignmentduedate: "2",
      assignmentanswer: null,
    },
    {
      assignment_id: 7,
      coursename: "Service Design Essentials",
      lessonname: "introduction",
      sublessonname: "4 Levels of Service Design in an Organization",
      assignmentstatus: "Pending",
      assignmentquestion: "What are the 4 elements of service design?",
      assignmentduedate: "2",
      assignmentanswer: null,
    },
  ];
  const pageSize = 1;

  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState(
    mockAssignment.map((assignment) => ({
      answer: "",
      assignment_id: assignment.assignment_id,
    }))
  );

  const totalPages = Math.ceil(mockAssignment.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  const assignmentsToDisplay = mockAssignment.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleAnswerChange = (e, assignmentId) => {
    const answerIndex = answers.findIndex(
      (answer) => answer.assignment_id === assignmentId
    );
    const newAnswers = [...answers];
    newAnswers[answerIndex].answer = e.target.value;
    setAnswers(newAnswers);
  };

  //   const handleSubmit = async () => {
  //     // const results = await axios.put("", answers)
  //   };
  return (
    <>
      <div className='Frame427320994 w-[739px]  p-[24px] bg-slate-200 rounded-lg flex-col justify-start items-start gap-6 inline-flex '>
        {assignmentsToDisplay.map((assignment) => {
          return (
            <>
              <div
                className='Frame427320997 self-stretch justify-start items-start inline-flex'
                key={assignment.assignment_id}>
                <div className='Assignment grow shrink basis-0 h-8 text-black text-xl font-normal leading-loose'>
                  Assignment
                </div>
                <div
                  className={`StatusHomework px-2 py-1 ${
                    assignment.assignmentstatus === "Pending"
                      ? "bg-[#FFFBDA]"
                      : assignment.assignmentstatus === "In Progress"
                      ? "bg-[#EAF0FF]"
                      : assignment.assignmentstatus === "Submitted"
                      ? "bg-[#DCF8EE]"
                      : assignment.assignmentstatus === "Overdue"
                      ? "bg-[#FAE7F4]"
                      : null
                  } rounded justify-start items-start gap-2 inline-flex`}>
                  <div
                    className={`${
                      assignment.assignmentstatus === "Pending"
                        ? " text-[#996400]"
                        : assignment.assignmentstatus === "In Progress"
                        ? "text-[#3456CF]"
                        : assignment.assignmentstatus === "Submitted"
                        ? "text-[#0A7B60]"
                        : assignment.assignmentstatus === "Overdue"
                        ? "text-[#9B2FAC]"
                        : null
                    } text-base font-medium leading-normal`}>
                    {assignment.assignmentstatus}
                  </div>
                </div>
              </div>

              <div
                className={`w-[100%] Frame427321002  p-6   rounded-lg border border-gray-300 justify-start items-end gap-6 inline-flex`}>
                <div className='InputStyle grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex'>
                  <div className='Label self-stretch justify-start items-start gap-1 inline-flex'>
                    <div className='Email grow shrink basis-0 Body2'>
                      {assignment.assignmentquestion}
                    </div>
                  </div>
                  <div
                    className={`InputField self-stretch bg-white pl-3 pr-4 py-3 rounded-lg border border-solid border-gray-300 justify-start items-start gap-2 inline-flex`}>
                    <div className='ContainerInputText  grow shrink basis-0 h-[96px] justify-start items-start flex'>
                      <textarea
                        className={`${
                          assignment.assignmentstatus === "Submitted"
                            ? "bg-slate-200 text-slate-500 "
                            : "bg-white  text-slate-400"
                        }  placeholder-opacity-50 placeholder-slate-400  outline-none border-none Placeholder grow shrink basis-0  text-base font-normal leading-normal h-[100%]`}
                        placeholder='Answer...'
                        value={
                          answers.find(
                            (a) => a.assignment_id === assignment.assignment_id
                          )?.answer ||
                          assignment.assignmentanswer ||
                          ""
                        }
                        onChange={(e) =>
                          handleAnswerChange(e, assignment.assignment_id)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='Frame427321005 self-stretch justify-between items-center gap-6 inline-flex'>
                <div className='Primary px-8 py-4 bg-blue-800 rounded-xl shadow justify-center items-center gap-2.5 flex'>
                  <div className=' text-center text-white text-base font-bold leading-normal'>
                    Send Assignment
                  </div>
                </div>
                <div className='Email text-slate-500 text-base font-normal leading-normal'>
                  Assign within {assignment.assignmentduedate} days
                </div>
              </div>
            </>
          );
        })}
      </div>

      <div className='pagination self-start'>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-item ${
              currentPage === index + 1 ? "active" : ""
            }`}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default AssignmentBox;
