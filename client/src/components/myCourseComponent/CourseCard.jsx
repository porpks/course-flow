import React from "react";
import "./CourseCard.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function CourseCard(props) {
  const navigate = useNavigate();
  return (
    <div className='Shadow1 courseCard-con w-[357px] bg-[--white] rounded-t-[8px]'>
      <div className='topCard flex justify-center items-center '>
        <img className='' src={props.coverimg} alt={props.coursename} />
      </div>
      <div className='bodyCard '>
        <div className='border border-sky-500'>
          <p className='Body3 text-[--orange500]'>Course</p>
          <h2 className='H3 text-[#000] py-[8px]'>{props.coursename}</h2>
          <p
            className='Body2 text-[--gray700]  truncate'
            style={{ maxLines: "2" }}>
            {props.coursedetail}
          </p>
          <br />
          <div></div>

          <div
            className='no-underline '
            // to={`/ourcourse/coursedetail/${props.courseid}`}
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              navigate(`/ourcourse/coursedetail/${props.courseid}`);
            }}>
            Course Detail
          </div>
        </div>
      </div>
      <div className='footerCard'>
        <div className='footer-Line'></div>
        <div className='footerContents'>
          <div className='lesson-count-container'>
            <img src='../../public/image/lesson-count-icon.svg' alt='' />
            <p className='courseSummary Body2 text-[--gray700] mx-[8px] '>
              {`${props.coursesummary}  Lesson`}
            </p>
          </div>
          <div className='learningTime-container'>
            <img src='../../public/image/learningtime-icon.svg' alt='' />
            <p className='Body2 text-[--gray700] mx-[8px]'>
              {`${props.totallearningtime}  Hours`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
