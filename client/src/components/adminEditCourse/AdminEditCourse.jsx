import React, { useState, useEffect } from 'react'
import './adminEditCourse.css'
import Sidebar from '../Sidebar'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, useFormik } from 'formik'
import LessonTable from './LessonTable'
import AddLesson from '../addLessonComponent/AddLesson'
import axios from 'axios'
import * as Yup from 'yup'
import UploadVideo from './UploadVideo'
import UploadImage from './UploadImage'
import SnackBar from '../SnackBar.jsx'
import { useParams } from 'react-router-dom'

function AdminEditCourse() {
  // const history = useHistory()
  const navigate = useNavigate()
  const [image_url, setImage_url] = useState('')
  const [video_url, setVideo_url] = useState('')
  const [submitData, setSubmitData] = useState(false)
  const [lessonData, setLessonData] = useState('')
  const [subLessonData, setSubLessonData] = useState('')
  const [localImg, setLocalImg] = useState('')
  const [localVdo, setLocalVdo] = useState('')
  const [courseData, setCourseData] = useState([])
  const { courseId } = useParams()

  const initialValues = {
    courseName: '',
    price: '',
    totalLearningTime: '',
    courseSummary: '',
    courseDetail: '',
  }
  console.log(courseData)
  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }))
  }
  const validate = (values) => {
    const errors = {}
    if (!values.courseName) {
      errors.courseName = 'Required'
    } else if (values.courseName.length > 15) {
      errors.courseName = 'Must be 15 characters or less'
    }
    if (!values.price) {
      errors.price = 'Required'
    }
    if (!values.totalLearningTime) {
      errors.totalLearningTime = 'Required'
    }
    if (!values.courseSummary) {
      errors.courseSummary = 'Required'
    } else if (values.courseSummary.length > 15) {
      errors.courseSummary = 'Must be more than 15 characters'
    }
    if (!values.courseDetail) {
      errors.courseDetail = 'Required'
    } else if (values.courseDetail.length > 15) {
      errors.courseDetail = 'Must be more than 15 characters'
    }
    return errors
  }
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      console.log('onSubmit', values)
      alert(JSON.stringify(values, null, 2))
    },
  })

  const onSubmit = async () => {
    const newCourseData = {
      course_name: formik.values.courseName,
      price: formik.values.price,
      total_time: formik.values.totalLearningTime,
      course_summary: formik.values.courseSummary,
      course_detail: formik.values.courseDetail,
      // course_name: 1,
      // price: 2,
      // total_time: 3,
      // course_summary: 4,
      // course_detail: 5,
    }
    console.log(newCourseData)
    await axios.put(
      `http://localhost:4000/ourcourse/${courseId}`,
      newCourseData
    )

    // try {
    //   const response = await axios.get(
    //     `http://localhost:4000/profile/${userId}`
    //   )
    //   setUsername(response.data.data)
    //   localStorage.removeItem('username')
    //   localStorage.removeItem('userimage')
    //   localStorage.setItem('username', response.data.data.full_name)
    //   localStorage.setItem('userimage', response.data.data.image_url)
    // } catch (error) {
    //   alert(error.message)
    // }
    // const useid = userId
    // setUserID(params.id ? params.id : useid)

    // navigate('/ourcourse')
  }

  const [getImgUrl, setGetImgUrl] = useState('')
  const [getVdoUrl, setGetVdoUrl] = useState('')

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

  useEffect(() => {
    const courseFetching = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4000/ourcourse/${courseId}`
        )
        console.log(result)

        const initialValues = {
          courseName: result.data.data.course_name,
          price: result.data.data.price,
          totalLearningTime: result.data.data.total_time,
          courseSummary: result.data.data.course_summary,
          courseDetail: result.data.data.course_detail,
        }
        formik.setValues(initialValues)
        setCourseData(result.data.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    courseFetching()
  }, [])

  const onSubmitForm = (e) => {
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
    displaySnackbar('Your Course has been updated.', 'success')
    formik.handleSubmit(e)
  }

  const sendData = async (course) => {
    const updatedCourseData = {
      ...courseData,
      cover_img: image_url,
      video_trailer: video_url,
    }
    // console.log(updatedCourseData)

    const testData = [
      {
        ...courseData,
        ...lessonData,
      },
    ]

    console.log(testData)
    const fromDatabase = 'your_course_id_value' // Replace with the actual value from the database
    const updateLessonDataArray = lessonData.map((lesson, index) => ({
      course_id: fromDatabase,
      lesson_name: lesson.lessonName,
      sublesson_name: lesson.subLessonData,
    }))
    // console.log(updateLessonDataArray)
    // console.log(lessonData)
    // const fromDatabase = 'your_course_id_value' // Replace with the actual value from the database
    // const updateLessonDataArray = lessonData.map((lesson) => ({
    //   course_id: fromDatabase,
    //   lesson_name: lesson.lessonName,
    //   sublesson_name: lesson.subLessonData.map((sublesson) => ({
    //     sublesson_name: sublesson.subLessonName,
    //   })),
    // }))
    // console.log(updateLessonDataArray)

    // const updateSubLessonData = {
    //   sublesson_name: [],
    // }

    // lessonData.forEach((lesson) => {
    //   lesson.subLessonData.forEach((subLesson) => {
    //     updateSubLessonData.sublesson_name.push(subLesson.subLessonName)
    //   })
    // })

    // console.log(updateSubLessonData)
    // try {
    //   await axios.post(
    //     `http://localhost:4000/admin/addcourse`,
    //     updatedCourseData
    //   )
    //   // console.log(updatedCourseData);
    //   localStorage.removeItem('video_url')
    //   localStorage.removeItem('image_url')
    //   formik.resetForm()
    //   setSubmitData(true)
    // } catch (error) {
    //   message: error
    // }
    displaySnackbar("You've Successfully Added a New Course. 🎉")
  }

  const handleData = () => {
    localStorage.setItem(`course_data`, JSON.stringify(courseData))
    navigate(`/admin/addcourse/addlesson`)
    // console.log(localStorage.getItem(`course_data`))
  }

  function displaySnackbar(message) {
    setOpenSnackBar(false)
    setSnackbarMes(message)
    setOpenSnackBar(true)
  }
  const [openSnackbar, setOpenSnackBar] = useState(false)
  const [snackBarMes, setSnackbarMes] = useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackBar(false)
  }

  return (
    <>
      <SnackBar
        open={openSnackbar}
        onClose={handleClose}
        severity={'success'}
        message={snackBarMes}
      />

      <div className="flex justify-center items-center">
        <div className="canvas flex flex-row w-[1440px]">
          {/* RIGHT-NAV */}
          <div className="w-full">
            <div className="topNav  flex  items-center gap-[16px] px-[40px] py-[16px] w-100% bg justify-between ">
              <div className="flex flex-row justify-center items-center space-x-4">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    navigate(-1)
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M18.7915 11.0051H7.62148L12.5015 6.1251C12.8915 5.7351 12.8915 5.0951 12.5015 4.7051C12.1115 4.3151 11.4815 4.3151 11.0915 4.7051L4.50148 11.2951C4.11148 11.6851 4.11148 12.3151 4.50148 12.7051L11.0915 19.2951C11.4815 19.6851 12.1115 19.6851 12.5015 19.2951C12.8915 18.9051 12.8915 18.2751 12.5015 17.8851L7.62148 13.0051H18.7915C19.3415 13.0051 19.7915 12.5551 19.7915 12.0051C19.7915 11.4551 19.3415 11.0051 18.7915 11.0051Z"
                      fill="#9AA1B9"
                    />
                  </svg>
                </div>
                <div className="flex flex-col ">
                  <div className="flex flex-row Body3 space-x-2 justify-center">
                    <p className="text-[#9AA1B9] H3">Course</p>
                    <h3 className="H3">{courseData.course_name}</h3>
                  </div>
                </div>
              </div>
              <div className="space-x-4">
                <button className="Secondary Shadow1">Cancel</button>
                <button
                  className="Primary Shadow1 border-none"
                  onClick={onSubmit}
                >
                  Edit
                </button>
              </div>
            </div>
            {/* MIDDLE-AREA */}
            <div className="p-[40px] bg-[--gray100] ">
              {/* PACKAGE WRAPPER  */}
              <div className="packageWrapper px-[100px] pt-[40px] pb-[60px] w-full h-full mb-[24px] ">
                <Formik>
                  <Form
                    className="flex flex-col  gap-[40px]"
                    onSubmit={onSubmitForm}
                  >
                    <div className="flex flex-col gap-[4px] border-2 border-sky-500">
                      <label htmlFor="courseName" className="">
                        Course name *
                      </label>
                      <input
                        type="text"
                        name="courseName"
                        // id="courseName"
                        placeholder="Enter Course Name"
                        className="Input"
                        value={formik.values.courseName}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.courseName ? (
                        <div>{formik.errors.courseName}</div>
                      ) : null}
                    </div>
                    <div className="flex gap-[80px] ">
                      <div className="flex flex-col flex-1 gap-[4px] ">
                        <label htmlFor="Price" className="">
                          Price *
                        </label>
                        <input
                          type="number"
                          name="price"
                          // id="price"
                          placeholder="Enter Course Price"
                          className="Input"
                          value={formik.values.price}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.price ? (
                          <div>{formik.errors.price}</div>
                        ) : null}
                      </div>
                      <div className="flex flex-col flex-1 gap-[4px]">
                        <label className="">Total learning time *</label>
                        <input
                          type="number"
                          name="totalLearningTime"
                          // id="totalLearningTime"
                          placeholder="Enter Total learning time"
                          className="Input"
                          value={formik.values.totalLearningTime}
                          onChange={formik.handleChange}
                        />{' '}
                        {formik.errors.totalLearningTime ? (
                          <div>{formik.errors.totalLearningTime}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <label className="">Course summary *</label>
                      <Field
                        as="textarea"
                        // type="text"
                        name="courseSummary"
                        // id="courseSummary"
                        placeholder="Enter Course summary"
                        className="Input h-[100px] resize-none"
                        value={formik.values.courseSummary}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.courseSummary ? (
                        <div>{formik.errors.courseSummary}</div>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <label className="">Course detail *</label>
                      <Field
                        as="textarea"
                        // type="text"
                        name="courseDetail"
                        // id="courseDetail"
                        placeholder="Enter Course detail"
                        className="Input h-[220px] resize-none flex text- align-text-top "
                        value={formik.values.courseDetail}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.courseDetail ? (
                        <div>{formik.errors.courseDetail}</div>
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

                    <button type="submit">Submit</button>
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
export default AdminEditCourse
