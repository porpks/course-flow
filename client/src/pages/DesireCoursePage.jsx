import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseItem from "../components/CourseItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CircularIndeterminate from "../assets/loadingProgress";

function DesireCoursePage() {
  const { userId } = useAuth();
  const navigate = useNavigate();

  const [desireData, setDesireData] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(9);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxpage] = useState(9);

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

  const getDataDesireCourse = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/desire/${userId}?start=${start}&end=${end}`
      );
      const newDataCourse = result.data.data;
      setMaxpage(Math.ceil(result.data.count / 9));
      setDesireData(newDataCourse);
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDataDesireCourse();
  }, [page]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-[100%] min-h-[100vh] gap-8 text-black">
        <h1>Loading...</h1>
        <CircularIndeterminate />
      </div>
    );
  }
  return (
    <>
      <Navbar />
      {/* <div className="relative flex justify-center items-center w-[100%]"> */}
      <div className="relative flex justify-center items-center w-[99.7%]">
        <div className="flex flex-col items-center w-[1440px] pb-[200px]">
          <div className="absolute left-[102px] top-[100px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none">
              <circle
                cx="5.5"
                cy="5.5"
                r="4"
                stroke="#2F5FAC"
                strokeWidth="3"
              />
            </svg>
          </div>

          <div className="absolute left-[43px] top-[159px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none">
              <circle cx="13.1741" cy="13.1741" r="13.1741" fill="#C6DCFF" />
            </svg>
          </div>

          <div className="absolute right-[-5px] top-[216px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="53"
              height="74"
              viewBox="0 0 53 74"
              fill="none">
              <circle cx="37" cy="37" r="37" fill="#C6DCFF" />
            </svg>
          </div>

          <div className="absolute right-[126.22px] top-[126px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="51"
              height="51"
              viewBox="0 0 51 51"
              fill="none">
              <path
                d="M11.3581 19.9099L37.1499 15.9774L27.6597 40.28L11.3581 19.9099Z"
                stroke="#FBAA1C"
                strokeWidth="3"
              />
            </svg>
          </div>
          <h2 className="H2 pt-[100px] pb-[72px]">Desire Course</h2>
          {isLoading && (
            <div className="text-center">
              <p className="Body1 text-center text-[#646D89]">Loading.. </p>
            </div>
          )}
          {!isLoading && desireData.length === 0 && (
            <div className="text-center h-[200px]">
              <p className="Body1 text-center text-[#646D89]">
                You haven't added any desired courses yet
              </p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-x-[24px] gap-y-[40px]">
            {desireData.map((item, index) => (
              <CourseItem
                key={index}
                coverimg={item.courses.cover_img}
                coursename={item.courses.course_name}
                coursedetail={item.courses.course_detail}
                coursesummary={item.courses.lessons.length}
                totallearningtime={item.courses.total_time}
                onClick={() => {
                  navigate(`/ourcourse/coursedetail/${item.course_id}`);
                  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                }}
              />
            ))}
          </div>
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
      <Footer />
    </>
  );
}

export default DesireCoursePage;
