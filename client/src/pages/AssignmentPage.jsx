import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../components/Assignment.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import CircularIndeterminate from '../assets/loadingProgress'
function AssignmentPage() {
  const { userId } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    const getAssignmentData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(
          `http://localhost:4000/assignment/${userId}`
        )
        setData(response.data.data)

        const initialAnswers = response.data.data.map((assignment) => ({
          assignment_id: assignment.assignment_id,
          assignment_answer: assignment.assignment_answer || '',
          assignment_status: assignment.assignment_status,
        }))
        setAnswers(initialAnswers)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    getAssignmentData()
  }, [currentPage])

  const pageSize = 4

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter)
    setCurrentPage(1)
  }

  const filteredAssignments = data?.filter((assignment) => {
    return (
      selectedFilter === 'All' ||
      (selectedFilter === 'Submitted late' &&
        assignment.assignment_status === 'Submitted late') ||
      (selectedFilter === 'Pending' &&
        assignment.assignment_status === 'Pending') ||
      (selectedFilter === 'Submitted' &&
        assignment.assignment_status === 'Submitted') ||
      (selectedFilter === 'Overdue' &&
        assignment.assignment_status === 'Overdue')
    )
  })

  const totalPages = Math.ceil((filteredAssignments || []).length / pageSize)

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = currentPage * pageSize

  const assignmentsToDisplay = (filteredAssignments || []).slice(
    startIndex,
    endIndex
  )

  const handleAnswerChange = (e, assignmentId, status) => {
    const updatedAnswers = answers.map((answer) => {
      if (answer.assignment_id === assignmentId) {
        return {
          ...answer,
          assignment_answer: e.target.value,
          assignment_status: status,
        }
      }
      return answer
    })
    setAnswers(updatedAnswers)
  }

  const handleSubmit = async (assignment_id, sublessonId, courseId) => {
    try {
      const assignmentAnswers = answers.map((answer) => ({
        assignment_id: answer.assignment_id,
        assignment_answer: answer.assignment_answer,
        assignment_status: answer.assignment_status,
      }))

      const response = await axios.put(
        `http://localhost:4000/assignment/${userId}?assignmentid=${assignment_id}`,
        assignmentAnswers
      )

      if (response.status === 200) {
        const updatedDataResponse = await axios.get(
          `http://localhost:4000/assignment/${userId}`
        )

        setData(updatedDataResponse.data.data)
      }

      await axios.put(
        `http://localhost:4000/learn/complete?userID=${userId}&sublessonID=${sublessonId}`
      );

      const result = await axios.get(`http://localhost:4000/learn/status?userID=${userId}&courseID=${courseId}`);

      if (Number(result.data.percentComplete) === 100) {
        const statusCompleteBody = {
          user_id: userId,
          course_id: courseId,
        };
        await axios.post(
          "http://localhost:4000/learn/status/",
          statusCompleteBody
        )
      }

    } catch (error) {
      console.log(error.message)
    }
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-[100%] min-h-[100vh] gap-8 text-black">
        <h1>Loading...</h1>
        <CircularIndeterminate />
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center py-[100px] ">
        <div className="top-5 min-h-[350px] bg-white  w-[1440px] flex flex-col items-center relative">
          <svg
            width="1418"
            height="190"
            viewBox="0 0 1418 190"
            fill="none"
            className="absolute "
            xmlns="http://www.w3.org/2000/svg">

            <circle cx="64.5" cy="5.5" r="4" stroke="#2F5FAC" strokeWidth="3" />
            <circle cx="1381" cy="153" r="37" fill="#C6DCFF" />
            <circle cx="13.1741" cy="72.1741" r="13.1741" fill="#C6DCFF" />
            <path
              d="M1231.36 45.9099L1257.15 41.9774L1247.66 66.28L1231.36 45.9099Z"
              stroke="#FBAA1C"
              strokeWidth="3"
            />
            <path
              d="M248.843 132L243.838 150.68"
              stroke="#2FAC61"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M237 138.838L255.681 143.843"
              stroke="#2FAC61"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <div className="w-[500px] h-[153px] flex-col justify-start items-center gap-14 inline-flex z-[1]">
            <div className="flex-col justify-start items-center gap-[60px] flex">
              <div className="MyAssignments H2">My Assignments</div>
            </div>
            <div className="justify-start items-start gap-4 inline-flex ">
              <div
                onClick={() => handleFilterSelect('All')}
                className={`cursor-pointer Component1 p-2 flex items-start gap-2 hover:border-b-2 border-solid border-black border-t-0 border-r-0 border-l-0 border-b-0 ${selectedFilter === 'All' ? 'border-b-2' : ''
                  }`}
              >
                <div className="Body2">All</div>
              </div>
              <div
                onClick={() => {
                  handleFilterSelect('Pending')
                }}
                className={`cursor-pointer Component4 p-2 flex items-start gap-2 hover:border-b-2 border-solid border-black border-t-0 border-r-0 border-l-0 border-b-0 ${selectedFilter === 'Pending' ? 'border-b-2' : ''
                  }`}
              >

                <div className="Body2">Pending</div>
              </div>

              <div
                onClick={() => handleFilterSelect('Submitted')}
                className={`cursor-pointer Component2 p-2 flex items-start gap-2 hover:border-b-2 border-solid border-black border-t-0 border-r-0 border-l-0 border-b-0 ${selectedFilter === 'Submitted' ? 'border-b-2' : ''
                  }`}
              >

                <div className="Body2">Submitted</div>
              </div>
              <div
                onClick={() => handleFilterSelect('Overdue')}
                className={`cursor-pointer Component3 p-2 flex items-start gap-2 hover:border-b-2 border-solid border-black border-t-0 border-r-0 border-l-0 border-b-0 ${selectedFilter === 'Overdue' ? 'border-b-2' : ''
                  }`}
              >

                <div className="Body2">Overdue</div>
              </div>
              <div
                onClick={() => handleFilterSelect('Submitted late')}
                className={`cursor-pointer Component1 p-2 flex items-start gap-2 hover:border-b-2 border-solid border-black border-t-0 border-r-0 border-l-0 border-b-0 ${selectedFilter === 'Submitted late' ? 'border-b-2' : ''
                  }`}
              >

                <div className="Body2">Submitted Late</div>
              </div>
            </div>
          </div>
          <div className="Frame427321008 w-[1120px]  flex-col justify-start items-start gap-6 inline-flex mt-[40px]  ">
            {filteredAssignments && filteredAssignments.length > 0 ? (
              assignmentsToDisplay.map((assignment, index) => {
                return (
                  <div
                    key={index}
                    className="relative Frame427321006 px-24 py-10 bg-slate-200 rounded-lg flex-col justify-start items-start gap-9 flex w-[100%]"
                  >

                    <div className="Frame427321001 w-[100%] justify-start items-start gap-6 inline-flex">
                      <div className="Frame427321000 grow shrink basis-0 flex-col justify-start items-start gap-3 inline-flex w-[100%]">
                        <div className="CourseServiceDesignEssentials self-stretch text-black text-2xl font-medium leading-loose w-[100%]">
                          Course: {assignment.course_name}
                        </div>
                        <div className="Introduction4LevelsOfServiceDesignInAnOrganization self-stretch text-slate-500 text-base font-normal leading-normal">
                          {assignment.lesson_name}: {assignment.sublesson_name}
                        </div>
                      </div>
                      <div className="Frame427321007 flex-col justify-start items-end gap-2 inline-flex">
                        <div
                          className={`StatusHomework px-2 py-1 ${assignment.assignment_status === 'Pending'
                            ? 'bg-[#FFFBDA]'
                            : assignment.assignment_status ===
                              'Submitted late'
                              ? 'bg-red-100'
                              : assignment.assignment_status === 'Submitted'
                                ? 'bg-[#DCF8EE]'
                                : assignment.assignment_status === 'Overdue'
                                  ? 'bg-[#FAE7F4]'
                                  : null
                            } rounded justify-start items-start gap-2 inline-flex`}
                        >
                          <div
                            className={`${assignment.assignment_status === 'Pending'
                              ? ' text-[#996400]'
                              : assignment.assignment_status ===
                                'Submitted late'
                                ? 'text-red-500'
                                : assignment.assignment_status === 'Submitted'
                                  ? 'text-[#0A7B60]'
                                  : assignment.assignment_status === 'Overdue'
                                    ? 'text-[#9B2FAC]'
                                    : null
                              } text-base font-medium leading-normal`}
                          >
                            {assignment.assignment_status === 'Submitted late'
                              ? 'Submitted Late'
                              : assignment.assignment_status}
                          </div>
                        </div>
                        {assignment.assignment_status === 'Pending' ? (

                          <div className="Email text-slate-500 text-base font-normal leading-normal">
                            Assign within {assignment.assignment_duedate}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div
                      className={`w-[100%] Frame427321002  p-6  
                      } rounded-lg border border-gray-300 justify-start items-end gap-6 inline-flex`}
                    >

                      <div className="InputStyle grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                        <div className="Label self-stretch justify-start items-start gap-1 inline-flex">
                          <div className="Email grow shrink basis-0 Body2">
                            {assignment.assignment_question}
                          </div>
                        </div>
                        <div
                          className={`InputField self-stretch pl-3 pr-4 py-3 bg-white rounded-lg border border-solid border-gray-300  justify-start items-start gap-2 inline-flex`}
                        >

                          <div className="ContainerInputText  grow shrink basis-0 h-[96px] justify-start items-start flex">
                            <textarea
                              className={`${(assignment.assignment_status === 'Submitted' ||
                                assignment.assignment_status ===
                                'Submitted late') &&
                                !assignment.assignment_answer
                                ? 'bg-slate-200 text-slate-500 '
                                : 'bg-white  text-slate-400'
                                }  placeholder-opacity-50 placeholder-slate-400  outline-none border-none Placeholder grow shrink basis-0  text-base font-normal leading-normal h-[100%]`}
                              placeholder="Answer..."
                              value={
                                answers.find(
                                  (a) =>
                                    a.assignment_id === assignment.assignment_id
                                )?.assignment_answer ||
                                assignment.assignment_answer ||
                                ''
                              }
                              onChange={(e) =>
                                handleAnswerChange(
                                  e,
                                  assignment.assignment_id,
                                  assignment.assignment_status
                                )
                              }
                              style={{ resize: 'none' }}
                              readOnly={
                                assignment.assignment_status === 'Submitted' ||
                                assignment.assignment_status ===
                                'Submitted late'
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="Frame427321003 flex-col  items-start gap-4 inline-flex justify-center">
                        {assignment.assignment_status !== 'Submitted late' &&
                          assignment.assignment_status !== 'Submitted' && (

                            <>
                              <div
                                className=" cursor-pointer Primary mb-[20px] self-stretch px-8 py-4 bg-blue-800 rounded-xl shadow justify-center items-center gap-2.5 inline-flex"
                                onClick={() =>
                                  handleSubmit(assignment.assignment_id, assignment.sublesson_id, assignment.course_id)
                                }
                              >

                                <div className="text-center text-white text-base font-bold leading-normal">
                                  Submit
                                </div>
                              </div>
                              <div className="cursor-pointer ButtonGhost px-2 py-1 rounded-2xl justify-center items-center gap-2 inline-flex">
                                <div className="Register text-blue-800 text-base font-bold leading-normal h-[32px]">
                                  Open in Course
                                </div>
                              </div>
                            </>
                          )}
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center mt-6 self-center">
                <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-lg">
                  <p className="text-xl font-semibold text-gray-600">
                    No assignments found
                  </p>
                  <p className="text-lg text-gray-500">
                    There are no assignments matching the {selectedFilter}
                  </p>
                </div>
              </div>
            )}
          </div>
          {filteredAssignments.length === 0 ? null : (
            <div className="pagination flex justify-center items-center space-x-4 mt-6 self-center">
              <button
                onClick={() => prevPage()}
                disabled={currentPage === 1}
                className={`border-none px-4 py-2 bg-blue-800 hover:bg-blue-600 text-white font-semibold rounded-full focus:outline-none flex items-center ${currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
                  }`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline-block mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Prev
              </button>
              <span className="text-gray-600 text-lg">
                Page {currentPage} / {totalPages === 0 ? "1" : totalPages}
              </span>
              <button
                onClick={() => nextPage()}
                disabled={filteredAssignments.length < 4}
                className={`border-none px-4 py-2 bg-blue-800 hover:bg-blue-600 text-white font-semibold rounded-full focus:outline-none flex items-center ${filteredAssignments.length < 4
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
                  }`}>
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline-block ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  )
}

export default AssignmentPage
