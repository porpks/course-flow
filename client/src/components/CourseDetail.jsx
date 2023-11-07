import React from "react";
import { useEffect, useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import "./courseDetail.css";
import Collapsible from "../assets/Collapsible.jsx";
import Mymodal from "../components/Mymodal";
import { Hidden } from "@mui/material";
import axios from "axios";
import ReactPlayer from "react-player";
import CircularIndeterminate from "../assets/loadingProgress";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../contexts/AuthContext";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SnackBar from "./SnackBar";
import MuiAlert from "@mui/material/Alert";

function CourseDetail() {
  const navigate = useNavigate();
  const [desireData, setDesireData] = useState([]);

  const isDesireExist = Boolean(desireData?.length > 0);

  const [subscribeData, setSubscribeData] = useState([]);
  const isSubscribe = subscribeData?.length > 0;

  const [isRequestPending, setIsRequestPending] = useState(false);

  const [desireToggle, setDesireToggle] = useState(false);
  const openDesire = () => setDesireToggle(true);
  const closeDesire = () => setDesireToggle(false);

  const [subscribeToggle, setSubscribeToggle] = useState(false);
  const openSubscribe = () => setSubscribeToggle(true);
  const closeSubscribe = () => setSubscribeToggle(false);

  function displaySnackbar(message) {
    setOpenSnackBar(false);
    setSnackbarMes(message);
    setOpenSnackBar(true);
  }
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [snackBarMes, setSnackbarMes] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const [dataCourse, setDataCourse] = useState([]);
  const param = useParams();
  const {
    setIsShowVdo,
    setIsShowAsm,
    setVideoHead,
    setVideoKey,
    setPauseTime,
    setvideoUrl,
    userIdFromCookie,
  } = useAuth();
  const userId = userIdFromCookie;

  // const history = useHistory();
  // const handleGoBack = () => {
  //   const previousPage = document.referrer;
  //   if (previousPage) {
  //     window.location.href = previousPage;
  //   }
  // };

  async function getDetailCourse() {
    try {
      const dataDetailCourse = await axios.get(
        `http://localhost:4000/coursedetail/${param.id}`
      );
      setDataCourse(dataDetailCourse.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  const dataDetail = dataCourse;

  const checkDesire = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/desire/?userId=${userId}&courseId=${param.id}`
      );
      setDesireData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkSubscribe = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/mycourse/?user_id=${userId}&course_id=${param.id}`
      );
      setSubscribeData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const desireAddHandle = async () => {
    if (isRequestPending) {
      return;
    }

    setIsRequestPending(true);

    const desireBody = {
      user_id: userId,
      course_id: dataCourse.course_id,
    };

    try {
      await axios.post(`http://localhost:4000/desire`, desireBody);
      setDesireToggle(false);
      setDesireData([1]);
      displaySnackbar("Desire course has been added!");
    } catch (error) {
      console.log(error);
    } finally {
      setIsRequestPending(false);
    }
  };
  const desireRemoveHandle = async () => {
    if (isRequestPending) {
      return;
    }
    setIsRequestPending(true);
    try {
      await axios.delete(
        `http://localhost:4000/desire/?userId=${userId}&courseId=${param.id}`
      );
      setDesireToggle(false);
      setDesireData();
      displaySnackbar("Desire course has been deleted!");
    } catch (error) {
      console.log(error);
    } finally {
      setIsRequestPending(false);
    }
  };

  const subscribeHandle = async () => {
    if (isRequestPending) {
      return;
    }

    setIsRequestPending(true);

    const subscribe = {
      user_id: userId,
      course_id: param.id,
    };
    try {
      await axios.post(`http://localhost:4000/mycourse/`, subscribe);
      await axios.delete(
        `http://localhost:4000/desire/?userId=${userId}&courseId=${param.id}`
      );
      setSubscribeToggle(false);
      displaySnackbar("Thank you for subscribing to our course!");
      setSubscribeData([1]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRequestPending(false);
    }
  };

  const startLearningHandle = async () => {
    window.scrollTo(0, 0);
    getDataCourse2();
    navigate(`/learning/${param.id}`);
  };

  const noAuthHandle = () => {
    navigate("/login");
  };

  const getDataCourse2 = async () => {
    try {
      localStorage.removeItem("sublessonName");
      localStorage.removeItem("sublessonID");
      localStorage.removeItem("isShowVdo");
      localStorage.removeItem("isShowAsm");
      localStorage.removeItem("pauseTime");
      localStorage.removeItem("videoUrl");
      localStorage.removeItem("pauseTime");
      localStorage.removeItem("nonepause");
      localStorage.removeItem("videoKey");
      localStorage.setItem("course_id", param.id);

      const result = await axios.get("http://localhost:4000/learn/videotime", {
        params: {
          userID: userId,
          courseID: param.id,
        },
      });
      const data = result.data.data;
      console.log(data);
      if (data !== undefined) {
        const handleShowVideo = (sublessonName, sublessonID) => {
          setVideoHead(sublessonName);
          localStorage.setItem("sublessonName", sublessonName);
          setVideoKey(sublessonID);
          localStorage.setItem("sublessonID", sublessonID);
          localStorage.setItem("videoKey", sublessonID);
          setIsShowVdo(true);
          localStorage.setItem("isShowVdo", true);
          setIsShowAsm(false);
          localStorage.setItem("isShowAsm", false);
          setPauseTime(data.sublesson_video_timestop);
          localStorage.setItem(data.sublesson_video_timestop);
          setvideoUrl(data.sublesson_video);
          localStorage.setItem("videoUrl", data.sublesson_video);
          localStorage.setItem("nonepause", false);
          console.log(data.sublesson_video_timestop);
        };
        handleShowVideo(data.sublesson_name, data.sublesson_id);
      } else {
        setIsShowVdo(true);
        localStorage.setItem("isShowVdo", true);
        setIsShowAsm(false);
        localStorage.setItem("isShowAsm", false);
        setPauseTime(0);
        localStorage.setItem("pauseTime", 0);
        localStorage.setItem("nonepause", true);
      }
    } catch (error) {
      console.log("there is no sublesson in this code");
    }
  };

  useEffect(() => {
    getDetailCourse();
    if (localStorage.getItem("isLoggedIn")) {
      checkDesire();
      checkSubscribe();
      getDetailCourse();
    }
  }, []);

  if (dataCourse.length === 0) {
    return (
      <div className="flex justify-center items-center   w-[100%] min-h-[100vh] text-black gap-8">
        <h1> Loading...</h1>
        <CircularIndeterminate />
      </div>
    );
  }
  const coursePrice = dataDetail.price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  });
  const lessonTotal = dataDetail.lessons;

  return (
    <>
      <SnackBar
        open={openSnackbar}
        onClose={handleClose}
        severity={"success"}
        message={snackBarMes}
      />
      <section className="flex justify-center items-center border-2 border-sky-500">
        <div className="canvas_CourseDetail ">
          <div className="back-btn">
            <a
              onClick={() => {
                navigate(-1);
              }}
              className="flex flex-row justify-start items-center px-[8px] py-[4px] gap-[8px] cursor-pointer">
              <img src="../../public/image/arrow_back.svg" alt="arrow_back" />
              <p className="text-[--blue500] font-[700] text-[16px]">Back</p>
            </a>
          </div>
          <div className="flex gap-[30px]">
            <div className="CourseDetail">
              <div className="vdo-preview rounded-[8px] w-[739px] h-[460px] cursor-pointer ">
                <ReactPlayer
                  url="https://yzcnxdhntdijwizusqmn.supabase.co/storage/v1/object/public/test-avatar/1%20Minute%20Sample%20Video.mp4?t=2023-09-08T15%3A26%3A51.001Z"
                  width="100%"
                  height="100%"
                  controls={true}
                  light={dataDetail.cover_img}
                  playIcon={
                    <svg
                      className="min-h-[460px]"
                      xmlns="http://www.w3.org/2000/svg"
                      width="104"
                      height="104"
                      viewBox="0 0 104 104"
                      fill="none">
                      <rect
                        width="104"
                        height="104"
                        rx="52"
                        fill="#020202"
                        fillOpacity="0.5"
                      />
                      <path
                        d="M77 52.5L40.25 73.7176L40.25 31.2824L77 52.5Z"
                        fill="white"
                      />
                    </svg>
                  }
                />
              </div>

              <div className="CourseDetail_description flex flex-col gap-[24px]">
                <div className="courseDetail_title ">
                  <div className="H2">{dataCourse.course_name}</div>
                </div>
                <div className="courseDetail_body">
                  <div className="Body2">{dataCourse.course_detail}</div>
                </div>
              </div>
              <div className="lesson_sample">
                <div className="H2 text-[--black] mb-[24px]">
                  Module Samples
                </div>
                <div className="collapsible-contents H3 ">
                  {lessonTotal.map((lesson, index) => (
                    <div key={uuidv4()}>
                      <Accordion className="accordion">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          className="accordionSummary">
                          <div className="typography">
                            <div className="H3 text-[--gray700]">
                              {index < 10 ? "0" + (index + 1) : index + 1}
                            </div>
                            <div className="H3 text-[--black]">
                              {lesson.lesson_name}
                            </div>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails className="accordionDetails">
                          <div className="subLesson Body2 text-[--gray700] ">
                            <ul>
                              {lesson.sublessons.map((sublessonItem, index) => (
                                <li key={uuidv4()}>
                                  {sublessonItem.sublesson_name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="Subscribe_box Shadow1">
              <div>
                <div className="Body3 text-[--orange500]">Course</div>
              </div>
              <div className="course-Subscribe flex flex-col gap-[8px]">
                <div className="course-title H3">{dataDetail.course_name}</div>
                <div className="course-description Body2 text-[--gray700]">
                  {dataDetail.course_detail.slice(0, 65)}
                </div>
              </div>
              <div className="course-price  H3 text-[--gray700] flex flex-row justify-center items-center">
                <div className="mr-[1rem]">THB</div>
                <div>{coursePrice}</div>
              </div>
              <div className="btn-grp">
                {isSubscribe ? null : (
                  <button
                    onClick={Boolean(userId) ? openDesire : noAuthHandle}
                    className={`Secondary w-[100%] hidden`}>
                    {isDesireExist
                      ? "Remove from Desire Course"
                      : "Get in Desire Course"}
                  </button>
                )}

                {desireToggle ? (
                  <Mymodal
                    open={desireToggle}
                    onClose={closeDesire}
                    closeButton={closeDesire}
                    description={`Do you sure to ${
                      isDesireExist ? "add" : "remove"
                    } ${dataCourse.course_name} to your desire Course?`}
                    yesDes={
                      isDesireExist
                        ? "Remove from Desire Course"
                        : "Add in Desire Course"
                    }
                    noDes="No, I don’t"
                    yesOnClick={
                      isDesireExist ? desireRemoveHandle : desireAddHandle
                    }
                    noOnClick={closeDesire}
                  />
                ) : null}
                {subscribeToggle ? (
                  <Mymodal
                    open={subscribeToggle}
                    onClose={closeSubscribe}
                    closeButton={closeSubscribe}
                    description={`Do you sure to subscribe ${dataCourse.course_name}?`}
                    yesDes="Yes, I want to subscribe"
                    noDes="No, I don’t"
                    yesOnClick={subscribeHandle}
                    noOnClick={closeSubscribe}
                  />
                ) : null}
                <button
                  onClick={() => {
                    if (Boolean(userId)) {
                      if (isSubscribe) {
                        startLearningHandle();
                      } else {
                        openSubscribe();
                      }
                    } else {
                      noAuthHandle();
                    }
                  }}
                  className="Primary w-[100%] border-none">
                  {isSubscribe ? "Start Learning" : "Subscribe This Course"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseDetail;
