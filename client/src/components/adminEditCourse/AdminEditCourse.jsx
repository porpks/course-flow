import React, { useState, useEffect } from "react";
import "./adminEditCourse.css";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, useFormik } from "formik";
import LessonTable from "./LessonTable";
import AddLesson from "../addLessonComponent/AddLesson";
import axios from "axios";
import * as Yup from "yup";
import UploadVideo from "./UploadVideo";
import UploadImage from "./UploadImage";
import SnackBar from "../SnackBar.jsx";
import { useParams } from "react-router-dom";
import CircularIndeterminate from "../../assets/loadingProgress";

function AdminEditCourse() {
  // const history = useHistory()
  const navigate = useNavigate();
  const [image_url, setImage_url] = useState("");
  const [video_url, setVideo_url] = useState("");
  const [submitData, setSubmitData] = useState(false);
  const [lessonData, setLessonData] = useState("");
  const [subLessonData, setSubLessonData] = useState("");
  const [localImg, setLocalImg] = useState("");
  const [localVdo, setLocalVdo] = useState("");
  const [courseData, setCourseData] = useState([]);
  const { courseId } = useParams();

  const [getImgUrl, setGetImgUrl] = useState("");
  const [getVdoUrl, setGetVdoUrl] = useState("");

  const [getCoverImg, setGetCoverImg] = useState([]);
  // const [getCoverImg, setGetCoverImg] = useState([]);

  const [getVideoTrailer, setGetVideoTrailer] = useState([]);

  const initialValues = {
    courseName: "",
    price: "",
    totalLearningTime: "",
    courseSummary: "",
    courseDetail: "",
  };

  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.courseName) {
      errors.courseName = "Required!";
    } else if (values.courseName.length > 15) {
      errors.courseName = "Please provide less than 15 characters.";
    }
    if (!values.price) {
      errors.price = "Required!";
    }
    if (!values.totalLearningTime) {
      errors.totalLearningTime = "Required!";
    }
    if (!values.courseSummary) {
      errors.courseSummary = "* Required";
    } else if (values.courseSummary.length < 15) {
      errors.courseSummary = "Please provide more than 15 characters.";
    }
    if (!values.courseDetail) {
      errors.courseDetail = "* Required";
    } else if (values.courseDetail.length < 15) {
      errors.courseDetail = "Please provide more than 15 characters.";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      console.log("onSubmit", values);
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [loadingMes, setLoadingMes] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    if (
      !formik.values.courseName ||
      !formik.values.price ||
      !formik.values.totalLearningTime ||
      !formik.values.courseSummary ||
      !formik.values.courseDetail
    ) {
      displaySnackbar("Please fill out all fields.", "warning");
      return;
    }

    if (!getVideoTrailer && !getCoverImg) {
      displaySnackbar(
        "Please upload a cover image and a video trailer.",
        "warning"
      );
      return;
    }

    if (!getVideoTrailer) {
      displaySnackbar("Please upload a video trailer.", "warning");
      return;
    }
    if (JSON.parse(localStorage.getItem("lesson_data"))?.length < 1) {
      displaySnackbar(
        "Please add at least one lesson to your course.",
        "warning"
      );
      return;
    }

    const newCourseData = {
      course_name: formik.values.courseName,
      price: formik.values.price,
      total_time: formik.values.totalLearningTime,
      course_summary: formik.values.courseSummary,
      course_detail: formik.values.courseDetail,
      cover_img: getImgUrl,
      video_trailer: getVdoUrl,
    };

    const formData = new FormData();
    for (let key in newCourseData) {
      if (
        key !== "cover_img" &&
        key !== "video_trailer" &&
        typeof newCourseData[key] === "object"
      ) {
        formData.append(key, JSON.stringify(newCourseData[key]));
        // console.log(newCourseData[key].subLessonVideo);
        for (let value of newCourseData[key].subLessonVideo) {
          formData.append("subLessonVideo", value);
        }
      } else {
        formData.append(key, newCourseData[key]);
      }
    }
    setLoadingMes("Course Upload in Progress...");
    setIsLoading(true);
    await axios.put(`http://localhost:4000/admin/${courseId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setIsLoading(false);
    navigate("/admin/courselist");
  };

  if (localImg && localVdo) {
    const storedImageUrl = localImg;
    const storedVideoUrl = localVdo;
    if (storedImageUrl !== image_url) {
      setImage_url(storedImageUrl);
    }
    if (storedVideoUrl !== video_url) {
      setVideo_url(storedVideoUrl);
    }
  }

  useEffect(() => {
    const courseFetching = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4000/ourcourse/${courseId}`
        );
        console.log(result.data.data);

        const initialValues = {
          courseName: result.data.data.course_name,
          price: result.data.data.price,
          totalLearningTime: result.data.data.total_time,
          courseSummary: result.data.data.course_summary,
          courseDetail: result.data.data.course_detail,
        };
        formik.setValues(initialValues);
        setCourseData(result.data.data);
        setGetCoverImg(result.data.data.cover_img);
        setGetVideoTrailer(result.data.data.video_trailer);
        // console.log(`result : ${setGetVideoTrailer}`);
      } catch (error) {
        console.log(error);
      }
    };
    courseFetching();
  }, [courseId]);

  // console.log(getCourse);

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (
      !formik.values.courseName ||
      !formik.values.price ||
      !formik.values.totalLearningTime ||
      !formik.values.courseSummary ||
      !formik.values.courseDetail
    ) {
      displaySnackbar("Please fill out all fields.", "warning");
      return;
    }
    displaySnackbar("Your Course has been updated.", "success");
    formik.handleSubmit(e);
  };

  const sendData = async (course) => {
    const updatedCourseData = {
      ...courseData,
      cover_img: image_url,
      video_trailer: video_url,
    };

    const testData = [
      {
        ...courseData,
        ...lessonData,
      },
    ];

    // console.log(testData);
    const fromDatabase = "your_course_id_value"; // Replace with the actual value from the database
    const updateLessonDataArray = lessonData.map((lesson, index) => ({
      course_id: fromDatabase,
      lesson_name: lesson.lessonName,
      sublesson_name: lesson.subLessonData,
    }));

    displaySnackbar("You've Successfully Added a New Course. 🎉");
  };

  const handleData = () => {
    localStorage.setItem(`course_data`, JSON.stringify(courseData));
    navigate(`/admin/addcourse/addlesson`);
    // console.log(localStorage.getItem(`course_data`))
  };

  function displaySnackbar(message, status) {
    setOpenSnackBar(false);
    setSnackbarMes(message);
    setSnackbarStatus(status);
    setOpenSnackBar(true);
  }
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState("");
  const [snackBarMes, setSnackbarMes] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-[100%] min-h-[100vh] gap-8 text-black">
        <h1>{loadingMes}</h1>
        <CircularIndeterminate />
      </div>
    );
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
          {/* RIGHT-NAV */}
          <div className="w-full">
            <div className="topNav  flex  items-center gap-[16px] px-[40px] py-[16px] w-100% bg justify-between ">
              <div className="flex flex-row justify-center items-center space-x-4">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    navigate(-1);
                  }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none">
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
                <button
                  className="Secondary Shadow1"
                  onClick={() => {
                    navigate(-1);
                  }}>
                  Cancel
                </button>
                <button
                  className="Primary Shadow1 border-none"
                  onClick={onSubmit}>
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
                    onSubmit={formik.handleSubmit}>
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
                            ? " border-[#9B2FAC]"
                            : " border-[--gray500]"
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
                              ? " border-[#9B2FAC]"
                              : " border-[--gray500]"
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
                              ? " border-[#9B2FAC]"
                              : " border-[--gray500]"
                          }`}
                          value={formik.values.totalLearningTime}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />{" "}
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
                            ? " border-[#9B2FAC]"
                            : " border-[--gray500]"
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
                            ? " border-[#9B2FAC]"
                            : " border-[--gray500]"
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
                  </Form>
                </Formik>
                {/*----------------------- UPLOAD IMG --------------------- */}
                <UploadImage
                  submitData={submitData}
                  getUrl={setLocalImg}
                  setGetImgUrl={setGetImgUrl}
                  getCoverImg={getCoverImg}
                  setGetCoverImg={setGetCoverImg}
                />
                {/*----------------------- UPLOAD VIDEO --------------------- */}
                <UploadVideo
                  submitData={submitData}
                  getUrl={setLocalVdo}
                  setGetVdoUrl={setGetVdoUrl}
                  getVideoTrailer={getVideoTrailer}
                  setGetVideoTrailer={setGetVideoTrailer}
                />
              </div>
              {/* add;-lesson */}
              {/* <div className="add-lesson flex flex-row gap-[16px] items-center mb-[43px]"> */}
              {/* <div className="H3 flex-1">Lesson</div> */}
              {/* <button
                  className="Primary Shadow1 px-[32px] py-[18px] justify-center border-none"
                  onClick={() => {
                    handleData();
                  }}>
                  + Add Lesson
                </button> */}
            </div>
            {/* table-SubLesson */}
            {/* <div className="table-SubLesson">
                <LessonTable />
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminEditCourse;
