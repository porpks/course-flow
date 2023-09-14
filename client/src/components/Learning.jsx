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
import AssignmentBox from "./AssignmentBox";

function SublessonIcon({
  userID,
  sublessonID,
  //   totalLesson,
  //   setTotalLesson,
  //   totalCompleted,
  //   setTotaCompleted,
  //   setPercentCompleted,
}) {
  const [subStatus, setSubStatus] = useState("");

  const getStatus = async () => {
    try {
      if (sublessonID && userID) {
        const result = await axios.get("http://localhost:4000/learn/status/", {
          params: { userID, sublessonID },
        });
        setSubStatus(result.data.data);
        // setTotalLesson(totalLesson + 1)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  if (subStatus === "complete") {
    // setTotaCompleted(totalCompleted + 1)
    // setPercentCompleted(totalCompleted / totalLesson * 100)
    return (
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
    );
  } else if (subStatus === "inprogress") {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'>
        <circle cx='10' cy='10' r='7.25' stroke='#2FAC8E' strokeWidth='1.5' />
        <mask id='path-2-inside-1_140_7809' fill='white'>
          <path d='M10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18L10 10L10 2Z' />
        </mask>
        <path
          d='M10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18L10 10L10 2Z'
          fill='#2FAC8E'
          stroke='#2FAC8E'
          strokeWidth='3'
          mask='url(#path-2-inside-1_140_7809)'
        />
      </svg>
    );
  } else {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'>
        <circle cx='10' cy='10' r='7.25' stroke='#2FAC8E' strokeWidth='1.5' />
      </svg>
    );
  }
}

function Learning() {
  const playerRef = useRef(null);
  const boxRef = useRef(null);

  const [sublessonIdArray, setSublessonIdArray] = useState([]);
  const [sublessonNameObject, setSublessonNameObject] = useState({});
  const [sublessonVideoObject, setSublessonVideoObject] = useState({});
  const [loading, setLoading] = useState(true);
  const {
    userID,
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
  //   const [totalLesson, setTotalLesson] = useState(0);
  //   const [totalCompleted, setTotaCompleted] = useState(0);
  //   const [percentCompleted, setPercentCompleted] = useState(0);
  const [videoThumbnail, setVideoThumbnail] = useState("");

  // const getDataCourse = async () => {
  //   let course_id = Math.round(Math.random() * 20);
  //   if (course_id === 13) {
  //     course_id = course_id + 1;
  //   }

  //   try {
  //     const result = await axios.get("http://localhost:4000/learn/", {
  //       params: { userID: 172, courseID: 20 },
  //     });
  //     const data = result.data.data;
  //     setCourseData(data);
  //     setVideoThumbnail(data.cover_img);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleLesson = (action) => {
    if (loading) {
      return;
    }

    if (action === "next") {
      setIsShowAsm(false);
      localStorage.setItem("isShowAsm", false);
      setIsShowVdo(false);
      localStorage.setItem("isShowVdo", false);
      setTimeout(() => {
        setVideoKey(
          sublessonIdArray[
            sublessonIdArray.findIndex(
              (element) => element === localStorage.getItem("sublessonID")
            ) + 1
          ]
        );
        console.log(sublessonIdArray, "in Next");
        console.log(
          sublessonIdArray.findIndex(
            (element) => element === localStorage.getItem("sublessonID")
          ) + 1,
          "findindex"
        );
        localStorage.setItem(
          "videoKey",
          sublessonIdArray[
            sublessonIdArray.findIndex(
              (element) => element === localStorage.getItem("sublessonID")
            ) + 1
          ]
        );
        localStorage.setItem(
          "sublessonID",
          sublessonIdArray[
            sublessonIdArray.findIndex((element) => element === videoKey) + 1
          ]
        );

        setVideoHead(
          sublessonNameObject[
            sublessonIdArray[
              sublessonIdArray.findIndex((element) => element === videoKey) + 1
            ]
          ]
        );

        localStorage.setItem(
          "videoHead",
          sublessonNameObject[
            sublessonIdArray[
              sublessonIdArray.findIndex((element) => element === videoKey) + 1
            ]
          ]
        );

        setvideoUrl(
          sublessonVideoObject[
            sublessonIdArray[
              sublessonIdArray.findIndex((element) => element === videoKey) + 1
            ]
          ]
        );
        boxRef.current.scrollIntoView({ behavior: "smooth" });
      }, 1000);
    } else if (action === "prev") {
      setVideoKey(
        sublessonIdArray[
          sublessonIdArray.findIndex((element) => element === videoKey) - 1
        ]
      );

      localStorage.setItem(
        "videoKey",
        sublessonIdArray[
          sublessonIdArray.findIndex((element) => element === videoKey) - 1
        ]
      );
      localStorage.setItem(
        "sublessonID",
        sublessonIdArray[
          sublessonIdArray.findIndex((element) => element === videoKey) - 1
        ]
      );

      setVideoHead(
        sublessonNameObject[
          sublessonIdArray[
            sublessonIdArray.findIndex((element) => element === videoKey) - 1
          ]
        ]
      );

      localStorage.setItem(
        "videoHead",
        sublessonNameObject[
          sublessonIdArray[
            sublessonIdArray.findIndex((element) => element === videoKey) - 1
          ]
        ]
      );

      setvideoUrl(
        sublessonVideoObject[
          sublessonIdArray[
            sublessonIdArray.findIndex((element) => element === videoKey) - 1
          ]
        ]
      );
      boxRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  console.log(sublessonIdArray);
  const handleShowVideo = (sublessonName, sublessonID) => {
    setIsShowAsm(false);
    localStorage.setItem("isShowAsm", false);
    setIsShowVdo(false);
    localStorage.setItem("isShowVdo", false);
    setTimeout(() => {
      setVideoHead(sublessonName);
      localStorage.setItem("sublessonName", sublessonName);
      setVideoKey(sublessonID);
      localStorage.setItem("sublessonID", sublessonID);
      localStorage.setItem("videoKey", sublessonID);
      setvideoUrl(sublessonVideoObject[sublessonID]);
      localStorage.setItem("videoUrl", sublessonVideoObject[sublessonID]);
      setPauseTime(0);
      localStorage.setItem("pauseTime", 0);
      setIsShowVdo(true);
      localStorage.setItem("isShowVdo", true);
    }, 500);
  };

  const handlePause = (pauseTime) => {
    console.log(pauseTime);
    //**set pause time and update database
  };
  const handleEnd = () => {
    setIsShowAsm(true);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get("http://localhost:4000/learn/", {
          params: { userID: 172, courseID: 20 },
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

        setLoading(false); // Data has been loaded
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className='flex justify-center pt-[100px] px-[160px]'>
        <div className='flex flex-col w-[360px] mr-[24px] px-6 py-8 shadow-[4px_4px_24px_0px_rgba(0,0,0,0.08)]'>
          <div className=''>
            <h1 className='Body3 text-[--orange500] mb-6'>Course</h1>
            <h1 className='H3 mb-2'>{courseData.course_name}</h1>
            <h1 className='Body2 text-[--gray700] mb-6 leading-8'>
              {courseData.course_detail}
            </h1>
          </div>
          <div className='mb-6'>
            <h1 className='Body2 text-[--gray700] mb-2'>{100}% Complete</h1>
            <div className='w-full h-[10px] bg-[--gray300] rounded-full'>
              <div className={`w-[12%] h-full Linear1 rounded-full`}></div>
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
                    <Typography>
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
                        {
                          /* setTotalLesson(totalLesson + 1) */
                        }

                        return (
                          <label
                            key={index}
                            id={sublesson.sublesson_id}
                            className='flex items-center px-2 py-3 cursor-pointer hover:bg-[--gray300] active:bg-[--gray500]'
                            onClick={() => {
                              handleShowVideo(
                                sublesson.sublesson_name,
                                sublesson.sublesson_id
                              );
                            }}>
                            <div className='mr-4 h-[20px]'>
                              <SublessonIcon
                                userID={userID}
                                sublessonID={sublesson.sublesson_id}
                                // totalLesson={totalLesson} setTotalLesson={setTotalLesson}
                                // totalCompleted={totalCompleted} setTotaCompleted={setTotaCompleted}
                                // setPercentCompleted={setPercentCompleted}
                              />
                            </div>
                            <h1 className='Body3 text-[--gray700]'>
                              {sublesson.sublesson_name}
                            </h1>
                            {/* <input type='radio' htmlFor={sublesson.sublesson_id} name='lesson' className=' checked:bg-red-500' /> */}
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

        <div className='flex flex-col w-full' ref={boxRef}>
          <div className='mb-20'>
            <div className='h-[90px]'>
              <h1 className='H2'>
                {videoHead || localStorage.getItem("sublessonName")}
              </h1>
            </div>
            {isShowVdo || localStorage.getItem("isShowVdo") ? (
              <div className='w-full'>
                <h1 className='H3'>
                  VDO: {localStorage.getItem("sublessonID")}
                </h1>
                <div className='rounded-lg overflow-hidden '>
                  <ReactPlayer
                    ref={playerRef}
                    url={videoUrl || localStorage.getItem("videoUrl")}
                    width='100%'
                    height='100%'
                    controls={true}
                    // light={true}
                    // light={videoThumbnail}
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
                    start={33}
                    // progressInterval={progressTime}
                    onPlay={() => {
                      playerRef.current.seekTo(pauseTime, "seconds");
                    }}
                    playing={true}
                    onPause={(e) => handlePause(e.target.currentTime)}
                    onEnded={handleEnd}
                  />
                </div>
              </div>
            ) : null}
          </div>
          {isShowAsm || localStorage.getItem("isShowAsm") ? (
            <AssignmentBox />
          ) : // <div className='mb-20 bg-[--blue100] h-[300px] p-6 rounded-lg'>
          //   <div className='flex justify-between'>
          //     <h1 className='Body1 mb-6'>Assigment</h1>
          //     <div className='Body2 h-fit px-2 py-1 rounded text-[#0A7B60] bg-[#DDF9EF]'>
          //       status
          //     </div>
          //   </div>
          //   <h1 className='Body2 mb-1'>Question ?</h1>
          //   <div className='bg-white w-full h-[100px] mb-6 p-3 rounded-lg'>
          //     <h1 className='Body2 text-[--gray600]'>Answer...</h1>
          //   </div>
          //   <div className='flex justify-between items-center'>
          //     <button className='text-white border-none bg-[--blue500] px-8 py-[18px] rounded-xl'>
          //       Send Assignment
          //     </button>
          //     <h1 className='Body2 text-[--gray700]'>Assign within 2 days</h1>
          //   </div>
          // </div>
          null}
        </div>
      </div>
      <div className='Shadow1 flex justify-between px-[60px] py-[20px]'>
        {sublessonIdArray.findIndex(
          (element) => element === localStorage.getItem("sublessonID")
        ) > 0 || true ? (
          <button
            className='bg-white p-[20px] border-none text-[16px] text-[--blue500] font-bold cursor-pointer hover:text-[--blue300] duration-300'
            onClick={() => handleLesson("prev")}>
            Previous Lesson
          </button>
        ) : (
          <div></div>
        )}
        {sublessonIdArray.findIndex(
          (element) => element === localStorage.getItem("sublessonID")
        ) <
          sublessonIdArray.length - 1 || true ? (
          <button
            className='Primary border-none cursor-pointer'
            onClick={() => handleLesson("next")}>
            Next Lesson
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default Learning;
