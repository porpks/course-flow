/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext.jsx";
import { v4 as uuidv4 } from "uuid";

import "./Assignment.css";
const AssignmentBox = (props) => {
  const { userId } = useAuth();
  const [data, setData] = useState();
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line react/prop-types
  const sublessonID = props.sublessonID || null;
  useEffect(() => {
    const getAssignmentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/assignment/${userId}?sublessonid=${sublessonID}`
        );
        setData(response.data.data);

        const initialAnswers = response.data.data.map((assignment) => ({
          assignment_id: assignment.assignment_id,
          assignment_answer: assignment.assignment_answer || "",
          assignment_status: assignment.assignment_status,
        }));
        setAnswers(initialAnswers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAssignmentData();
  }, []);
  const pageSize = 1;

  const totalPages = Math.ceil((data || []).length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  const assignmentsToDisplay = (data || []).slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleAnswerChange = (e, assignmentId, status) => {
    const updatedAnswers = answers.map((answer) => {
      if (answer.assignment_id === assignmentId) {
        return {
          ...answer,
          assignment_answer: e.target.value,
          assignment_status: status,
        };
      }
      return answer;
    });
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (assignment_id) => {
    try {
      const assignmentAnswers = answers.map((answer) => ({
        assignment_id: answer.assignment_id,
        assignment_answer: answer.assignment_answer,
        assignment_status: answer.assignment_status,
      }));

      const response = await axios.put(
        `http://localhost:4000/assignment/${userId}?assignmentid=${assignment_id}`,
        assignmentAnswers
      );

      if (response.status === 200) {
        const updatedDataResponse = await axios.get(
          `http://localhost:4000/assignment/${userId}?sublessonid=${sublessonID}`
        );

        setData(updatedDataResponse.data.data);
      }

      await axios.put(
        `http://localhost:4000/learn/complete?userID=${userId}&sublessonID=${sublessonID}`
      );
      const newStatus = { ...props.subStatus };
      newStatus[sublessonID] = "complete";
      props.setSubStatus(newStatus);

      const result = await axios.get("http://localhost:4000/learn/status/", {
        params: {
          userID: userId,
          courseID: localStorage.getItem("course_id"),
        },
      });
      props.setPercentComplete(Number(result.data.percentComplete));

      if (Number(result.data.percentComplete) === 100) {
        const statusCompleteBody = {
          user_id: userId,
          course_id: localStorage.getItem("course_id"),
        };
        await axios.post(
          "http://localhost:4000/learn/status/",
          statusCompleteBody
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className='Frame427320994 w-[739px]  p-[24px] bg-slate-200 rounded-lg flex-col justify-start items-start gap-6 inline-flex'>
        {data &&
          assignmentsToDisplay.map((assignment, index) => {
            {/* const assignmentKey = uuidv4(); */ }
            return (
              <>
                <div key={index + "A"} className='w-[100%]'>
                  <div className=' Frame427320997 self-stretch flex items-start justify-between'>
                    <div className='Assignment grow shrink basis-0 h-8 text-black text-xl font-normal leading-loose'>
                      Assignment
                    </div>
                    <div
                      className={`StatusHomework px-2 py-1 ${assignment.assignment_status === "Pending"
                        ? "bg-[#FFFBDA]"
                        : assignment.assignment_status === "Submitted late"
                          ? "bg-red-100"
                          : assignment.assignment_status === "Submitted"
                            ? "bg-[#DCF8EE]"
                            : assignment.assignment_status === "Overdue"
                              ? "bg-[#FAE7F4]"
                              : null
                        } rounded justify-start items-start gap-2 inline-flex `}>
                      <div
                        className={`${assignment.assignment_status === "Pending"
                          ? " text-[#996400]"
                          : assignment.assignment_status === "Submitted late"
                            ? "text-red-500"
                            : assignment.assignment_status === "Submitted"
                              ? "text-[#0A7B60]"
                              : assignment.assignment_status === "Overdue"
                                ? "text-[#9B2FAC]"
                                : null
                          } text-base font-medium leading-normal`}>
                        {assignment.assignment_status === "Submitted late"
                          ? "Submitted Late"
                          : assignment.assignment_status}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`w-[100%] Frame427321002  p-6   rounded-lg border border-gray-300 justify-start items-end gap-6 inline-flex`}>
                    <div className='InputStyle grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex'>
                      <div className='Label self-stretch justify-start items-start gap-1 inline-flex'>
                        <div className='Email grow shrink basis-0 Body2'>
                          {assignment.assignment_question}
                        </div>
                      </div>
                      <div
                        className={`InputField self-stretch  pl-3 pr-4 py-3 rounded-lg border border-solid bg-white border-gray-300 justify-start items-start gap-2 inline-flex`}>
                        <div
                          className={`ContainerInputText  grow shrink basis-0 h-[96px] justify-start items-start flex bg-white`}>
                          <textarea
                            className={`bg-white  text-slate-400  placeholder-opacity-50 placeholder-slate-400  outline-none border-none Placeholder grow shrink basis-0  text-base font-normal leading-normal h-[100%]`}
                            placeholder='Answer...'
                            value={
                              answers.find(
                                (a) =>
                                  a.assignment_id === assignment.assignment_id
                              )?.assignment_answer ||
                              assignment.assignment_answer ||
                              ""
                            }
                            onChange={(e) =>
                              handleAnswerChange(e, assignment.assignment_id)
                            }
                            style={{ resize: "none" }}
                            readOnly={
                              assignment.assignment_status === "Submitted" ||
                              assignment.assignment_status === "Submitted late"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='Frame427321005 self-stretch justify-between items-center gap-6 flex'>
                    {assignment.assignment_status !== "Pending" ? null : (
                      <div
                        className='Primary px-8 py-4 bg-blue-800 rounded-xl shadow justify-center items-center gap-2.5 flex '
                        onClick={() => handleSubmit(assignment.assignment_id)}>
                        <div className=' text-center text-white text-base font-bold leading-normal'>
                          Send Assignment
                        </div>
                      </div>
                    )}
                    {assignment.assignment_status === "Pending" ? (
                      <div className='Email text-slate-500 text-base font-normal leading-normal'>
                        Assign within {assignment.assignment_duedate}
                      </div>
                    ) : null}
                  </div>
                </div>
              </>
            );
          })}
      </div>

      {/* <div className='pagination self-start'>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={"00" + index}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-item ${currentPage === index + 1 ? "active" : ""
              }`}>
            {index + 1}
          </button>
        ))}
      </div> */}
    </>
  );
};

export default AssignmentBox;
