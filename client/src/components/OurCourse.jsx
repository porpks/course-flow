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
  const [isLoading, setIsLoading] = useState(true);

  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(9);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxpage] = useState(9);

  async function getDataCourse() {
    try {
      const result = await axios.get(
        `http://localhost:4000/ourcourse?course=${""}&start=${start}&end=${end}`
      );
      setDataCourse(result.data.data);
      setMaxpage(Math.ceil(result.data.count / 9));
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  const getCourseByKeywords = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/ourcourse?course=${searchKey}&start=${start}&end=${end}`
      );
      setDataCourse(response.data.data);
      setMaxpage(Math.ceil(response.data.count / 9));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchKey) {
      getCourseByKeywords();
    } else {
      getDataCourse();
    }
  }, [page, searchKey]);

  const handleSearch = (event) => {
    setSearchKey(event.target.value);
    setStart(1);
    setEnd(9);
    setPage(1);
  };

  /////////////////////////////////////////////////

  const changeUpperPage = () => {
    let newStart = start + 9;
    let newEnd = end + 9;
    let newPage = page + 1;
    setStart(newStart);
    setEnd(newEnd);
    setPage(newPage);
  };

  const changeLowerPage = () => {
    if (start > 1) {
      let newStart = start - 9;
      let newEnd = end - 9;
      let newPage = page - 1;
      setStart(newStart);
      setEnd(newEnd);
      setPage(newPage);
    }
  };

  /////////////////////////////////////////////////
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-[100%] gap-8 min-h-[100vh] text-black">
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
        <div className="content-Section">
          {dataCourse?.length <= 0 ? (
            <h1 className="H2 text-red-500 ">{`No course found matching "${searchKey}"`}</h1>
          ) : (
            <div className="card-container">
              {dataCourse?.map((item) => (
                <CourseItem
                  key={item.course_id}
                  count={item.course_id}
                  coverimg={item.cover_img}
                  coursename={item.course_name}
                  coursedetail={item.course_detail}
                  coursesummary={item.lessons.length}
                  totallearningtime={item.total_time}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/ourcourse/coursedetail/${item.course_id}`);
                    window.scrollTo(0, 0);
                  }}
                />
              ))}
            </div>
          )}
          {maxPage > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-6 self-center">
              <button
                className={`border-none px-4 py-2 bg-blue-800  hover:bg-blue-600 text-white font-semibold rounded-full focus:outline-none flex items-center
              cursor-pointer	}`}
                onClick={page > 1 ? changeLowerPage : undefined}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline-block mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Prev
              </button>
              <span className="text-gray-600 text-lg">
                Page {page} / {maxPage}
              </span>
              <button
                className={`border-none px-4 py-2 bg-blue-800  hover:bg-blue-600 text-white font-semibold rounded-full focus:outline-none flex items-center cursor-pointer`}
                onClick={maxPage <= page ? undefined : changeUpperPage}>
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline-block ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default OurCourse;
