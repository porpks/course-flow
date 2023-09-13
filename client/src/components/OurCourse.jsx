import CourseItem from "./CourseItem";
import "./ourCourse.css";
// import { courseData } from "../assets/courseData.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OurCourse() {
  const navigate = useNavigate();
  const [dataCourse, setDataCourse] = useState([]);
  const [searchKey, setSearchKey] = useState(""); //searchKeyword

  async function getDataCourse() {
    try {
      const result = await axios.get(`http://localhost:4000/ourcourse`);
      setDataCourse(result.data.data);
    } catch (error) {
      message: error;
    }
  }
  useEffect(() => {
    getDataCourse();
  }, []);
  ///////////// useEffect for searchKeyword
  useEffect(() => {
    const getCourseByKeywords = async (keywords) => {
      try {
        const response = await axios.get(
          "http://localhost:4000/ourcourse/course",
          {
            params: { keywords },
          }
        );

        const data = response.data.data;
        setDataCourse(data);
      } catch (error) {
        // message: error;
        console.log(error);
      }
    };
    getCourseByKeywords(searchKey);
  }, [searchKey]);

  const handleSearch = (event) => {
    setSearchKey(event.target.value);
  };
  /////////////////////////////////////////////////
  // console.log(`dataCourse:${dataCourse[0].course_id}`);
  if (dataCourse.length === 0) {
    return (
      <div className="flex justify-center items-center absolute top-[150px] w-[100%] h-[100vh] text-slate-100">
        <h1> Loading...</h1>
      </div>
    );
  }
  return (
    <div className="canvas-ourCourse">
      <div className="topSection">
        <h2 className="H2">Our Courses</h2>
        <div className="input-container">
          <img src="../../public/image/search.svg" alt="searchIcon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchKey}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="content-Section">
        <div className="card-container">
          {dataCourse.map((item) => (
            <CourseItem
              key={item.course_id}
              count={item.course_id}
              coverimg={item.cover_img}
              coursename={item.course_name}
              coursedetail={item.course_detail}
              coursesummary={item.course_summary}
              totallearningtime={item.total_time}
              // link = {`/ourcourse/coursedetail/${item.course_id}`}
              onClick={() => {
                navigate(`/ourcourse/coursedetail/${item.course_id}`);
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
              // href="#homepage"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default OurCourse;
