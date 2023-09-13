import React from "react";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import CourseCard from "./myCourseComponent/CourseCard";
import { useState, useEffect } from "react";
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
  const { userID } = useAuth();
  // const [userID, setUserID] = useState(172); //122,172,130
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [avatar, SetAvatar] = useState(0);

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

  useEffect(() => {
    getDataCourse();
  }, [userID]);

  const getDataCourse = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/mycourse/${userID}`
      );
      const newDataCourse = result.data.data;
      setDataCourse(newDataCourse);

      if (newDataCourse.length > 0) {
        const username = newDataCourse[0].users.full_name;
        const avatar = newDataCourse[0].users.image_url;
        setUserName(username);
        SetAvatar(avatar);
        let inProgressCount = 0;
        let completeCount = 0;
        newDataCourse.forEach((course) => {
          if (course.course_status === false) {
            // Course is in progress
            inProgressCount++;
          } else {
            // Course is complete
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

  function AllCourse() {
    return (
      <div className="grid grid-cols-2 gap-x-[26px] gap-y-[40px]  w-[740px]">
        {dataCourse.map((item) => (
          <CourseCard
            key={item.courses.course_id}
            // count={item.course.course_id}
            coverimg={item.courses.cover_img}
            coursename={item.courses.course_name}
            coursedetail={item.courses.course_detail}
            coursesummary={item.courses.course_summary}
            totallearningtime={item.courses.total_time}
          />
        ))}
      </div>
    );
  }

  function Inprogress() {
    const inProgressCourses = dataCourse.filter((item) => !item.coursestatus);
    return (
      <div className="grid grid-cols-2 gap-x-[26px] gap-y-[40px] w-[740px]">
        {inProgressCourses.map((item) => (
          <CourseCard
            key={item.courses.course_id}
            count={item.courses.course_id}
            coverimg={item.courses.cover_img}
            coursename={item.courses.course_name}
            coursedetail={item.courses.course_detail}
            coursesummary={item.courses.course_summary}
            totallearningtime={item.courses.total_time}
          />
        ))}
      </div>
    );
  }
  function Complete() {
    const completeCourses = dataCourse.filter((item) => item.coursestatus);

    return (
      <div className="grid grid-cols-2 gap-x-[26px] gap-y-[40px]  w-[740px]">
        {completeCourses.map((item) => (
          <CourseCard
            key={item.courses.course_id}
            count={item.courses.course_id}
            coverimg={item.courses.cover_img}
            coursename={item.courses.course_name}
            coursedetail={item.courses.course_detail}
            coursesummary={item.courses.course_summary}
            totallearningtime={item.courses.total_time}
          />
        ))}
      </div>
    );
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
          <circle cx="5.5" cy="5.5" r="4" stroke="#2F5FAC" stroke-width="3" />
        </svg>
      </div>
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
            <circle cx="5.5" cy="5.5" r="4" stroke="#2F5FAC" stroke-width="3" />
          </svg>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <h2 className="H2">My Course</h2>
          <div className="flex flex-row mt-[60px]">
            <Stack direction="row" spacing={2} className="">
              <Paper>
                <MenuList className="flex fle-row">
                  <MenuItem
                    style={{ backgroundColor: "red" }}
                    onClick={handleAllCourse}
                  >
                    All Course
                  </MenuItem>
                  <MenuItem onClick={handleInprogress}>Inprogress</MenuItem>
                  <MenuItem onClick={handleComplete}>Complete</MenuItem>
                </MenuList>
              </Paper>
            </Stack>
          </div>
        </div>
        <div className="flex flex-row mt-[40px]  ">
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
    </div>
  );
}

export default MyCourse;
