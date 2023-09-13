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
import { v4 as uuidv4 } from "uuid";

function CourseDetail() {
  const navigate = useNavigate();
  const [desireToggle, setDesireToggle] = useState(false);
  const openDesire = () => setDesireToggle(true);
  const closeDesire = () => setDesireToggle(false);

  const [subscribeToggle, setSubscribeToggle] = useState(false);
  const openSubscribe = () => setSubscribeToggle(true);
  const closeSubscribe = () => setSubscribeToggle(false);

  const [dataCourse, setDataCourse] = useState([]);
  const param = useParams();
  // console.log(param);
  async function getDetailCourse() {
    try {
      const dataDetailCourse = await axios.get(
        `http://localhost:4000/coursedetail/${param.id}`
      );
      const data = dataDetailCourse.data.data;
      // console.log(data);
      setDataCourse(data);
    } catch (error) {
      // console.error(error);
    }
  }

  const dataDetail = dataCourse;

  useEffect(() => {
    getDetailCourse();
  }, []);

  // console.log(`dataDetail: ${dataDetail[0]}`);
  if (dataCourse.length === 0) {
    return (
      <div className="flex justify-center items-center absolute top-[150px] w-[100%] h-[100vh] text-slate-100">
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
      <section className="flex justify-center items-center border-2 border-sky-500">
        <div className="canvas_CourseDetail ">
          <div className="back-btn">
            <a
              onClick={() => {
                navigate("/ourcourse");
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
                  <p className="H2">{dataCourse.course_name}</p>
                </div>
                <div className="courseDetail_body">
                  <p className="Body2">{dataCourse.course_detail}</p>
                </div>
              </div>
              <div className="lesson_sample">
                <p className="H2 text-[--black] mb-[24px]">Module Samples</p>
                <div className="collapsible-contents H3">
                  {lessonTotal.map((item, index) => (
                    <Collapsible
                      key={uuidv4()}
                      number={index < 10 ? "0" + (index + 1) : index + 1}
                      title={item.lesson_name}
                      content={item.sublessons}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="Subscribe_box Shadow1">
              <div>
                <p className="Body3 text-[--orange500]">Course</p>
              </div>
              <div className="course-Subscribe flex flex-col gap-[8px]">
                <p className="course-title H3">{dataDetail.course_name}</p>
                <p className="course-description Body2 text-[--gray700]">
                  {dataDetail.course_detail.slice(0, 65)}
                </p>
              </div>
              <div className="course-price  H3 text-[--gray700] flex flex-row justify-center items-center">
                <p className="mr-[1rem]">THB</p>
                <p>{coursePrice}</p>
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
                    noOnClcik={closeDesire}
                  />
                ) : null}
                {subscribeToggle ? (
                  <Mymodal
                    open={subscribeToggle}
                    onClose={closeSubscribe}
                    closeButton={closeSubscribe}
                    description="Do you sure to subscribe Service Design Essentials Course?"
                    yesDes="Yes, I want to subscribe"
                    noDes="No, I don’t"
                    noOnClcik={closeSubscribe}
                  />
                ) : null}
                <button
                  onClick={openSubscribe}
                  className="Primary w-[100%] border-none">
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
