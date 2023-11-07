import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import CourseFlowIcon from '../assets/CourseFlowIcon.jsx'
function Sidebar(props) {
  const [isCoursePage, setIsCoursePage] = useState(props.isCoursePage)
  const [isAssignmentPage, setIsAssignmentPage] = useState(
    props.isAssignmentPage
  )
  const navigate = useNavigate()

  const handleCourse = () => {
    navigate('/admin/courselist')
  }
  const handleAssignment = () => {
    navigate('/admin/assingmentlist')
  }
  const { logoutAdmin } = useAuth()

  return (
    <div className="border-solid border-b-0 border-t-0 border-l-0 border-r-[1px] border-gray-300  h-full ">
      <div className="cursor-pointer flex flex-col justify-center items-center h-[131px] px-6 pt-10 pb-6">
        <CourseFlowIcon width="174" height="19" />
        <p className="Body2 text-[--gray700] pt-6">Admin Panel Control</p>
      </div>

      <div className="mt-[40px] text-[#424C6B]">
        <div className="flex flex-col h-[540px]">
          <div
            className={`flex items-center py-[16px] px-[24px] ${
              isCoursePage && 'bg-[#F1F2F6]'
            }  cursor-pointer text-[#424C6B] font-medium`}
            onClick={handleCourse}
          >
            <div className="pr-[16px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 6.04201C10.3516 4.56337 8.2144 3.74695 6 3.75001C4.948 3.75001 3.938 3.93001 3 4.26201V18.512C3.96362 18.172 4.97816 17.9989 6 18C8.305 18 10.408 18.867 12 20.292M12 6.04201C13.6483 4.56328 15.7856 3.74686 18 3.75001C19.052 3.75001 20.062 3.93001 21 4.26201V18.512C20.0364 18.172 19.0218 17.9989 18 18C15.7856 17.997 13.6484 18.8134 12 20.292M12 6.04201V20.292"
                  stroke="#8DADE0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p>Course</p>
          </div>
          <div
            className={`flex items-center py-[16px] px-[24px] ${
              isAssignmentPage && 'bg-[#F1F2F6]'
            }  cursor-pointer text-[#424C6B] font-medium`}
            onClick={handleAssignment}
          >
            <div className="pr-[16px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11.35 3.836C11.285 4.046 11.25 4.269 11.25 4.5C11.25 4.914 11.586 5.25 12 5.25H16.5C16.6989 5.25 16.8897 5.17098 17.0303 5.03033C17.171 4.88968 17.25 4.69891 17.25 4.5C17.2501 4.27491 17.2164 4.05109 17.15 3.836M11.35 3.836C11.492 3.3767 11.7774 2.97493 12.1643 2.68954C12.5511 2.40414 13.0192 2.25011 13.5 2.25H15C16.012 2.25 16.867 2.918 17.15 3.836M11.35 3.836C10.974 3.859 10.6 3.886 10.226 3.916C9.095 4.01 8.25 4.973 8.25 6.108V8.25M17.15 3.836C17.526 3.859 17.9 3.886 18.274 3.916C19.405 4.01 20.25 4.973 20.25 6.108V16.5C20.25 17.0967 20.0129 17.669 19.591 18.091C19.169 18.5129 18.5967 18.75 18 18.75H15.75M8.25 8.25H4.875C4.254 8.25 3.75 8.754 3.75 9.375V20.625C3.75 21.246 4.254 21.75 4.875 21.75H14.625C15.246 21.75 15.75 21.246 15.75 20.625V18.75M8.25 8.25H14.625C15.246 8.25 15.75 8.754 15.75 9.375V18.75M7.5 15.75L9 17.25L12 13.5"
                  stroke="#8DADE0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p>Assignment</p>
          </div>
        </div>
        <div
          className="flex items-center py-[16px] px-[24px]  mt-[40px] cursor-pointer text-[#424C6B] font-medium hover:bg-[#e4e4e6] active:bg-[#F1F2F6]"
          onClick={logoutAdmin}
        >
          <div className="pr-[16px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M13 15.9998V16.9998C13 17.7954 12.6839 18.5585 12.1213 19.1211C11.5587 19.6837 10.7956 19.9998 10 19.9998H6C5.20435 19.9998 4.44129 19.6837 3.87868 19.1211C3.31607 18.5585 3 17.7954 3 16.9998V6.99976C3 6.20411 3.31607 5.44104 3.87868 4.87844C4.44129 4.31583 5.20435 3.99976 6 3.99976H10C10.7956 3.99976 11.5587 4.31583 12.1213 4.87844C12.6839 5.44104 13 6.20411 13 6.99976V7.99976M17 15.9998L21 11.9998L17 15.9998ZM21 11.9998L17 7.99976L21 11.9998ZM21 11.9998H7H21Z"
                stroke="#8DADE0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p>Log out</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
