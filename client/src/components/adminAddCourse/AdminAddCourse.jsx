import React, { useState, useEffect } from 'react'
import './adminAddCourse.css'
import Sidebar from '../Sidebar'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, useFormik } from 'formik'
import LessonTable from './LessonTable'
import AddLesson from '../addLessonComponent/AddLesson'
import axios from 'axios'
import * as Yup from 'yup'
import UploadVideo from './UploadVideo'
import UploadImage from './UploadImage'
function AdminAddCourse() {
  // const history = useHistory()
  const navigate = useNavigate()

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
    initialValues: {
      courseName: '',
      price: '',
      totalLearningTime: '',
      courseSummary: '',
      courseDetail: '',
    },
    onSubmit: (values) => {
      console.log('onSubmit', values)
      alert(JSON.stringify(values, null, 2))
    },
  })

  const courseData = {
    course_name: formik.values.courseName,
    price: formik.values.price,
    total_time: formik.values.totalLearningTime,
    course_summary: formik.values.courseSummary,
    course_detail: formik.values.courseDetail,
    // cover_img,
    // video_trailer,
  }
  useEffect(() => {
    const storedData = localStorage.getItem('course_data')
    // console.log(storedData)
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      // console.log(parsedData)
      const courseDataFromLocal = {
        courseName: parsedData.course_name,
        price: parsedData.price,
        totalLearningTime: parsedData.total_time,
        courseSummary: parsedData.course_summary,
        courseDetail: parsedData.course_detail,
      }
      formik.setValues(courseDataFromLocal)
    }
  }, [])

  const sendData = async (course) => {
    await axios.post(`http://localhost:4000/admin/addcourse`, courseData)
  }

  const handleData = () => {
    localStorage.setItem(`course_data`, JSON.stringify(courseData))
    navigate(`/admin/addcourse/addlesson`)
    console.log(localStorage.getItem(`course_data`))
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="canvas flex flex-row w-[1440px]">
          {/* LEFT-NAV */}
          <div className="">
            <Sidebar isCoursePage={true} />
          </div>
          {/* RIGHT-NAV */}
          <div className="w-full">
            <div className="topNav  flex  items-center gap-[16px] px-[40px] py-[16px] w-100% bg  ">
              <div className="H3 flex-1">Add Course</div>
              <button className="Secondary Shadow1">Cancel</button>
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
                      <input
                        type="text"
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
                      <input
                        type="text"
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
                    <UploadImage />
                    {/*----------------------- UPLOAD VIDEO --------------------- */}
                    <UploadVideo />
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
export default AdminAddCourse
