import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseItem from "../components/CourseItem";

function DesireCoursePage() {
  return (
    <>
      <Navbar />
      <div className="relative flex justify-center w-[100%]">
        <div className="flex flex-col items-center w-[1440px]">
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
          <div className="grid grid-cols-3 gap-x-[24px] gap-y-[40px] mb-[200px]">
            <CourseItem
              key="test"
              count="test"
              coverimg="test"
              coursename="test"
              coursedetail="test"
              coursesummary="test"
              totallearningtime="test"
            />
            <CourseItem
              key="test"
              count="test"
              coverimg="test"
              coursename="test"
              coursedetail="test"
              coursesummary="test"
              totallearningtime="test"
            />
            <CourseItem
              key="test"
              count="test"
              coverimg="test"
              coursename="test"
              coursedetail="test"
              coursesummary="test"
              totallearningtime="test"
            />

            <CourseItem
              key="test"
              count="test"
              coverimg="test"
              coursename="test"
              coursedetail="test"
              coursesummary="test"
              totallearningtime="test"
            />

            <CourseItem
              key="test"
              count="test"
              coverimg="test"
              coursename="test"
              coursedetail="test"
              coursesummary="test"
              totallearningtime="test"
            />

            <CourseItem
              key="test"
              count="test"
              coverimg="test"
              coursename="test"
              coursedetail="test"
              coursesummary="test"
              totallearningtime="test"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DesireCoursePage;
