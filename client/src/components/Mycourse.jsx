import React from "react";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import CourseCard from "./myCourseComponent/CourseCard";
import { useState, useEffect } from "react";
import axios from "axios";

function MyCourse() {
  const [dataCourse, setDataCourse] = useState([]);
  const [allCourse, setAllCourse] = useState(true);
  const [inprogress, setInprogress] = useState(false);
  const [complete, setComplete] = useState(false);
  const [userName, setUserName] = useState("");
  // const { userID } = useAuth();
  const [userID, setUserID] = useState(172); //122,172,130
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
        const username = newDataCourse[0].register.full_name;
        const avatar = newDataCourse[0].register.image_url;
        setUserName(username);
        SetAvatar(avatar);
        let inProgressCount = 0;
        let completeCount = 0;
        newDataCourse.forEach((course) => {
          if (course.coursestatus === false) {
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
      <div className="grid grid-cols-2 gap-x-[26px] gap-y-[40px]">
        {dataCourse.map((item) => (
          <CourseCard
            key={item.course.course_id}
            count={item.course.course_id}
            coverimg={item.course.coverimg}
            coursename={item.course.coursename}
            coursedetail={item.course.coursedetail}
            coursesummary={item.course.coursesummary}
            totallearningtime={item.course.totallearningtime}
          />
        ))}
      </div>
    );
  }

  function Inprogress() {
    const inProgressCourses = dataCourse.filter((item) => !item.coursestatus);

    return (
      <div className="grid grid-cols-2 gap-x-[26px] gap-y-[40px]">
        {inProgressCourses.map((item) => (
          <CourseCard
            key={item.course.course_id}
            count={item.course.course_id}
            coverimg={item.course.coverimg}
            coursename={item.course.coursename}
            coursedetail={item.course.coursedetail}
            coursesummary={item.course.coursesummary}
            totallearningtime={item.course.totallearningtime}
          />
        ))}
      </div>
    );
  }
  function Complete() {
    const completeCourses = dataCourse.filter((item) => item.coursestatus);

    return (
      <div className="grid grid-cols-2 gap-x-[26px] gap-y-[40px]">
        {completeCourses.map((item) => (
          <CourseCard
            key={item.course.course_id}
            count={item.course.course_id}
            coverimg={item.course.coverimg}
            coursename={item.course.coursename}
            coursedetail={item.course.coursedetail}
            coursesummary={item.course.coursesummary}
            totallearningtime={item.course.totallearningtime}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="w-[100%] flex flex-col justify-center items-center mt-[100px] mb-[200px]">
      <div className="flex flex-col items-center justify-center ">
        <h2 className="H2">My Course</h2>
        <div className="flex flex-row mt-[60px]">
          <Stack direction="row" spacing={2} className="">
            <Paper>
              <MenuList className="flex fle-row">
                <MenuItem onClick={handleAllCourse}>All Course</MenuItem>
                <MenuItem onClick={handleInprogress}>Inprogress</MenuItem>
                <MenuItem onClick={handleComplete}>Complete</MenuItem>
              </MenuList>
            </Paper>
          </Stack>
          {/* <a className="Body2 p-[8px] m-[8px]">All Course</a>
          <a className="Body2 p-[8px] m-[8px]">Inprogress</a>
          <a className="Body2 p-[8px] m-[8px]">Complete</a> */}
        </div>
      </div>
      <div className="flex flex-row mt-[40px]">
        <div className="flex flex-col w-[357px] h-fit Shadow2 px-[24px] py-[32px] content-center items-center mr-[24px] rounded-lg">
          <Avatar alt="" src={avatar} sx={{ width: 120, height: 120 }} />
          <h2 className="my-[24px]">{userName}</h2>
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
