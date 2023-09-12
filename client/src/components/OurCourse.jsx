import CourseItem from "./CourseItem";
import "./ourCourse.css";
// import { courseData } from "../assets/courseData.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

function OurCourse() {
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
          "http://localhost:4000/ourcourse/courses",
          {
            params: { keywords },
          }
        );
        const data = response.data.data;
        setDataCourse(data);
        setLoading(false);
      } catch (error) {
        message: error;
      }
    };

    getCourseByKeywords(searchKey);
  }, [searchKey]);
  const handleSearch = (event) => {
    setSearchKey(event.target.value);
  };
  /////////////////////////////////////////////////
  console.log(`dataCourse:${dataCourse}`);
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
              // onClick={() => navigate(`/ourcourse/coursedetail/${item.course_id}`)}
              key={item.course_id}
              count={item.course_id}
              coverimg={item.cover_img}
              coursename={item.course_name}
              coursedetail={item.course_detail}
              coursesummary={item.course_summary}
              totallearningtime={item.total_time}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default OurCourse;
