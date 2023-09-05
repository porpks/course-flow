import CourseItem from "./CourseItem";
import "./ourCourse.css";
// import { courseData } from "../assets/courseData.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

function OurCourse() {
  const [dataCourse, setDataCourse] = useState([]);
  const [searchKey, setSearchKey] = useState(""); //searchKeyword

  useEffect(() => {
    getDataCourse();
  }, []);
  ///////////// useEfffect for searchKeyword
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
  async function getDataCourse() {
    try {
      const result = await axios.get(`http://localhost:4000/ourcourse`);
      // console.log(result.data.data);
      setDataCourse(result.data.data);
    } catch (error) {
      message: error;
    }
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
              coverimg={item.coverimg}
              coursename={item.coursename}
              coursedetail={item.coursedetail}
              coursesummary={item.coursesummary}
              totallearningtime={item.totallearningtime}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default OurCourse;
