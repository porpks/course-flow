import CourseItem from "./CourseItem";
import "./ourCourse.css";

let courseData = [
  {
    course_id: 1,
    coursetype: "Course",
    coverimg: "http://dummyimage.com/350x350.png/dddddd/000000",
     
    coursename: "Service Design Essentials",
    coursedetail: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.",
    coursesummary: "6 Lesson",
    totallearningtime: "6 Hours",
  },
  {
    course_id: 2,
    coursetype: "Course",
    coverimg: "http://dummyimage.com/350x350.png/dddddd/000000",
    coursename: "Software Developer ",
    coursedetail: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.",
    coursesummary: "6 Lesson",
    totallearningtime: "6 Hours",
  },
  {
    course_id: 3,
    coursetype: "Course",
    coverimg: "http://dummyimage.com/350x350.png/dddddd/000000",
    coursename: "UX/UI Design Beginer",
    coursedetail: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.",
    coursesummary: "6 Lesson",
    totallearningtime: "6 Hours",
  },
  {
    course_id: 4,
    coursetype: "Course",
    coverimg: "http://dummyimage.com/350x350.png/dddddd/000000",
    coursename: "Product Design for Business",
    coursedetail: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.",
    coursesummary: "6 Lesson",
    totallearningtime: "6 Hours",
  },
  {
    course_id: 5,
    coursetype: "Course",
    coverimg: "http://dummyimage.com/350x350.png/dddddd/000000",
    coursename: "Service Design Essentials",
    coursedetail: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.",
    coursesummary: "6 Lesson",
    totallearningtime: "6 Hours",
  },
  {
    course_id: 6,
    coursetype: "Course",
    coverimg: "http://dummyimage.com/350x350.png/dddddd/000000",
    coursename: "Service Design Essentials",
    coursedetail: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.",
    coursesummary: "6 Lesson",
    totallearningtime: "6 Hours",
  },
  {
    course_id: 7,
    coursetype: "Course",
    coverimg: "http://dummyimage.com/350x350.png/dddddd/000000",
    coursename: "UX/UI Design Beginer",
    coursedetail: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.",
    coursesummary: "6 Lesson",
    totallearningtime: "6 Hours",
  },
  {
    course_id: 8,
    coursetype: "Course",
    coverimg: "http://dummyimage.com/350x350.png/dddddd/000000",

    coursename: "Service Design Essentials",
    coursedetail: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.",
    coursesummary: "6 Lesson",
    totallearningtime: "6 Hours",
  },
  {
    course_id: 9,
    coursetype: "Course",
    coverimg: "http://dummyimage.com/350x350.png/dddddd/000000",

    coursename: "Software Developer",
    coursedetail: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.",
    coursesummary: "6 Lesson",
    totallearningtime: "6 Hours",
  },
  {
    course_id: 10,
    coursetype: "Course",
    coverimg: "http://dummyimage.com/350x350.png/dddddd/000000",
    coursename: "Software Developer",
    coursedetail: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.",
    coursesummary: "6 Lesson",
    totallearningtime: "6 Hours",
  },
  {
    course_id: 11,
    coursetype: "Course",
    coverimg: "http://dummyimage.com/350x350.png/dddddd/000000",
    coursename: "Software Developer",
    coursedetail: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.",
    coursesummary: "6 Lesson",
    totallearningtime: "6 Hours",
  },
  {
    course_id: 12,
    coursetype: "Course",
    coverimg: "http://dummyimage.com/350x350.png/dddddd/000000",
    coursename: "Software Developer",
    coursedetail: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.",
    coursesummary: "6 Lesson",
    totallearningtime: "6 Hours",
  },
];
function OurCourse() {
  return (
    <div className="canvas-ourCourse">
      <div className="topSection">
        <h2 className="H2">Our Courses</h2>
        <div className="input-container">
          <img src="../../public/search.svg" alt="searchIcon" />
          <input
            type="search"
            placeholder="Search..."
            //   value=""
            // onChange={}
          />
        </div>
      </div>
      <div className="content-Section">
        <div className="card-container">
          {courseData.map((item) => (
            <CourseItem
              key={item.course_id}
              count={item.course_id}
              coursetype={item.coursetype}
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
