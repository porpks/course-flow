import Avatar from "@mui/material/Avatar";
// import MenuItem from "@mui/material/MenuItem";
// import MenuList from "@mui/material/MenuList";
// import Stack from "@mui/material/Stack";
// import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import CourseCard from "./myCourseComponent/CourseCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext.jsx";
import Ellipse5 from "../assets/myCourseAssets/Ellipse5";
import Polygon3 from "../assets/myCourseAssets/Polygon3";
import Cross5 from "../assets/myCourseAssets/Cross5";
import { Button } from "@mui/base/Button";

function MyCourse() {
  const [dataCourse, setDataCourse] = useState([]);
  const [courseID, setCourseID] = useState(null);
  // const [status, setStatus] = useState(null)
  const [allCourse, setAllCourse] = useState(true);
  const [inprogress, setInprogress] = useState(false);
  const [complete, setComplete] = useState(false);
  const [userName, setUserName] = useState("");
  const [checkOnClick, setCheckOnClick] = useState(false);
  const {
    setIsShowVdo,
    setIsShowAsm,
    setVideoHead,
    setVideoKey,
    setPauseTime,
    userId,
    setvideoUrl,
  } = useAuth();
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [avatar, setAvatar] = useState(null);

  function handleAllCourse() {
    setAllCourse(true);
    setInprogress(false);
    setComplete(false);
    return;
  }
  function handleInprogress() {
    setAllCourse(false);
    setInprogress(true);
    setComplete(false);
    return;
  }
  function handleComplete() {
    setAllCourse(false);
    setInprogress(false);
    setComplete(true);
    return;
  }

  const getDataCourse = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/mycourse/${userId}`
      );
      const newDataCourse = result.data.data;
      setDataCourse(newDataCourse);

      if (newDataCourse.length > 0) {
        const username = newDataCourse[0].users.full_name;
        const avatar = newDataCourse[0].users.image_url;
        setUserName(username);
        setAvatar(avatar);

        let inProgressCount = 0;
        let completeCount = 0;

        newDataCourse.forEach((course) => {
          if (course.course_status === false || course.course_status === null) {
            inProgressCount++;
          } else if (
            course.course_status === true &&
            course.course_status !== null
          ) {
            completeCount++;
          }
        });

        setInProgressCount(inProgressCount);
        setCompleteCount(completeCount);
      } else {
        setUserName("No User Data Available");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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

      const result = await axios.get("http://localhost:4000/learn/videotime", {
        params: {
          userID: userId,
          courseID: localStorage.getItem("course_id"),
        },
      });
      const data = result.data.data;
      console.log(data);
      console.log(Object.keys(data).length > 0);
      if (Object.keys(data).length > 0) {
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
    getDataCourse();
    localStorage.removeItem("sublessonName");
    localStorage.removeItem("sublessonID");
    localStorage.removeItem("isShowVdo");
    localStorage.removeItem("isShowAsm");
    localStorage.removeItem("pauseTime");
    localStorage.removeItem("videoUrl");
    localStorage.removeItem("pauseTime");
    localStorage.removeItem("nonepause");
    localStorage.removeItem("videoKey");
    localStorage.removeItem("videoHead");
  }, [userId, checkOnClick]);

  function AllCourse() {
    return (
      <div className="grid grid-cols-2 gap-x-[26px] gap-y-[40px] w-[740px]">
        {dataCourse.map((item) => (
          <div
            key={item.courses.course_id}
            onClick={() => {
              setCheckOnClick((q) => !q);
              setCourseID(item.courses.course_id);
              localStorage.removeItem("course_id");
              localStorage.setItem("course_id", item.courses.course_id);
              getDataCourse2();
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
          >
            <Link
              className="no-underline"
              key={item.courses.course_id}
              to={`/learning/${item.courses.course_id}`} // Define the route you want to navigate to
            >
              <CourseCard
                key={item.courses.course_id}
                courseid={item.courses.course_id}
                coverimg={item.courses.cover_img}
                coursename={item.courses.course_name}
                coursedetail={item.courses.course_detail}
                coursesummary={item.courses.course_summary}
                totallearningtime={item.courses.total_time}
              />
            </Link>
          </div>
        ))}
      </div>
    );
  }

  function Inprogress() {
    if (dataCourse.length > 0) {
      const inProgressCourses = dataCourse.filter(
        (item) => !item.course_status
      );
      return (
        <div className="grid grid-cols-2 gap-x-[26px] gap-y-[40px] w-[740px]">
          {inProgressCourses.map((item) => (
            <Link
              className="no-underline"
              key={item.courses.course_id}
              to={`/learning/${item.courses.course_id}`}
              onClick={() => {
                setCheckOnClick((q) => !q);
                setCourseID(item.courses.course_id);
                localStorage.removeItem("course_id");
                localStorage.setItem("course_id", item.courses.course_id);
                getDataCourse2();
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }} // Define the route you want to navigate to
            >
              <CourseCard
                key={item.courses.course_id}
                courseid={item.courses.course_id}
                coverimg={item.courses.cover_img}
                coursename={item.courses.course_name}
                coursedetail={item.courses.course_detail}
                coursesummary={item.courses.course_summary}
                totallearningtime={item.courses.total_time}
              />
            </Link>
          ))}
        </div>
      );
    }
  }
  function Complete() {
    if (dataCourse.length > 0) {
      const completeCourses = dataCourse.filter((item) => item.course_status);
      return (
        <div className="grid grid-cols-2 gap-x-[26px] gap-y-[40px]  w-[740px]">
          {completeCourses.map((item) => (
            <Link
              className="no-underline"
              key={item.courses.course_id}
              onClick={() => {
                setCheckOnClick((q) => !q);
                setCourseID(item.courses.course_id);
                localStorage.removeItem("course_id");
                localStorage.setItem("course_id", item.courses.course_id);
                getDataCourse2();
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
              to={`/learning/${item.courses.course_id}`} // Define the route you want to navigate to
            >
              <CourseCard
                key={item.courses.course_id}
                courseid={item.courses.course_id}
                coverimg={item.courses.cover_img}
                coursename={item.courses.course_name}
                coursedetail={item.courses.course_detail}
                coursesummary={item.courses.course_summary}
                totallearningtime={item.courses.total_time}
              />
            </Link>
          ))}
        </div>
      );
    }
  }

  return (
    <div className="w-[100%] flex flex-col justify-center items-center pt-[100px] mb-[200px] relative ">
      <div className=" absolute right-0 top-[216px]">
        <Ellipse5 className="top-1/2 absolute" style={{ top: "50%" }} />
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
        {/* <div className="flex flex-row mt-[60px]">
            <Stack direction="row" spacing={2} className="">
              <Paper>
                <MenuList className="flex fle-row ">
                  <MenuItem
                    className="cursor-pointer "
                    style={{}}
                    onClick={handleAllCourse}
                  >
                    All Course
                  </MenuItem>
                  <MenuItem onClick={handleInprogress}>Inprogress</MenuItem>
                  <MenuItem onClick={handleComplete}>Complete</MenuItem>
                </MenuList>
              </Paper>
            </Stack>
          </div> */}
        <div className="justify-start items-start gap-4 inline-flex mt-[60px]">
          <div
            onClick={() => handleAllCourse("All")}
            className={`box-content cursor-pointer Component1 p-2 flex items-start gap-2 border-solid border-white border-b-2 hover:border-b-2 hover:border-solid hover:border-black border-t-0 border-r-0 border-l-0  m-0`}
          >
            <div className="Body2">All Course</div>
          </div>
          <div
            onClick={() => handleInprogress("All")}
            className={`box-content cursor-pointer Component1 p-2 flex items-start gap-2 border-solid border-white border-b-2 hover:border-b-2 hover:border-solid hover:border-black border-t-0 border-r-0 border-l-0  m-0`}
          >
            <div className="Body2">Inprogress</div>
          </div>
          <div
            onClick={() => handleComplete("All")}
            className={`box-content  cursor-pointer Component1 p-2 flex items-start gap-2 border-solid border-white border-b-2 hover:border-b-2 hover:border-solid hover:border-black border-t-0 border-r-0 border-l-0  m-0`}
          >
            <div className="Body2">Complete</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-[80px] ">
        <div className="flex flex-col w-[357px] h-fit Shadow2 px-[24px] py-[32px] content-center items-center mr-[24px] rounded-lg  sticky top-0 ">
          <div className="">
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
        </div>
        {allCourse && <AllCourse />}
        {inprogress && <Inprogress />}
        {complete && <Complete />}
        {/* <div className="grid grid-cols-3 gap-x-[26px] gap-y-[40px]"></div> */}
      </div>
    </div>
  );
}

export default MyCourse;
