/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import LearnigDropdown from "../assets/LearnigDropdown";
import "./Learning.css";
import { useAuth } from "../contexts/AuthContext.jsx";
import axios from "axios";
import AssignmentBox from "./AssignmentBox.jsx";
import CircularIndeterminate from "../assets/loadingProgress";
import { useNavigate } from "react-router-dom";

function Learning() {
  const [isLoading, setIsLoading] = useState(true);
  const playerRef = useRef(null);
  const boxRef = useRef(null);
  const [sublessonIdArray, setSublessonIdArray] = useState([]);
  const [sublessonNameObject, setSublessonNameObject] = useState({});
  const [sublessonVideoObject, setSublessonVideoObject] = useState({});

  const {
    userId,
    isShowAsm,
    setIsShowAsm,
    isShowVdo,
    setIsShowVdo,
    videoHead,
    setVideoHead,
    videoKey,
    setVideoKey,
    pauseTime,
    setPauseTime,
    videoUrl,
    setvideoUrl,
  } = useAuth();

  const [courseData, setCourseData] = useState({
    course_name: "",
    course_detail: "",
    lessons: [],
  });
  // const [check, setCheck] = useState(null);
  const [videoThumbnail, setVideoThumbnail] = useState("");
  const [subStatus, setSubStatus] = useState({});
  const [percentComplete, setPercentComplete] = useState(0);
  const navigate = useNavigate();

  const getStatus = async () => {
    try {
      const result = await axios.get("http://localhost:4000/learn/status/", {
        params: {
          userID: userId,
          courseID: localStorage.getItem("course_id"),
        },
      });
      setSubStatus(result.data.data);
      setPercentComplete(Number(result.data.percentComplete));
    } catch (error) {
      console.log(error);
    }
  };

  const updateIsShowAsm = (value) => {
    setIsShowAsm(value);
    localStorage.setItem("isShowAsm", value);
  };

  const handleLesson = async (action) => {
    if (isLoading) {
      return;
    }
    setvideoUrl(null);
    localStorage.setItem("videoUrl", null);
    setIsLoading(true);
    if (action === "next" || action === "prev") {
      updateIsShowAsm(false);

      await handleVideoNavigation(action);
    }
    setIsLoading(false);
  };

  const handleVideoNavigation = async (action) => {
    try {
      const newVideoKey =
        action === "next"
          ? sublessonIdArray[sublessonIdArray.indexOf(videoKey) + 1]
          : sublessonIdArray[sublessonIdArray.indexOf(videoKey) - 1];

      if (newVideoKey) {
        const newVideoHead = sublessonNameObject[newVideoKey];
        const newVideoUrl = sublessonVideoObject[newVideoKey];

        setVideoKey(newVideoKey);
        setVideoHead(newVideoHead);
        setvideoUrl(newVideoUrl);
        localStorage.setItem("videoKey", newVideoKey);
        localStorage.setItem("videoHead", newVideoHead);
        localStorage.setItem("videoUrl", newVideoUrl);
        localStorage.setItem("isShowAsm", false);
      }
    } catch (error) {
      console.error("Error navigating video:", error);
    }
  };

  const handleShowVideo = async (sublessonName, sublessonID) => {
    try {
      setvideoUrl(null);
      localStorage.setItem("videoUrl", null);
      setIsLoading(true);
      updateVideoDisplay(sublessonName, sublessonID);
      fetchPauseTime();
      localStorage.setItem("pauseTime", 0);
      setIsShowVdo(true);
      localStorage.setItem("isShowVdo", true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error showing video:", error);
    }
  };

  const updateVideoDisplay = (sublessonName, sublessonID) => {
    const newVideoHead = sublessonName;
    const newVideoUrl = sublessonVideoObject[sublessonID];

    setVideoHead(newVideoHead);
    setVideoKey(sublessonID);

    setvideoUrl(newVideoUrl);

    localStorage.setItem("sublessonName", newVideoHead);
    localStorage.setItem("sublessonID", sublessonID);
    localStorage.setItem("videoKey", sublessonID);

    localStorage.setItem("videoUrl", newVideoUrl);

    updateIsShowAsm(false);
    setIsShowVdo(false);
    localStorage.setItem("isShowVdo", false);
  };
  const handleStart = async () => {
    updateIsShowAsm(false);
    playerRef.current.seekTo(
      pauseTime || localStorage.getItem("pauseTime"),
      "seconds"
    );
    try {
      await axios.put(
        `http://localhost:4000/learn/start?userID=${userId}&sublessonID=${localStorage.getItem(
          "videoKey"
        )}`
      );
      if (subStatus[videoKey] !== "complete") {
        const newStatus = { ...subStatus };
        newStatus[videoKey] = "inprogress";
        setSubStatus(newStatus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePause = async (a) => {
    await axios.put("http://localhost:4000/learn/videotime", {
      sublesson_video_timestop: a,
      sublesson_id: localStorage.getItem("videoKey"),
      user_Id: userId,
    });

    //**set pause time and update database
  };

  const fetchPauseTime = async () => {
    const result = await axios.get(
      `http://localhost:4000/learn/videotimebyid?sublessonid=${videoKey}&userid=${userId}`
    );

    if (result.data.data[0].sublesson_video_timestop !== null) {
      setPauseTime(result.data.data[0].sublesson_video_timestop);
      localStorage.setItem(
        "pauseTime",
        result.data.data[0].sublesson_video_timestop
      );
    } else if (result.data.data[0].sublesson_video_timestop === null) {
      setPauseTime(0);
    }
  };
  const handleEnd = async () => {
    const sublessonID = localStorage.getItem("videoKey") || videoKey;

    const result = await axios.get(
      `http://localhost:4000/assignment/check?sublessonId=${sublessonID}`
    );
    if (result.data.data.length === 0) {
      await axios.put(
        `http://localhost:4000/learn/complete?userID=${userId}&sublessonID=${sublessonID}`
      );
      const newStatus = { ...subStatus };
      newStatus[videoKey] = "complete";
      setSubStatus(newStatus);
      const result = await axios.get("http://localhost:4000/learn/status/", {
        params: {
          userID: userId,
          courseID: localStorage.getItem("course_id"),
        },
      });
      setPercentComplete(Number(result.data.percentComplete));

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
    }

    //have assignment
    else {
      const response = await axios.get(
        `http://localhost:4000/assignment/${userId}?sublessonid=${sublessonID}`
      );
      if (response.data.data.length === 0) {
        await axios.post(`http://localhost:4000/assignment/`, {
          user_id: userId,
          sublesson_id: sublessonID,
        });
      }

      updateIsShowAsm(true);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const result = await axios.get("http://localhost:4000/learn/", {
          params: {
            userID: userId,
            courseID: localStorage.getItem("course_id"),
          },
        });

        const data = result.data.data;
        setCourseData(data);
        setVideoThumbnail(data.cover_img);

        const newSublessonIdArray = [];
        const newSublessonNameObject = {};
        const newSublessonVideoObject = {};

        data.lessons.forEach((lesson) => {
          lesson.sublessons.forEach((sublesson) => {
            newSublessonIdArray.push(sublesson.sublesson_id);
            newSublessonNameObject[sublesson.sublesson_id] =
              sublesson.sublesson_name;
            newSublessonVideoObject[sublesson.sublesson_id] =
              sublesson.sublesson_video;
          });
        });

        setSublessonIdArray(newSublessonIdArray);
        setSublessonNameObject(newSublessonNameObject);
        setSublessonVideoObject(newSublessonVideoObject);
        // setVideoKey(localStorage.getItem("videoKey"));
        setIsLoading(false);
        // setCheck(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
    getStatus();
  }, []);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center w-[100%] gap-8 min-h-[100vh] text-black'>
        <h1>Loading...</h1>
        <CircularIndeterminate />
      </div>
    );
  }
  // eslint-disable-next-line no-extra-boolean-cast
  if (Boolean(localStorage.getItem("nonepause"))) {
    setVideoHead(sublessonNameObject[sublessonIdArray[0]]);
    setVideoKey(sublessonIdArray[0]);
    setIsShowVdo(true);
    setPauseTime(0);
    setvideoUrl(sublessonVideoObject[sublessonIdArray[0]]);
    localStorage.removeItem("nonepause");
  }

  return (
    <>
      <div className='absolute left-[155px] top-[150px] back-btn'>
        <a
          onClick={() => navigate(-1)}
          className='flex flex-row justify-start items-center px-[8px] py-[4px] gap-[8px] cursor-pointer'>
          <img src='../../public/image/arrow_back.svg' alt='arrow_back' />
          <p className='text-[--blue500] font-[700] text-[16px]'>Back</p>
        </a>
      </div>
      <div className='flex justify-center pt-[100px] px-[160px] min-h-[1000px]'>
        <div className=' flex flex-col w-[360px] mr-[24px] px-6 py-8 shadow-[4px_4px_24px_0px_rgba(0,0,0,0.08)] '>
          <div className=''>
            <h1 className='Body3 text-[--orange500] mb-6'>Course</h1>
            <h1 className='H3 mb-2'>{courseData.course_name}</h1>
            <h1 className='Body2 text-[--gray700] mb-6 leading-8'>
              {courseData.course_detail.slice(0, 100)}...
            </h1>
          </div>
          <div className='mb-6'>
            <h1 className='Body2 text-[--gray700] mb-2'>
              {percentComplete}% Complete
            </h1>
            <div className='w-full h-[10px] bg-[--gray300] rounded-full'>
              <div className='progressbar h-full Linear1 rounded-full'></div>
            </div>
          </div>
          <form>
            {courseData.lessons.map((lesson, index) => {
              let seq = "";
              index + 1 < 10
                ? (seq = "0" + (index + 1))
                : (seq = String(index + 1));

              return (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<LearnigDropdown />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'>
                    <Typography component='div'>
                      <div className='flex'>
                        <h1 className='Body2 mr-6 text-[--gray700]'>{seq}</h1>
                        <h1 className='Body2'>{lesson.lesson_name}</h1>
                      </div>
                    </Typography>
                  </AccordionSummary>
                  <hr />
                  <AccordionDetails>
                    <div className=''>
                      {lesson.sublessons.map((sublesson, index) => {
                        return (
                          <label
                            key={index}
                            id={sublesson.sublesson_id}
                            className={`flex items-center px-2 py-3 cursor-pointer hover:bg-[--gray300] active:bg-[--gray500] ${sublesson.sublesson_id === videoKey
                                ? "bg-[--gray400]"
                                : ""
                              }`}
                            // className={`flex items-center px-2 py-3 cursor-pointer hover:bg-[--gray300] active:bg-[--gray500] tab${sublesson.sublesson_id}`}
                            onClick={() =>
                              handleShowVideo(
                                sublesson.sublesson_name,
                                sublesson.sublesson_id
                              )
                            }>
                            <div className='mr-4 h-[20px]'>
                              {subStatus[sublesson.sublesson_id] ===
                                "complete" ? (
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='20'
                                  height='20'
                                  viewBox='0 0 20 20'
                                  fill='none'>
                                  <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M1.875 10C1.875 5.5125 5.5125 1.875 10 1.875C14.4875 1.875 18.125 5.5125 18.125 10C18.125 14.4875 14.4875 18.125 10 18.125C5.5125 18.125 1.875 14.4875 1.875 10ZM13.0083 8.48833C13.0583 8.42171 13.0945 8.34576 13.1147 8.26496C13.135 8.18415 13.1388 8.10012 13.1261 8.0178C13.1134 7.93547 13.0844 7.85652 13.0407 7.78558C12.9971 7.71464 12.9396 7.65315 12.8719 7.60471C12.8041 7.55627 12.7273 7.52187 12.6461 7.50352C12.5648 7.48518 12.4807 7.48326 12.3987 7.49789C12.3167 7.51251 12.2385 7.54338 12.1686 7.58868C12.0987 7.63398 12.0385 7.69279 11.9917 7.76167L9.295 11.5367L7.94167 10.1833C7.82319 10.0729 7.66648 10.0128 7.50456 10.0157C7.34265 10.0185 7.18816 10.0841 7.07365 10.1986C6.95914 10.3132 6.89354 10.4676 6.89069 10.6296C6.88783 10.7915 6.94793 10.9482 7.05833 11.0667L8.93333 12.9417C8.99749 13.0058 9.07483 13.0552 9.15999 13.0864C9.24515 13.1176 9.33608 13.1299 9.42647 13.1224C9.51686 13.115 9.60455 13.088 9.68344 13.0432C9.76233 12.9985 9.83054 12.9371 9.88333 12.8633L13.0083 8.48833Z'
                                    fill='#2FAC8E'
                                  />
                                </svg>
                              ) : subStatus[sublesson.sublesson_id] ===
                                "inprogress" ? (
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='20'
                                  height='20'
                                  viewBox='0 0 20 20'
                                  fill='none'>
                                  <circle
                                    cx='10'
                                    cy='10'
                                    r='7.25'
                                    stroke='#2FAC8E'
                                    strokeWidth='1.5'
                                  />
                                  <mask fill='white'>
                                    <path d='M10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18L10 10L10 2Z' />
                                  </mask>
                                  <path
                                    d='M10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18L10 10L10 2Z'
                                    fill='#2FAC8E'
                                    stroke='#2FAC8E'
                                    strokeWidth='0'
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='20'
                                  height='20'
                                  viewBox='0 0 20 20'
                                  fill='none'>
                                  <circle
                                    cx='10'
                                    cy='10'
                                    r='7.25'
                                    stroke='#2FAC8E'
                                    strokeWidth='1.5'
                                  />
                                </svg>
                              )}
                            </div>
                            <h1 className='Body3 text-[--gray700]'>
                              {sublesson.sublesson_name}
                            </h1>
                          </label>
                        );
                      })}
                    </div>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </form>
        </div>

        <div className='flex flex-col w-[739px]' ref={boxRef}>
          <div className='mb-20'>
            <div className='h-[90px]'>
              {/* <h1 className='H2'>{localStorage.getItem("sublessonName")}</h1> */}
              <h1 className='H2'>{videoHead}</h1>
            </div>
            {isShowVdo || localStorage.getItem("isShowVdo") ? (
              <div className='w-full'>
                {/* <h1 className='H3'>
                  VDO: {localStorage.getItem("videoKey") || videoKey}
                </h1> */}
                <div className='rounded-lg overflow-hidden '>
                  <ReactPlayer
                    ref={playerRef}
                    // url={localStorage.getItem("videoUrl")}
                    url={videoUrl}
                    width='739px'
                    height='420px'
                    controls={true}
                    light={videoThumbnail}
                    playIcon={
                      <div
                        className={`flex justify-center items-center min-h-[32vw] w-full`}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='104'
                          height='104'
                          viewBox='0 0 104 104'
                          fill='none'>
                          <rect
                            width='104'
                            height='104'
                            rx='52'
                            fill='#020202'
                            fillOpacity='0.5'
                          />
                          <path
                            d='M77 52.5L40.25 73.7176L40.25 31.2824L77 52.5Z'
                            fill='white'
                          />
                        </svg>
                      </div>
                    }
                    playing={true}
                    onStart={() => {
                      handleStart();
                    }}
                    onPause={(e) => handlePause(e.target.currentTime)} //send pause-time to database
                    onEnded={handleEnd}
                  />
                </div>
              </div>
            ) : null}
          </div>
          <div className='self-center'>
            {isShowAsm ? (
              <AssignmentBox
                sublessonID={localStorage.getItem("videoKey") || videoKey}
                subStatus={subStatus}
                setSubStatus={setSubStatus}
                setPercentComplete={setPercentComplete}
              />
            ) : null}
          </div>
        </div>
      </div>
      <div className='Shadow1 flex justify-between px-[60px] py-[20px]'>
        {sublessonIdArray.findIndex((element) => element === videoKey) > 0 ? (
          <button
            className='bg-white p-[20px] border-none text-[16px] text-[--blue500] font-bold cursor-pointer hover:text-[--blue300] duration-300'
            onClick={() => handleLesson("prev")}>
            Previous Lesson
          </button>
        ) : (
          <div></div>
        )}

        {sublessonIdArray.findIndex((element) => element === videoKey) <
          sublessonIdArray.length - 1 ? (
          <button
            className='Primary border-none cursor-pointer'
            onClick={() => {
              handleLesson("next");
            }}>
            Next Lesson
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <style>
        {`.progressbar {
          width: ${percentComplete}%;
          }`}</style>
      {/* <style>
        {`.progressbar {
          width: ${percentComplete}%;
          }
      .tab${videoKey} {
        background: #d6d9e4;
      }`}</style> */}
    </>
  );
}

export default Learning;
