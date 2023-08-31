import React from "react";

function CourseItem(props) {
  const {
    coverimg,
    coursetype,
    coursename,
    coursedetail,
    coursesummary,
    totallearningtime,
  } = props;
  return (
    <div className="card--contrainer">
      <img src={coverimg} alt={coursename} />
      <p>{coursetype}</p>
      <h2>{coursename}</h2>
      <p>{coursedetail}</p>
      <div className="footer--cord">
        <p>{coursesummary}</p>
        <p>{totallearningtime}</p>
      </div>
    </div>
  );
}

export default CourseItem;
