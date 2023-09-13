import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./courseDetail.css";
import Collapsible from "../assets/Collapsible.jsx";
import Mymodal from "../components/Mymodal";
import { Hidden } from "@mui/material";
import axios from "axios";
import ReactPlayer from "react-player";
import CircularIndeterminate from "../assets/loadingProgress";
// import ExampleComponent from "../assets/test/ParamTest";
import { useParams } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "480px",
  backgroundColor: "white",
  boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.2)",
  padding: "16px",
};

function CourseDetail() {
  const navigate = useNavigate();
  const [desireToggle, setDesireToggle] = useState(false);
  const openDesire = () => setDesireToggle(true);
  const closeDesire = () => setDesireToggle(false);

  const [subscribeToggle, setSubscribeToggle] = useState(false);
  const openSubscribe = () => setSubscribeToggle(true);
  const closeSubscribe = () => setSubscribeToggle(false);

  const [dataCourse, setDataCourse] = useState([]);

  async function getDetailCourse() {
    try {
      const dataDetailCourse = await axios.get(
        `http://localhost:4000/coursedetail`
      );
      setDataCourse(dataDetailCourse.data.data);
      // console.log(dataDetailCourse.data.data);
    } catch (error) {
      message: error;
      console.log(error);
    }
  }
  // console.log(dataCourse);
  useEffect(() => {
    getDetailCourse();
  }, []);

  const handlePause = (pauseTime) => {
    // console.log(pauseTime);
    // setProgressTime(pauseTime);
    // playerRef.current.seekTo(currentTime, 'seconds');
  };
  const handleEnd = () => {
    setIsShowAsm(true);
  };

  const dataDetail = dataCourse;

  // console.log(`dataDetail: ${dataDetail[0]}`);
  if (dataCourse.length === 0) {
    return (
      <div className="flex justify-center items-center absolute top-[150px] w-[100%] h-[100vh] text-slate-100">
        <h1> Loading...</h1>
        <CircularIndeterminate />
      </div>
    );
  }

  const param = useParams();
  const courseID = Number(param.id) - 1;

  return (
    <>
      <section
        className="flex justify-center items-center border-2 border-sky-500"
      >
        <div className="canvas_CourseDetail ">
          <div className="back-btn">
            <a
              onClick={() => {
                navigate("/ourcourse");
              }}
              className="flex flex-row justify-start items-center px-[8px] py-[4px] gap-[8px] cursor-pointer"
            >
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
                  light={true}
                  playIcon={
                    <svg
                      className="min-h-[460px]"
                      xmlns="http://www.w3.org/2000/svg"
                      width="104"
                      height="104"
                      viewBox="0 0 104 104"
                      fill="none"
                    >
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
                  start={33}
                  // progressInterval={progressTime}
                  // onPlay={handlePlay}
                  onPause={(e) => handlePause(e.target.currentTime)}
                  onEnded={handleEnd}
                />
              </div>

              <div className="CourseDetail_description flex flex-col gap-[24px]">
                <div className="courseDetail_title ">
                  <p className="H2">{dataCourse[courseID].course_name}</p>
                </div>
                <div className="courseDetail_body">
                  <p className="Body2">{dataCourse[courseID].course_detail}</p>
                </div>
              </div>
              <div className="lesson_sample">
                <p className="H2 text-[--black] mb-[24px]">Module Samples</p>
                <div className="collapsible-contents">
                  <Collapsible
                    title="Introduction"
                    content="This is the content 01"
                  />
                </div>
              </div>
            </div>

            <div className="Subscribe_box Shadow1">
              <div>
                <p className="Body3 text-[--orange500]">Course</p>
              </div>
              <div className="course-Subscribe flex flex-col gap-[8px]">
                <p className="course-title H3">Service Design Essentials</p>
                <p className="course-description Body2 text-[--gray700]">
                  Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.
                </p>
              </div>
              <div className="course-price  H3 text-[--gray700] flex flex-row justify-center items-center">
                <p className="mr-[1rem]">THB</p>
                <p>3,559.00</p>
              </div>
              <div className="btn-grp">
                <button onClick={openDesire} className="Secondary w-[100%]">
                  Get in Desire Course
                </button>

                {desireToggle ? (
                  <Mymodal
                    open={desireToggle}
                    onClose={closeDesire}
                    closeButton={closeDesire}
                    description="Do you sure to add Service Design Essentials to your desire Course?"
                    yesDes="Yes, add this to my desire course"
                    noDes="No, I don’t"
                  />
                ) : (
                  null
                )}
                {subscribeToggle ? (
                  <Mymodal
                    open={subscribeToggle}
                    onClose={closeSubscribe}
                    closeButton={closeSubscribe}
                    description="Do you sure to subscribe Service Design Essentials Course?"
                    yesDes="Yes, I want to subscribe"
                    noDes="No, I don’t"
                  />
                ) : (
                  null
                )}
                <button onClick={openSubscribe} className="Primary w-[100%]">
                  Subscribe This Course
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
