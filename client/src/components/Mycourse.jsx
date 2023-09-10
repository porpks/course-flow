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

  function handleAllCourse() {
    setAllCourse(true);
    setInprogress(false);
    setComplete(false);
    console.log("allCourse");
    return;
  }
  function handleInprogress() {
    setAllCourse(false);
    setInprogress(true);
    setComplete(false);
    console.log("inprogress");
    return;
  }
  function handleComplete() {
    setAllCourse(false);
    setInprogress(false);
    setComplete(true);
    console.log("complete");
    return;
  }

  useEffect(() => {
    getDataCourse();
  }, []);

  const getDataCourse = async () => {
    try {
      const result = await axios.get(`http://localhost:4000/ourcourse`);
      console.log(result.data.data);
      setDataCourse(result.data.data);
    } catch (error) {
      message: error;
    }
  };
  const getDataAllCourse = async () => {
    try {
      const result = await axios.get(`http://localhost:4000/ourcourse`);
      console.log(result.data.data);
      setDataCourse(result.data.data);
    } catch (error) {
      message: error;
    }
  };

  function AllCourse() {
    return (
      <div className="grid grid-cols-2 gap-x-[26px] gap-y-[40px]">
        <p>AllCourse</p>
        {dataCourse.map((item) => (
          <CourseCard
            key={item.course_id}
            count={item.course_id}
            coverimg={item.coverimg}
            coursename={item.coursename}
            coursedetail={item.coursedetail}
            coursesummary={item.coursesummary}
            totallearningtime={item.totallearningtime}
          />
        ))}
      </div>
    );
  }

  function Inprogress() {
    return (
      <div className="grid grid-cols-2 gap-x-[26px] gap-y-[40px]">
        <p>Inprogress</p>
        {dataCourse.map((item) => (
          <CourseCard
            key={item.course_id}
            count={item.course_id}
            coverimg={item.coverimg}
            coursename={item.coursename}
            coursedetail={item.coursedetail}
            coursesummary={item.coursesummary}
            totallearningtime={item.totallearningtime}
          />
        ))}
      </div>
    );
  }
  function Complete() {
    return (
      <div className="grid grid-cols-2 gap-x-[26px] gap-y-[40px]">
        <p>Complete</p>
        {dataCourse.map((item) => (
          <CourseCard
            key={item.course_id}
            count={item.course_id}
            coverimg={item.coverimg}
            coursename={item.coursename}
            coursedetail={item.coursedetail}
            coursesummary={item.coursesummary}
            totallearningtime={item.totallearningtime}
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
          <Avatar alt="" src="" sx={{ width: 120, height: 120 }} />
          <h2 className="my-[24px]">Max Mayfield</h2>
          <div className="flex flex-row ">
            <div className="flex flex-col justify-between p-[16px] w-[142.5px] h-[134px] bg-[--gray200] mx-[12px]">
              <p className="Body2">Course Inprogress</p>
              <p className="H3"> 3</p>
            </div>
            <div className="flex flex-col justify-between p-[16px] w-[142.5px] h-[134px] bg-[--gray200] mx-[12px]">
              <p className="Body2">Course Complete</p>
              <p className="H3">2</p>
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
