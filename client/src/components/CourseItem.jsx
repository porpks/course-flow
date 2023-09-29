import React from 'react'
import './courseItem.css'
import { Link } from 'react-router-dom'

function CourseItem(props) {
  return (
    <>
      <div

        className="cardItem Shadow1 w-[357px]  bg-[--white] rounded-t-[8px] no-underline  flex flex-col justify-between "
        onClick={props.onClick}
      >
        <div className="topCard flex justify-center items-center rounded-t-lg  bg-red-300 ">
          <img
            className=" object-cover w-full h-[240px] rounded-t-lg "
            src={props.coverimg}
            alt={props.coursename}
          />
        </div>
        <div className="bodyCard w-full h-[190px]  my-[24px] mx-0 pt-0 px-[16px] pb-[16px] ">

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
        <div className="footerCard  w-full h-auto flex flex-col">
          <div className="footer-Line w-full h-[3px] bg-[--gray600] opacity-[0.1]"></div>
          <div className="footerContents flex justify-start items-center gap-[24px] p-[16px] ">
            <div className="lesson-count-container flex flex-row items-center">
              <img src="../../public/image/lesson-count-icon.svg" alt="" />
              <p className="courseSummary Body2 text-[--gray700] mx-[8px] ">
                {`${props.coursesummary}  Lesson`}
              </p>
            </div>
            <div className="learningTime-container flex flex-row items-center">
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
