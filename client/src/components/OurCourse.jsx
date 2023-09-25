import CourseItem from "./CourseItem";
import "./ourCourse.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularIndeterminate from "../assets/loadingProgress";
function OurCourse() {
  const navigate = useNavigate();
  const [dataCourse, setDataCourse] = useState([]);
  const [searchKey, setSearchKey] = useState(""); //searchKeyword
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  async function getDataCourse() {
    try {
      const result = await axios.get(`http://localhost:4000/ourcourse`);
      setDataCourse(result.data.data);
      setIsLoading(false);
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
  const pageSize = 9;
  const totalPages = Math.ceil(dataCourse?.length / pageSize);
  // const totalPages = Math.ceil(dataCourse.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  // const cardCourseToDisplay =
  //   dataCourse.length === 0 ? [] : dataCourse.slice(startIndex, endIndex);
  const cardCourseToDisplay = dataCourse.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  /////////////////////////////////////////////////
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-[100%] min-h-[100vh] text-black">
        <h1> Loading...</h1>
        <CircularIndeterminate />
      </div>
    );
  }

  return (
    <div className="canvas-ourCourse ">
      {window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
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
          {cardCourseToDisplay.map((item) => (
            <CourseItem
              key={item.course_id}
              count={item.course_id}
              coverimg={item.cover_img}
              coursename={item.course_name}
              coursedetail={item.course_detail}
              coursesummary={item.course_summary}
              totallearningtime={item.total_time}
              onClick={() => {
                navigate(`/ourcourse/coursedetail/${item.course_id}`);
              }}
            />
          ))}
        </div>
        <div className="pagination-card">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`paginationOurCourse-item ${
                currentPage === index + 1 ? "active" : ""
              }`}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default OurCourse;
