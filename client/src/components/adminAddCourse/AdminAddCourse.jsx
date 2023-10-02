import React, { useState, useEffect } from 'react'
import './adminAddCourse.css'
import Sidebar from '../Sidebar'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, useFormik } from 'formik'
import LessonTable from './LessonTable'
import AddLesson from '../addLessonComponent/AddLesson'
import axios from 'axios'
import UploadVideo from './UploadVideo'
import UploadImage from './UploadImage'
import SnackBar from '../SnackBar.jsx'
import { useAuth } from '../../contexts/AuthContext.jsx'
import CircularIndeterminate from '../../assets/loadingProgress'

function AdminAddCourse() {
  // const history = useHistory()
  const navigate = useNavigate()
  const [image_url, setImage_url] = useState('')
  const [video_url, setVideo_url] = useState('')
  const [submitData, setSubmitData] = useState(false)
  const [lessonData, setLessonData] = useState('')
  const [subLessonData, setSubLessonData] = useState('')
  const [localImg, setLocalImg] = useState('')
  const [localVdo, setLocalVdo] = useState('')
  const {
    lesson,
    setLesson,
    getImgUrl,
    setGetImgUrl,
    getVdoUrl,
    setGetVdoUrl,
    setAdminImageUrl,
    setAdminVideoUrl,
  } = useAuth()

  const [loadingMes, setLoadingMes] = useState('Loading...')
  const [isLoading, setIsLoading] = useState(true)

  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }))
  }
  const validate = (values) => {
    const errors = {}
    if (!values.courseName) {
      errors.courseName = 'Required!'
    } else if (values.courseName.length > 15) {
      errors.courseName = 'Please provide less than 15 characters.'
    }
    if (!values.price) {
      errors.price = 'Required!'
    }
    if (!values.totalLearningTime) {
      errors.totalLearningTime = 'Required!'
    }
    if (!values.courseSummary) {
      errors.courseSummary = '* Required'
    } else if (values.courseSummary.length < 15) {
      errors.courseSummary = 'Please provide more than 15 characters.'
    }
    if (!values.courseDetail) {
      errors.courseDetail = '* Required'
    } else if (values.courseDetail.length < 15) {
      errors.courseDetail = 'Please provide more than 15 characters.'
    }
    return errors
  }
  const formik = useFormik({
    initialValues: {
      courseName: '',
      price: '',
      totalLearningTime: '',
      courseSummary: '',
      courseDetail: '',
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  console.log(lesson)
  const courseData = {
    course_name: formik.values.courseName,
    price: formik.values.price,
    total_time: formik.values.totalLearningTime,
    course_summary: formik.values.courseSummary,
    course_detail: formik.values.courseDetail,
    cover_img: image_url,
    video_trailer: video_url,
  }

  // const lessonData = {
  //   // lesson_name,
  // }
  // const subLessonData = {
  //   // sublesson_name,
  //   // sublesson_video,
  // }

  useEffect(() => {
    const lessonDataStorage = localStorage.getItem('lesson_data')
    try {
      if (lessonDataStorage) {
        const parsedData = JSON.parse(lessonDataStorage)
        const lessonName = parsedData.lessonName
        const transformedData = parsedData.map((lesson, index) => ({
          lessonName: lesson.lessonName,
          subLessonData: lesson.subLessonList,
        }))
        const subLessonData = { ...parsedData }

        setLessonData(transformedData)
      }
    } catch (error) {
      console.error('Error:', error)
    }

    if (localImg && localVdo) {
      const storedImageUrl = localImg
      const storedVideoUrl = localVdo
      if (storedImageUrl !== image_url) {
        setImage_url(storedImageUrl)
      }
      if (storedVideoUrl !== video_url) {
        setVideo_url(storedVideoUrl)
      }
    }
    setIsLoading(false)
    const storedData = localStorage.getItem('course_data')
    const fetchData = async () => {
      try {
        if (storedData) {
          const parsedData = JSON.parse(storedData)
          const courseDataFromLocal = {
            courseName: parsedData.course_name,
            price: parsedData.price,
            totalLearningTime: parsedData.total_time,
            courseSummary: parsedData.course_summary,
            courseDetail: parsedData.course_detail,
            cover_img: parsedData.image_url,
            video_trailer: parsedData.video_url,
          }
          formik.setValues(courseDataFromLocal)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    // console.log(lessonData)
    // const intervalId = setInterval(() => {
    //   const storedImageUrl = localStorage.getItem("image_url");
    //   const storedVideoUrl = localStorage.getItem("video_url");
    //   if (storedImageUrl !== image_url) {
    //     setImage_url(storedImageUrl);
    //     // console.log("Updated Image URL:", storedImageUrl);
    //   }
    //   if (storedVideoUrl !== video_url) {
    //     setVideo_url(storedVideoUrl);
    //     // console.log("Updated VDO URL:", storedVideoUrl);
    //   }
    // }, 2000);

    // // Clear the interval when the component unmounts
    // return () => clearInterval(intervalId);
    fetchData()
  }, [lesson])

  const sendData = async (e) => {
    e.preventDefault()

    if (
      !formik.values.courseName ||
      !formik.values.price ||
      !formik.values.totalLearningTime ||
      !formik.values.courseSummary ||
      !formik.values.courseDetail
    ) {
      displaySnackbar('Please fill out all fields.', 'warning')
      return
    }

    if (
      !localStorage.getItem('video_url') &&
      !localStorage.getItem('image_url')
    ) {
      displaySnackbar(
        'Please upload a cover image and a video trailer.',
        'warning'
      )
      return
    }

    if (!localStorage.getItem('image_url')) {
      displaySnackbar('Please upload a cover image.', 'warning')
      return
    }
    if (!localStorage.getItem('video_url')) {
      displaySnackbar('Please upload a video trailer.', 'warning')
      return
    }
    if (JSON.parse(localStorage.getItem('lesson_data'))?.length < 1) {
      displaySnackbar(
        'Please add at least one lesson to your course.',
        'warning'
      )
      return
    }

    setLoadingMes('Course Upload in Progress...')
    setIsLoading(true)
    const updatedCourseData = {
      ...courseData,
      cover_img: getImgUrl,
      video_trailer: getVdoUrl,
      ...lesson,
    }

    const formData = new FormData()
    for (let key in updatedCourseData) {
      if (
        key !== 'cover_img' &&
        key !== 'video_trailer' &&
        typeof updatedCourseData[key] === 'object'
      ) {
        formData.append(key, JSON.stringify(updatedCourseData[key]))
        for (let value of updatedCourseData[key].subLessonVideo) {
          formData.append('subLessonVideo', value)
        }
      } else {
        formData.append(key, updatedCourseData[key])
      }
    }
    try {
      const result = await axios.post(
        `http://localhost:4000/admin/addcourse`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      localStorage.removeItem('video_url')
      localStorage.removeItem('image_url')
      localStorage.removeItem('course_data')
      localStorage.removeItem('lesson_data')

      formik.resetForm()
      setSubmitData(true)
      setIsLoading(false)
      // displaySnackbar("You've Successfully Added a New Course. 🎉")
      setAdminImageUrl(null)
      setAdminVideoUrl(null)
      // TODO need to reset lessons State After Send Data To Server
      setLesson([])
      // TODO
      navigate('/admin/courselist')
    } catch (error) {
      console.error(error)
    }
  }

  const handleData = () => {
    localStorage.setItem(`course_data`, JSON.stringify(courseData))
    navigate(`/admin/addcourse/addlesson`)
  }

  function displaySnackbar(message, status) {
    setOpenSnackBar(false)
    setSnackbarMes(message)
    setSnackbarStatus(status)
    setOpenSnackBar(true)
  }
  const [openSnackbar, setOpenSnackBar] = useState(false)
  const [snackBarMes, setSnackbarMes] = useState('')
  const [snackbarStatus, setSnackbarStatus] = useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackBar(false)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-[100%] min-h-[100vh] gap-8 text-black">
        <h1>{loadingMes}</h1>
        <CircularIndeterminate />
      </div>
    )
  }

  return (
    <>
      <SnackBar
        open={openSnackbar}
        onClose={handleClose}
        severity={snackbarStatus}
        message={snackBarMes}
      />

      <div className="flex justify-center items-center">
        <div className="canvas flex flex-row w-[1440px]">
          {/* LEFT-NAV */}

          {/* RIGHT-NAV */}
          <div className="w-full">
            <div className="topNav  flex  items-center gap-[16px] px-[40px] py-[16px] w-100% bg  ">
              <div className="H3 flex-1">Add Course</div>
              <button
                className="Secondary Shadow1"
                onClick={() => {
                  navigate(-1)
                }}
              >
                Cancel
              </button>
              <button
                className="Primary Shadow1 border-none"
                onClick={sendData}
              >
                Create
              </button>
            </div>
            {/* MIDDLE-AREA */}
            <div className="p-[40px] bg-[--gray100] ">
              {/* PACKAGE WRAPPER  */}
              <div className="packageWrapper px-[100px] pt-[40px] pb-[60px] w-full h-full mb-[24px] ">
                <Formik>
                  <Form
                    className="flex flex-col  gap-[40px]"
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="flex flex-col gap-[4px] border-2 border-sky-500  h-[100px]">
                      <label htmlFor="courseName" className="">
                        Course name *
                      </label>
                      <input
                        type="text"
                        name="courseName"
                        // id="courseName"
                        placeholder="Enter Course Name"
                        className={`Body2 p-[12px] w-[100%] h-[48px] rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${
                          formik.touched.courseName && formik.errors.courseName
                            ? ' border-[#9B2FAC]'
                            : ' border-[--gray500]'
                        }`}
                        value={formik.values.courseName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.courseName && formik.touched.courseName ? (
                        <div className="text-[#9B2FAC] self-end pt-2">
                          {formik.errors.courseName}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex gap-[80px] ">
                      <div className="flex flex-col flex-1 gap-[4px]  h-[100px] ">
                        <label htmlFor="Price" className="">
                          Price *
                        </label>
                        <input
                          type="number"
                          name="price"
                          // id="price"
                          placeholder="Enter Course Price"
                          className={`Body2 p-[12px] w-[100%] h-[48px] rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${
                            formik.touched.price && formik.errors.price
                              ? ' border-[#9B2FAC]'
                              : ' border-[--gray500]'
                          }`}
                          value={formik.values.price}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.price && formik.touched.price ? (
                          <div className="text-[#9B2FAC] self-end pt-2">
                            {formik.errors.price}
                          </div>
                        ) : null}
                      </div>
                      <div className="flex flex-col flex-1 gap-[4px] h-[100px]">
                        <label className="">Total learning time *</label>
                        <input
                          type="number"
                          name="totalLearningTime"
                          // id="totalLearningTime"
                          placeholder="Enter Total learning time"
                          className={`Body2 p-[12px] w-[100%] h-[48px] rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${
                            formik.touched.totalLearningTime &&
                            formik.errors.totalLearningTime
                              ? ' border-[#9B2FAC]'
                              : ' border-[--gray500]'
                          }`}
                          value={formik.values.totalLearningTime}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />{' '}
                        {formik.errors.totalLearningTime &&
                        formik.touched.totalLearningTime ? (
                          <div className="text-[#9B2FAC] self-end pt-2">
                            {formik.errors.totalLearningTime}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col gap-[4px] h-[150px]">
                      <label className="">Course summary *</label>
                      <Field
                        as="textarea"
                        // type="text"
                        name="courseSummary"
                        // id="courseSummary"
                        placeholder="Enter Course summary"
                        className={`Body2 p-[12px] w-[100%] h-[100px] resize-none rounded-lg border-solid border-[2px] focus:border-[--orange500] focus:outline-none ${
                          formik.touched.courseSummary &&
                          formik.errors.courseSummary
                            ? ' border-[#9B2FAC]'
                            : ' border-[--gray500]'
                        }`}
                        value={formik.values.courseSummary}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.courseSummary &&
                      formik.touched.courseSummary ? (
                        <div className="text-[#9B2FAC] self-end pt-2">
                          {formik.errors.courseSummary}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-[4px] h-[270px]">
                      <label className="">Course detail *</label>
                      <Field
                        as="textarea"
                        // type="text"
                        name="courseDetail"
                        // id="courseDetail"
                        placeholder="Enter Course detail"
                        className={`flex text- align-text-top Body2 p-[12px] w-[100%] h-[220px] resize-none rounded-lg border-solid border-[2px] focus:border-[--orange500] focus:outline-none ${
                          formik.touched.courseSummary &&
                          formik.errors.courseSummary
                            ? ' border-[#9B2FAC]'
                            : ' border-[--gray500]'
                        }`}
                        value={formik.values.courseDetail}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.courseDetail &&
                      formik.touched.courseDetail ? (
                        <div className="text-[#9B2FAC] self-end pt-2">
                          {formik.errors.courseDetail}
                        </div>
                      ) : null}
                    </div>

                    {/*----------------------- UPLOAD IMG --------------------- */}
                    <UploadImage
                      submitData={submitData}
                      getUrl={setLocalImg}
                      setGetImgUrl={setGetImgUrl}
                    />
                    {/*----------------------- UPLOAD VIDEO --------------------- */}
                    <UploadVideo
                      submitData={submitData}
                      getUrl={setLocalVdo}
                      setGetVdoUrl={setGetVdoUrl}
                    />
                  </Form>
                </Formik>
              </div>
              {/* add;-lesson */}
              <div className="add-lesson flex flex-row gap-[16px] items-center mb-[43px]">
                <div className="H3 flex-1">Lesson</div>
                <button
                  className="Primary Shadow1 px-[32px] py-[18px] justify-center border-none"
                  onClick={() => {
                    handleData()
                  }}
                >
                  + Add Lesson
                </button>
              </div>
              {/* table-SubLesson */}
              <div className="table-SubLesson">
                <LessonTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminAddCourse
