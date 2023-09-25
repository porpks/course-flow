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
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsloading] = useState(false);

  const getDataDesireCourse = async () => {
    try {
      setIsloading(true);
      const result = await axios.get(`http://localhost:4000/desire/${userId}`);
      const newDataCourse = result.data;
      setDesireData(newDataCourse);
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const pageSize = 9;
  const totalPages = Math.ceil(desireData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const cardCourseToDisplay = desireData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  console.log(currentPage);
  useEffect(() => {
    getDataDesireCourse();
  }, []);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center w-[100%] min-h-[100vh] gap-8 text-black'>
        <h1>Loading...</h1>
        <CircularIndeterminate />
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <div className='relative flex justify-center w-[100%]'>
        <div className='flex flex-col items-center w-[1440px]'>
          <div className='absolute left-[102px] top-[100px]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='11'
              height='11'
              viewBox='0 0 11 11'
              fill='none'>
              <circle
                cx='5.5'
                cy='5.5'
                r='4'
                stroke='#2F5FAC'
                strokeWidth='3'
              />
            </svg>
          </div>

          <div className='absolute left-[43px] top-[159px]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='27'
              height='27'
              viewBox='0 0 27 27'
              fill='none'>
              <circle cx='13.1741' cy='13.1741' r='13.1741' fill='#C6DCFF' />
            </svg>
          </div>

          <div className='absolute right-[-5px] top-[216px]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='53'
              height='74'
              viewBox='0 0 53 74'
              fill='none'>
              <circle cx='37' cy='37' r='37' fill='#C6DCFF' />
            </svg>
          </div>

          <div className='absolute right-[126.22px] top-[126px]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='51'
              height='51'
              viewBox='0 0 51 51'
              fill='none'>
              <path
                d='M11.3581 19.9099L37.1499 15.9774L27.6597 40.28L11.3581 19.9099Z'
                stroke='#FBAA1C'
                strokeWidth='3'
              />
            </svg>
          </div>
          <h2 className='H2 pt-[100px] pb-[72px]'>Desire Course</h2>
          {isLoading && (
            <div className='text-center'>
              <p className='Body1 text-center text-[#646D89]'>Loading.. </p>
            </div>
          )}
          {!isLoading && desireData.length === 0 && (
            <div className='text-center h-[115px]'>
              <p className='Body1 text-center text-[#646D89]'>
                You haven't added any desired courses yet
              </p>
            </div>
          )}

          <div className='grid grid-cols-3 gap-x-[24px] gap-y-[40px] '>
            {cardCourseToDisplay.map((item, index) => (
              <CourseItem
                key={index}
                coverimg={item.courses.cover_img}
                coursename={item.courses.course_name}
                coursedetail={item.courses.course_detail}
                coursesummary={item.courses.lessons.length}
                totallearningtime={item.courses.total_time}
                onClick={() => {
                  navigate(`/ourcourse/coursedetail/${item.course_id}`);
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }}
              />
            ))}
          </div>
          <div className='pagination-card mb-[200px]'>
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
      <Footer />
    </>
  );
}

export default DesireCoursePage;
