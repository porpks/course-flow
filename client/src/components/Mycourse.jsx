import Avatar from "@mui/material/Avatar";
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

function MyCourse() {
  const [dataCourse, setDataCourse] = useState([]);
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

  console.log(userId);
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
          if (course.course_status === false) {
            inProgressCount++;
          } else {
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
      if (data.length > 0) {
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
          setPauseTime(
            data[0].sublesson_video_timestop === null
              ? 0
              : data[0].sublesson_video_timestop
          );
          localStorage.setItem(
            "pauseTime",
            data[0].sublesson_video_timestop === null
              ? 0
              : data[0].sublesson_video_timestop
          );
          setvideoUrl(data[0].sublesson_video);
          localStorage.setItem("videoUrl", data[0].sublesson_video);
          localStorage.setItem("nonepause", false);
        };
        handleShowVideo(data[0].sublesson_name, data[0].sublesson_id);
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
      <div className='grid grid-cols-2 gap-x-[26px] gap-y-[40px] w-[740px]'>
        {dataCourse.map((item) => (
          <div
            key={item.courses.course_id}
            onClick={() => {
              setCheckOnClick((q) => !q);
              localStorage.removeItem("course_id");
              localStorage.setItem("course_id", item.courses.course_id);
              getDataCourse2();
            }}>
            <Link
              key={item.courses.course_id}
              to={`/learning/${localStorage.getItem("course_id")}`} // Define the route you want to navigate to
            >
              <CourseCard
                key={item.courses.course_id}
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
        <div className='grid grid-cols-2 gap-x-[26px] gap-y-[40px] w-[740px]'>
          {inProgressCourses.map((item) => (
            <Link
              key={item.courses.course_id}
              to={`/learning/${item.courses.course_id}`}
              onClick={() => {
                setCheckOnClick((q) => !q);
                localStorage.removeItem("course_id");
                localStorage.setItem("course_id", item.courses.course_id);
                getDataCourse2();
              }} // Define the route you want to navigate to
            >
              <CourseCard
                key={item.courses.course_id}
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
        <div className='grid grid-cols-2 gap-x-[26px] gap-y-[40px]  w-[740px]'>
          {completeCourses.map((item) => (
            <Link
              key={item.courses.course_id}
              onClick={() => {
                setCheckOnClick((q) => !q);
                localStorage.removeItem("course_id");
                localStorage.setItem("course_id", item.courses.course_id);
                getDataCourse2();
              }}
              to={`/learning/${item.courses.course_id}`} // Define the route you want to navigate to
            >
              <CourseCard
                key={item.courses.course_id}
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
    <div className='w-[100%] flex flex-col justify-center items-center pt-[100px] mb-[200px] relative '>
      <div className='w-[100%] flex flex-col justify-center items-center pt-[100px] mb-[200px] relative '>
        <div className=' absolute right-0 top-[216px]'>
          <Ellipse5 className='top-1/2 absolute' style={{ top: "50%" }} />
        </div>
        <div className=' absolute right-[126.22px] top-[126px]'>
          <Polygon3 />
        </div>
        <div className=' absolute left-[280px] top-[232px]'>
          <Cross5 />
        </div>
        <div className=' absolute left-[43px] top-[159px]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='27'
            height='27'
            viewBox='0 0 27 27'
            fill='none'>
            <circle cx='13.1741' cy='13.1741' r='13.1741' fill='#C6DCFF' />
          </svg>
        </div>
        <div className=' absolute left-[102px] top-[100px]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='11'
            height='11'
            viewBox='0 0 11 11'
            fill='none'>
            <circle cx='5.5' cy='5.5' r='4' stroke='#2F5FAC' strokeWidth='3' />
          </svg>
        </div>
        <div className='flex flex-col items-center justify-center '>
          <h2 className='H2'>My Course</h2>
          <div className='flex flex-row mt-[60px]'>
            <Stack direction='row' spacing={2} className=''>
              <Paper>
                <MenuList className='flex fle-row'>
                  <MenuItem
                    style={{ backgroundColor: "red" }}
                    onClick={handleAllCourse}>
                    All Course
                  </MenuItem>
                  <MenuItem onClick={handleInprogress}>Inprogress</MenuItem>
                  <MenuItem onClick={handleComplete}>Complete</MenuItem>
                </MenuList>
              </Paper>
            </Stack>
          </div>
        </div>
        <div className='flex flex-row mt-[40px]  '>
          <div className='flex flex-col w-[357px] h-fit Shadow2 px-[24px] py-[32px] content-center items-center mr-[24px] rounded-lg  sticky top-0 '>
            <div className=''>
              <Avatar alt='' src={avatar} sx={{ width: 120, height: 120 }} />
              <h2 className='my-[24px]'>{userName}</h2>
            </div>
            <div className='flex flex-row '>
              <div className='flex flex-col justify-between p-[16px] w-[142.5px] h-[134px] bg-[--gray200] mx-[12px]'>
                <p className='Body2'>Course Inprogress</p>
                <p className='H3'>{inProgressCount}</p>
              </div>
              <div className='flex flex-col justify-between p-[16px] w-[142.5px] h-[134px] bg-[--gray200] mx-[12px]'>
                <p className='Body2'>Course Complete</p>
                <p className='H3'>{completeCount}</p>
              </div>
            </div>
          </div>
          {allCourse && <AllCourse />}
          {inprogress && <Inprogress />}
          {complete && <Complete />}
          {/* <div className="grid grid-cols-3 gap-x-[26px] gap-y-[40px]"></div> */}
        </div>
      </div>
    </div>
  );
}

export default MyCourse;
