import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

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
    <div className="border-solid border-b-0 border-t-0 border-l-0 border-r-[1px] border-gray-300 w-[240px] h-[2000px]">
      <div className="flex flex-col justify-center items-center h-[131px]">
        <div className="w-[174px] h-[19px] mt-[40px] cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="174"
            height="19"
            viewBox="0 0 174 19"
            fill="none"
          >
            <path
              d="M10.2927 19C16.3016 19 20.1255 16.1362 20.1255 11.4551V11.042H15.3241V11.4551C15.3241 13.8783 13.8866 15.0348 10.379 15.0348C6.15264 15.0348 4.57135 13.6029 4.57135 9.5C4.57135 5.3971 6.15264 3.96522 10.379 3.96522C13.8866 3.96522 15.3241 5.12174 15.3241 7.54493V7.95797H20.1255V7.54493C20.1255 2.86377 16.2729 0 10.2927 0C3.93884 0 0 3.74493 0 9.5C0 15.2551 3.93884 19 10.2927 19Z"
              fill="url(#paint0_linear_62_9304)"
            />
            <path
              d="M29.6707 19C34.587 19 37.8933 16.1913 37.8933 11.8406C37.8933 7.43478 34.587 4.65362 29.6707 4.65362C24.7543 4.65362 21.448 7.43478 21.448 11.8406C21.448 16.1913 24.7543 19 29.6707 19ZM29.6707 15.3377C26.7381 15.3377 25.7318 14.2638 25.7318 11.8406C25.7318 9.41739 26.7381 8.28841 29.6707 8.28841C32.5745 8.28841 33.6095 9.41739 33.6095 11.8406C33.6095 14.2638 32.5745 15.3377 29.6707 15.3377Z"
              fill="url(#paint1_linear_62_9304)"
            />
            <path
              d="M45.6059 19C49.401 19 51.1548 16.8246 51.5286 14.5116H51.7586V18.7246H55.7837V4.92898H51.4711V11.9232C51.4711 14.2638 50.4648 15.3101 47.6472 15.3101C44.9159 15.3101 43.9384 14.3739 43.9384 12.1435V4.92898H39.6258V13.5203C39.6258 16.6043 41.5521 19 45.6059 19Z"
              fill="url(#paint2_linear_62_9304)"
            />
            <path
              d="M62.3013 18.7246V10.7391C62.3013 9.00435 62.9913 8.15072 64.9176 8.15072C66.6714 8.15072 67.3039 8.81159 67.3039 10.3261V11.758H71.6165V9.47246C71.6165 6.77391 70.294 4.65362 67.0739 4.65362C64.1701 4.65362 62.6463 6.36087 62.2438 8.5913H61.985V4.92898H57.9887V18.7246H62.3013Z"
              fill="url(#paint3_linear_62_9304)"
            />
            <path
              d="M80.4521 19C84.9085 19 87.5823 17.2928 87.5823 14.7043C87.5823 12.4188 86.1448 11.1797 82.2922 10.7667L79.2159 10.4087C77.3183 10.1884 76.9158 9.88551 76.9158 9.16957C76.9158 8.28841 77.4621 7.93043 79.6184 7.93043C82.2634 7.93043 82.8385 8.5087 82.8385 9.63768V9.8029H87.1511V9.72029C87.1511 6.36087 84.4772 4.65362 79.7621 4.65362C74.817 4.65362 72.6607 6.58116 72.6607 9.00435C72.6607 11.3174 74.2708 12.5565 77.1458 12.8594L81.1997 13.3275C82.896 13.5478 83.3272 13.7681 83.3272 14.5391C83.3272 15.3652 82.781 15.7232 80.4809 15.7232C78.0371 15.7232 77.2321 15.3928 77.2321 14.1536V13.9058H72.9195V13.9884C72.9195 17.1826 75.5933 19 80.4521 19Z"
              fill="url(#paint4_linear_62_9304)"
            />
            <path
              d="M96.9701 19C101.541 19 104.589 16.9072 104.589 13.9058V13.6029H100.276V13.8783C100.276 15.0623 99.3851 15.6957 96.8263 15.6957C94.0375 15.6957 93.0025 14.787 92.8875 12.6667H104.618C104.675 12.1986 104.733 11.8406 104.733 11.3449C104.733 7.02174 101.599 4.65362 96.8838 4.65362C92.14 4.65362 88.8911 7.43478 88.8911 11.8406C88.8911 16.742 92.1687 19 96.9701 19ZM96.7976 7.87536C99.3276 7.87536 100.478 8.67391 100.593 10.4913H92.945C93.1462 8.70145 94.2388 7.87536 96.7976 7.87536Z"
              fill="url(#paint5_linear_62_9304)"
            />
            <path
              d="M110.874 18.7246V11.8406H122.432V8.15072H110.874V3.99275H122.863V0.275362H106.562V18.7246H110.874Z"
              fill="url(#paint6_linear_62_9304)"
            />
            <path
              d="M129.012 18.7246V0.275362H124.699V18.7246H129.012Z"
              fill="url(#paint7_linear_62_9304)"
            />
            <path
              d="M138.946 19C143.862 19 147.168 16.1913 147.168 11.8406C147.168 7.43478 143.862 4.65362 138.946 4.65362C134.029 4.65362 130.723 7.43478 130.723 11.8406C130.723 16.1913 134.029 19 138.946 19ZM138.946 15.3377C136.013 15.3377 135.007 14.2638 135.007 11.8406C135.007 9.41739 136.013 8.28841 138.946 8.28841C141.849 8.28841 142.884 9.41739 142.884 11.8406C142.884 14.2638 141.849 15.3377 138.946 15.3377Z"
              fill="url(#paint8_linear_62_9304)"
            />
            <path
              d="M157.095 18.7246L159.596 12.0884L160.688 8.28841H161.005L162.068 12.0884L164.541 18.7246H169.917L174 4.92898H169.601L167.934 11.2348L167.301 15.5304H167.014L165.864 10.8217L163.707 4.92898H158.158L155.973 10.8217L154.823 15.5304H154.536L153.932 11.2348L152.236 4.92898H147.779L151.718 18.7246H157.095Z"
              fill="url(#paint9_linear_62_9304)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_62_9304"
                x1="3.6297"
                y1="12.0878"
                x2="19.3395"
                y2="63.1526"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#95BEFF" />
                <stop offset="1" stopColor="#0040E6" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_62_9304"
                x1="3.6297"
                y1="12.0878"
                x2="19.3395"
                y2="63.1526"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#95BEFF" />
                <stop offset="1" stopColor="#0040E6" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_62_9304"
                x1="3.6297"
                y1="12.0878"
                x2="19.3395"
                y2="63.1526"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#95BEFF" />
                <stop offset="1" stopColor="#0040E6" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_62_9304"
                x1="3.6297"
                y1="12.0878"
                x2="19.3395"
                y2="63.1526"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#95BEFF" />
                <stop offset="1" stopColor="#0040E6" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_62_9304"
                x1="3.6297"
                y1="12.0878"
                x2="19.3395"
                y2="63.1526"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#95BEFF" />
                <stop offset="1" stopColor="#0040E6" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_62_9304"
                x1="3.6297"
                y1="12.0878"
                x2="19.3395"
                y2="63.1526"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#95BEFF" />
                <stop offset="1" stopColor="#0040E6" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_62_9304"
                x1="3.6297"
                y1="12.0878"
                x2="19.3395"
                y2="63.1526"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#95BEFF" />
                <stop offset="1" stopColor="#0040E6" />
              </linearGradient>
              <linearGradient
                id="paint7_linear_62_9304"
                x1="3.6297"
                y1="12.0878"
                x2="19.3395"
                y2="63.1526"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#95BEFF" />
                <stop offset="1" stopColor="#0040E6" />
              </linearGradient>
              <linearGradient
                id="paint8_linear_62_9304"
                x1="3.6297"
                y1="12.0878"
                x2="19.3395"
                y2="63.1526"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#95BEFF" />
                <stop offset="1" stopColor="#0040E6" />
              </linearGradient>
              <linearGradient
                id="paint9_linear_62_9304"
                x1="3.6297"
                y1="12.0878"
                x2="19.3395"
                y2="63.1526"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#95BEFF" />
                <stop offset="1" stopColor="#0040E6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="Body2 text-[#646D89] m-[24px]">Admin Panel Control</div>
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
            <div>Course</div>
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
            <div>Assignment</div>
          </div>
        </div>
        <div className="flex items-center py-[16px] px-[24px]  mt-[40px] cursor-pointer text-[#424C6B] font-medium hover:bg-[#e4e4e6] active:bg-[#F1F2F6]">
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
          <button onClick={logoutAdmin}>Log out</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
