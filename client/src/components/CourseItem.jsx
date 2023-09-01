import React from "react";
import "./courseItem.css";

function CourseItem(props) {
  const {
    coverimg,
    coursetype,
    coursename,
    coursedetail,
    coursesummary,
    totallearningtime,
    count,
  } = props;
  return (
    <div className="card--contrainer">
      <div className="w">
        <p></p>
        <img src={coverimg} alt={coursename} />
      </div>
      <div>
        <p>{coursetype}</p>
        <h2>{count}__{coursename}</h2>
        <p>{coursedetail}</p>
        <div className="footer--cord">
          <p>{coursesummary}</p>
          <p>{totallearningtime}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseItem;
