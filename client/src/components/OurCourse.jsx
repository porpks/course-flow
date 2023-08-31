import Navbar from "./Navbar.jsx";
import CourseItem from "./CourseItem.jsx";

function OurCourse() {
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
  ];
  return (
    <section>
      <div className="topSection">
        <h2>Our Courses</h2>
        <input
          className="search--ourCourse"
          type="search"
          value=""
          placeholder="search..."
          // onChange={}
        />
      </div>
      <div className="card--contrainer">
        <CourseItem />
      </div>
    </section>
  );
}
export default OurCourse;
