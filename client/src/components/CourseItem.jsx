import React from "react";

function CourseItem(props) {
  return (
    <div className="card--contrainer">
      <img src="" alt="" />
      <p>{props.coursetype}</p>
      <h2>{props.coursename}</h2>
      <p>{props.coursedetail}</p>
      <div className="footer--cord">
        <p>{props.coursesummary}</p>
        <p>{props.totallearningtime}</p>
      </div>
    </div>
  );
}

export default CourseItem;
