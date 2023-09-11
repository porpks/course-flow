import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../components/Assignment.css";
import { useState } from "react";
// import axios from "axios";
function AssignmentPage() {
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
      assignmentstatus: "In Progress",
      assignmentquestion: "What are the 4 elements of service design?",
      assignmentduedate: "2",
      assignmentanswer: null,
    },
    {
      assignment_id: 5,
      coursename: "Service Design Essentials",
      lessonname: "introduction",
      sublessonname: "4 Levels of Service Design in an Organization",
      assignmentstatus: "Submitted",
      assignmentquestion: "What are the 4 elements of service design?",
      assignmentduedate: "2",
      assignmentanswer: "test answer",
    },
    {
      assignment_id: 6,
      coursename: "Service Design Essentials",
      lessonname: "introduction",
      sublessonname: "4 Levels of Service Design in an Organization",
      assignmentstatus: "Overdue",
      assignmentquestion: "What are the 4 elements of service design?",
      assignmentduedate: "2",
      assignmentanswer: null,
    },
    {
      assignment_id: 7,
      coursename: "Service Design Essentials",
      lessonname: "introduction",
      sublessonname: "4 Levels of Service Design in an Organization",
      assignmentstatus: "Overdue",
      assignmentquestion: "What are the 4 elements of service design?",
      assignmentduedate: "2",
      assignmentanswer: null,
    },
  ];
  const pageSize = 4;

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState(
    mockAssignment.map((assignment) => ({
      answer: "",
      assignment_id: assignment.assignment_id,
    }))
  );

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const filteredAssignments = mockAssignment.filter((assignment) => {
    const isAssignmentNull =
      assignment.assignmentanswer === null ||
      assignment.assignmentstatus === "Submitted";
    return (
      (selectedFilter === "All" ||
        (selectedFilter === "In Progress" &&
          assignment.assignmentstatus === "In Progress") ||
        (selectedFilter === "Pending" &&
          assignment.assignmentstatus === "Pending") ||
        (selectedFilter === "Submitted" &&
          assignment.assignmentstatus === "Submitted") ||
        (selectedFilter === "Overdue" &&
          assignment.assignmentstatus === "Overdue")) &&
      isAssignmentNull
    );
  });

  const totalPages = Math.ceil(filteredAssignments.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  const assignmentsToDisplay = filteredAssignments.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleAnswerChange = (e, assignmentId) => {
    // Find the index of the answer in the answers array
    const answerIndex = answers.findIndex(
      (answer) => answer.assignment_id === assignmentId
    );

    // Create a copy of the answers array and update the answer for the specific assignment
    const newAnswers = [...answers];
    newAnswers[answerIndex].answer = e.target.value;

    // Update the answers state with the new array
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    // const results = await axios.put("", answers)
  };
  console.log(answers);
  return (
    <>
      <div className='flex flex-col items-center relative '>
        <Navbar />
        <div className='h-[2050px] bg-white  w-[1440px] flex flex-col items-center'>
          <svg
            width='1418'
            height='190'
            viewBox='0 0 1418 190'
            fill='none'
            className='absolute z-0'
            xmlns='http://www.w3.org/2000/svg'>
            <circle cx='64.5' cy='5.5' r='4' stroke='#2F5FAC' strokeWidth='3' />
            <circle cx='1381' cy='153' r='37' fill='#C6DCFF' />
            <circle cx='13.1741' cy='72.1741' r='13.1741' fill='#C6DCFF' />
            <path
              d='M1231.36 45.9099L1257.15 41.9774L1247.66 66.28L1231.36 45.9099Z'
              stroke='#FBAA1C'
              strokeWidth='3'
            />
            <path
              d='M248.843 132L243.838 150.68'
              stroke='#2FAC61'
              strokeWidth='3'
              strokeLinecap='round'
            />
            <path
              d='M237 138.838L255.681 143.843'
              stroke='#2FAC61'
              strokeWidth='3'
              strokeLinecap='round'
            />
          </svg>
          <div className='w-[453px] h-[153px] flex-col justify-start items-center gap-14 inline-flex z-[1]'>
            <div className='flex-col justify-start items-center gap-[60px] flex'>
              <div className='MyAssignments H2'>My Assignments</div>
            </div>
            <div className='justify-start items-start gap-4 inline-flex '>
              <div
                onClick={() => handleFilterSelect("All")}
                className={`cursor-pointer Component1 p-2 flex items-start gap-2 hover:border-b-2 border-solid border-black border-t-0 border-r-0 border-l-0 border-b-0 ${
                  selectedFilter === "All" ? "border-b-2" : ""
                }`}>
                <div className='Body2'>All</div>
              </div>
              <div
                onClick={() => {
                  handleFilterSelect("Pending");
                }}
                className={`cursor-pointer Component4 p-2 flex items-start gap-2 hover:border-b-2 border-solid border-black border-t-0 border-r-0 border-l-0 border-b-0 ${
                  selectedFilter === "Pending" ? "border-b-2" : ""
                }`}>
                <div className='Body2'>Pending</div>
              </div>
              <div
                onClick={() => handleFilterSelect("In Progress")}
                className={`cursor-pointer Component1 p-2 flex items-start gap-2 hover:border-b-2 border-solid border-black border-t-0 border-r-0 border-l-0 border-b-0 ${
                  selectedFilter === "In Progress" ? "border-b-2" : ""
                }`}>
                <div className='Body2'>In Progress</div>
              </div>
              <div
                onClick={() => handleFilterSelect("Submitted")}
                className={`cursor-pointer Component2 p-2 flex items-start gap-2 hover:border-b-2 border-solid border-black border-t-0 border-r-0 border-l-0 border-b-0 ${
                  selectedFilter === "Submitted" ? "border-b-2" : ""
                }`}>
                <div className='Body2'>Submitted</div>
              </div>
              <div
                onClick={() => handleFilterSelect("Overdue")}
                className={`cursor-pointer Component3 p-2 flex items-start gap-2 hover:border-b-2 border-solid border-black border-t-0 border-r-0 border-l-0 border-b-0 ${
                  selectedFilter === "Overdue" ? "border-b-2" : ""
                }`}>
                <div className='Body2'>Overdue</div>
              </div>
            </div>
          </div>
          <div className='Frame427321008 w-[1120px]  flex-col justify-start items-start gap-6 inline-flex mt-[40px]  '>
            {assignmentsToDisplay.map((assignment) => {
              return (
                <div
                  key={assignment.assignment_id}
                  className='relative Frame427321006 px-24 py-10 bg-slate-200 rounded-lg flex-col justify-start items-start gap-9 flex w-[100%]'>
                  <div className='Frame427321001 w-[100%] justify-start items-start gap-6 inline-flex'>
                    <div className='Frame427321000 grow shrink basis-0 flex-col justify-start items-start gap-3 inline-flex w-[100%]'>
                      <div className='CourseServiceDesignEssentials self-stretch text-black text-2xl font-medium leading-loose w-[100%]'>
                        Course: {assignment.coursename}
                      </div>
                      <div className='Introduction4LevelsOfServiceDesignInAnOrganization self-stretch text-slate-500 text-base font-normal leading-normal'>
                        {assignment.lessonname}: {assignment.sublessonname}
                      </div>
                    </div>
                    <div className='Frame427321007 flex-col justify-start items-end gap-2 inline-flex'>
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
                      <div className='Email text-slate-500 text-base font-normal leading-normal'>
                        Assign within {assignment.assignmentduedate} days
                      </div>
                    </div>
                  </div>
                  <div
                    className={`w-[100%] Frame427321002  p-6  ${
                      assignment.assignmentstatus === "Submitted"
                        ? "bg-none "
                        : " bg-white"
                    } rounded-lg border border-gray-300 justify-start items-end gap-6 inline-flex`}>
                    <div className='InputStyle grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex'>
                      <div className='Label self-stretch justify-start items-start gap-1 inline-flex'>
                        <div className='Email grow shrink basis-0 Body2'>
                          {assignment.assignmentquestion}
                        </div>
                      </div>
                      <div
                        className={`InputField self-stretch pl-3 pr-4 py-3 bg-none ${
                          assignment.assignmentstatus === "Submitted"
                            ? "bg-none"
                            : "bg-white"
                        }  ${
                          assignment.assignmentanswer
                            ? "border-none"
                            : "rounded-lg border border-solid border-gray-300"
                        } justify-start items-start gap-2 inline-flex`}>
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
                                (a) =>
                                  a.assignment_id === assignment.assignment_id
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
                    <div className='Frame427321003 flex-col  items-start gap-4 inline-flex justify-center'>
                      {selectedFilter !== "Submitted" && (
                        <>
                          <div
                            className=' cursor-pointer Primary mb-[20px] self-stretch px-8 py-4 bg-blue-800 rounded-xl shadow justify-center items-center gap-2.5 inline-flex'
                            onClick={handleSubmit}>
                            <div className='text-center text-white text-base font-bold leading-normal'>
                              Submit
                            </div>
                          </div>
                          <div className='cursor-pointer ButtonGhost px-2 py-1 rounded-2xl justify-center items-center gap-2 inline-flex'>
                            <div className='Register text-blue-800 text-base font-bold leading-normal h-[32px]'>
                              Open in Course
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='pagination '>
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
        </div>
        <Footer />
      </div>
    </>
  );
}

export default AssignmentPage;
