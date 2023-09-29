import React from 'react'
import './courseItem.css'
import { Link } from 'react-router-dom'

function CourseItem(props) {
  return (
    <>
      <div
        className="cardItem Shadow1 w-[357px] bg-[--white] rounded-t-[8px] no-underline"
        onClick={props.onClick}
      >
        <div className="topCard flex justify-center items-center ">
          <img className="" src={props.coverimg} alt={props.coursename} />
        </div>
        <div className="bodyCard h-[190px]">
          <div className="border border-sky-500">
            <p className="Body3 text-[--orange500]">Course</p>
            <h2 className="H3 text-[#000] py-[8px]">{props.coursename}</h2>
            <p className="Body2 text-[--gray700]">
              {props.coursedetail
                ? props.coursedetail.length > 65
                  ? props.coursedetail.slice(0, 65) + ' ...'
                  : props.coursedetail
                : ''}
            </p>
          </div>
        </div>
        <div className="footerCard">
          <div className="footer-Line"></div>
          <div className="footerContents">
            <div className="lesson-count-container">
              <img src="../../public/image/lesson-count-icon.svg" alt="" />
              <p className="courseSummary Body2 text-[--gray700] mx-[8px] ">
                {`${props.coursesummary}  Lesson`}
              </p>
            </div>
            <div className="learningTime-container">
              <img src="../../public/image/learningtime-icon.svg" alt="" />
              <p className="Body2 text-[--gray700] mx-[8px]">
                {`${props.totallearningtime}  Hours`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseItem
