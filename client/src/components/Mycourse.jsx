import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import CourseCard from './myCourseComponent/CourseCard'
import { useState, useEffect } from 'react'
import { Link, json } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext.jsx'
import Ellipse5 from '../assets/myCourseAssets/Ellipse5'
import Polygon3 from '../assets/myCourseAssets/Polygon3'
import Cross5 from '../assets/myCourseAssets/Cross5'
import { Button } from '@mui/base/Button'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import '../components/myCourseComponent/CourseCard.css'
import CircularIndeterminate from '../assets/loadingProgress'
import { useNavigate } from 'react-router-dom'

function MyCourse() {
  const [dataCourse, setDataCourse] = useState([])
  const navigate = useNavigate()
  // const [dataCourse, setDataCourse] = localStorage.getItem("dataCourse");
  const [courseID, setCourseID] = useState(null)
  const [allCourse, setAllCourse] = useState(true)
  const [inprogress, setInprogress] = useState(false)
  const [complete, setComplete] = useState(false)
  const userName = localStorage.getItem('username')
  const avatar = localStorage.getItem('userimage')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const [inProgressCount, setInProgressCount] = useState(0)
  const [completeCount, setCompleteCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const inProgressCourses = dataCourse.filter((item) => !item.course_status)
  const completeCourses = dataCourse.filter((item) => item.course_status)
  const currentData = dataCourse.slice(indexOfFirstItem, indexOfLastItem)
  const totalPagesAllCourse = Math.ceil(dataCourse.length / itemsPerPage)
  const totalPagesInprogress = Math.ceil(
    inProgressCourses.length / itemsPerPage
  )
  const totalPagesComplete = Math.ceil(completeCourses.length / itemsPerPage)
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage)
  }

  const [checkOnClick, setCheckOnClick] = useState(false)
  const {
    setIsShowVdo,
    setIsShowAsm,
    setVideoHead,
    setVideoKey,
    setPauseTime,
    setvideoUrl,
    userIdFromCookie,
  } = useAuth()

  const userId = userIdFromCookie
  useEffect(() => {
    // try {
    //   fetch(`http://localhost:4000/mycourse/${userIdFromCookie}`)
    //     .then((response) => response.json())
    //     .then((json) => {
    //       console.log(json.data);
    //       try {
    //         setDataCourse(json.data);
    //       } catch (error) {}
    //     });
    // } catch (error) {}
    localStorage.removeItem('sublessonName')
    localStorage.removeItem('sublessonID')
    localStorage.removeItem('isShowVdo')
    localStorage.removeItem('isShowAsm')
    localStorage.removeItem('pauseTime')
    localStorage.removeItem('videoUrl')
    localStorage.removeItem('pauseTime')
    localStorage.removeItem('nonepause')
    localStorage.removeItem('videoKey')
    localStorage.removeItem('videoHead')
    getDataCourse(), setCurrentPage(1)
  }, [userId, allCourse, inprogress, complete])

  const getDataCourse = async () => {
    try {
      setIsLoading(true)
      const result = await axios.get(
        `http://localhost:4000/mycourse/${userIdFromCookie}`
      )

      const newDataCourse = result.data.data

      if (newDataCourse.length > 0) {
        setDataCourse(newDataCourse)
      }
      true
      const counts = newDataCourse.reduce(
        (accumulator, course) => {
          if (course.course_status === false || course.course_status === null) {
            accumulator.inProgressCount++
          } else if (course.course_status === true) {
            accumulator.completeCount++
          }
          return accumulator
        },
        { inProgressCount: 0, completeCount: 0 }
      )
      setInProgressCount(counts.inProgressCount)
      setCompleteCount(counts.completeCount)
      // } else {
      //   setUserName("No User Data Available");
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  function handleCourseFilter(filter) {
    if (filter === 'all') {
      setAllCourse(true)
      setInprogress(false)
      setComplete(false)
    } else if (filter === 'inProgress') {
      setAllCourse(false)
      setInprogress(true)
      setComplete(false)
    } else if (filter === 'complete') {
      setAllCourse(false)
      setInprogress(false)
      setComplete(true)
    }
  }

  const getDataCourse2 = async () => {
    try {
      localStorage.removeItem('sublessonName')
      localStorage.removeItem('sublessonID')
      localStorage.removeItem('isShowVdo')
      localStorage.removeItem('isShowAsm')
      localStorage.removeItem('pauseTime')
      localStorage.removeItem('videoUrl')
      localStorage.removeItem('pauseTime')
      localStorage.removeItem('nonepause')
      localStorage.removeItem('videoKey')

      const result = await axios.get('http://localhost:4000/learn/videotime', {
        params: {
          userID: userId,
          courseID: localStorage.getItem('course_id'),
        },
      })

      const data = result.data.data

      if (data !== undefined) {
        const handleShowVideo = (sublessonName, sublessonID) => {
          setVideoHead(sublessonName)
          localStorage.setItem('sublessonName', sublessonName)
          setVideoKey(sublessonID)
          localStorage.setItem('sublessonID', sublessonID)
          localStorage.setItem('videoKey', sublessonID)
          setIsShowVdo(true)
          localStorage.setItem('isShowVdo', true)
          setIsShowAsm(false)
          localStorage.setItem('isShowAsm', false)
          setPauseTime(data.sublesson_video_timestop)
          localStorage.setItem('pauseTime', data.sublesson_video_timestop)
          setvideoUrl(data.sublesson_video)
          localStorage.setItem('videoUrl', data.sublesson_video)
          localStorage.setItem('nonepause', false)
          console.log(data.sublesson_video_timestop)
        }
        handleShowVideo(data.sublesson_name, data.sublesson_id)
      } else {
        setIsShowVdo(true)
        localStorage.setItem('isShowVdo', true)
        setIsShowAsm(false)
        localStorage.setItem('isShowAsm', false)
        setPauseTime(0)
        localStorage.setItem('pauseTime', 0)
        localStorage.setItem('nonepause', true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const CourseList = ({ dataCourse, status }) => {
    const [coursesPerPage] = useState(4)
    const indexOfLastItem = currentPage * coursesPerPage
    const indexOfFirstItem = indexOfLastItem - coursesPerPage

    const filteredCourses = dataCourse.filter((item) => {
      if (status === 'all') {
        return true
      } else if (status === 'inProgress') {
        return !item.course_status
      } else if (status === 'complete') {
        return item.course_status
      }
      return false
    })

    const currentCourses = filteredCourses.slice(
      indexOfFirstItem,
      indexOfLastItem
    )

    const handleClick = (courseId) => {
      setCheckOnClick((q) => !q)
      setCourseID(courseId)
      localStorage.removeItem('course_id')
      localStorage.setItem('course_id', courseId)
      getDataCourse2()
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    const courseCards = currentCourses.map((item) => (
      <Link
        className="no-underline"
        key={item.courses.course_id}
        to={`/learning/${item.courses.course_id}`}
        onClick={() => handleClick(item.courses.course_id)}
      >
        <CourseCard
          key={item.courses.course_id}
          courseid={item.courses.course_id}
          coverimg={item.courses.cover_img}
          coursename={item.courses.course_name}
          coursedetail={item.courses.course_detail}
          coursesummary={item.courses.lessons.length}
          totallearningtime={item.courses.total_time}
        />
      </Link>
    ))
    return (
      <div className="grid grid-cols-2 gap-x-[26px] gap-y-[40px] w-[740px]">
        {courseCards}
      </div>
    )
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center gap-8 w-[100%] h-[1607px] text-black ">
        <h1>Loading...</h1>
        <CircularIndeterminate />
      </div>
    )
  }

  return (
    <div className="w-[100%] flex flex-col justify-center items-center pt-[100px] mb-[200px] relative">
      <div className=" absolute right-0 top-[216px]">
        <Ellipse5 className="top-1/2 absolute" style={{ top: '50%' }} />
      </div>
      <div className=" absolute right-[126.22px] top-[126px]">
        <Polygon3 />
      </div>
      <div className=" absolute left-[280px] top-[232px]">
        <Cross5 />
      </div>
      <div className=" absolute left-[43px] top-[159px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
        >
          <circle cx="13.1741" cy="13.1741" r="13.1741" fill="#C6DCFF" />
        </svg>
      </div>
      <div className=" absolute left-[102px] top-[100px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
        >
          <circle cx="5.5" cy="5.5" r="4" stroke="#2F5FAC" strokeWidth="3" />
        </svg>
      </div>
      <div className="flex flex-col items-center justify-center ">
        <h2 className="H2">My Course</h2>
        <div className="justify-start items-start gap-4 inline-flex mt-[60px]">
          <div
            Component1
            p-2
            flex
            items-start
            gap-2
            hover:border-b-2
            border-solid
            border-black
            border-t-0
            border-r-0
            border-l-0
            border-b-0
            onClick={() => handleCourseFilter('all')}
            className={`box-content cursor-pointer Component1 p-2 flex items-start gap-2 hover:border-b-2 border-solid border-black border-t-0 border-r-0 border-l-0 border-b-0 focus:border-b-2 focus:border-solid focus:border-black ${
              allCourse ? 'border-b-2' : ''
            }`}
          >
            <div className="Body2">All Course</div>
          </div>
          <div
            onClick={() => handleCourseFilter('inProgress')}
            className={`box-content cursor-pointer Component1 p-2 flex items-start gap-2 hover:border-b-2 border-solid border-black border-t-0 border-r-0 border-l-0 border-b-0 focus:border-b-2 focus:border-solid focus:border-black ${
              inprogress ? 'border-b-2' : ''
            }`}
          >
            <div className="Body2">Inprogress</div>
          </div>
          <div
            onClick={() => handleCourseFilter('complete')}
            className={`box-content cursor-pointer Component1 p-2 flex items-start gap-2 hover:border-b-2 border-solid border-black border-t-0 border-r-0 border-l-0 border-b-0 focus:border-b-2 focus:border-solid focus:border-black ${
              complete ? 'border-b-2' : ''
            }`}
          >
            <div className="Body2">Complete</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-[80px] h-[1080px]">
        <div className="flex flex-col w-[357px] h-[500px] Shadow2 px-[24px] py-[32px] content-center items-center mr-[24px] rounded-lg  sticky top-0 ">
          <div className="flex flex-col justify-center items-center">
            <Avatar alt="" src={avatar} sx={{ width: 120, height: 120 }} />
            <h2 className="my-[24px]">{userName}</h2>
          </div>
          <div className="flex flex-row ">
            <div className="flex flex-col justify-between p-[16px] w-[142.5px] h-[134px] bg-[--gray200] mx-[12px]">
              <p className="Body2">Course Inprogress</p>
              <p className="H3">{inProgressCount}</p>
            </div>
            <div className="flex flex-col justify-between p-[16px] w-[142.5px] h-[134px] bg-[--gray200] mx-[12px]">
              <p className="Body2">Course Complete</p>
              <p className="H3">{completeCount}</p>
            </div>
          </div>
          <div className="mt-16">
            {allCourse && totalPagesAllCourse > 1 && (
              <Pagination
                count={totalPagesAllCourse}
                onChange={(event, newPage) =>
                  handlePageChange(event, newPage, 'all')
                }
                page={currentPage}
                size="large"
              />
            )}
            {inprogress && totalPagesInprogress > 1 && (
              <Pagination
                count={totalPagesInprogress}
                onChange={(event, newPage) =>
                  handlePageChange(event, newPage, 'inProgress')
                }
                page={currentPage}
                size="large"
              />
            )}
            {complete && totalPagesComplete > 1 && (
              <Pagination
                count={totalPagesComplete}
                onChange={(event, newPage) =>
                  handlePageChange(event, newPage, 'complete')
                }
                page={currentPage}
                size="large"
              />
            )}
          </div>
        </div>

        {allCourse && <CourseList dataCourse={dataCourse} status="all" />}
        {inprogress && (
          <CourseList dataCourse={dataCourse} status="inProgress" />
        )}
        {complete && <CourseList dataCourse={dataCourse} status="complete" />}
      </div>
    </div>
  )
}

export default MyCourse
