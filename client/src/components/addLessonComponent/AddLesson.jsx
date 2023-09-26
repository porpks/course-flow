import React, { useState, useEffect } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { func } from "prop-types";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddLessonVideo from "./AddLessonVideo";

function AddLesson(sharedState, updateState) {
  const navigate = useNavigate();
  const { courseid } = useParams();
  const [dataCourse, setDataCourse] = useState([]);
  const [subLessonList, setSubLessonList] = useState([
    { lessonId: 1, subLessonName: "" },
  ]);
  const [lessonName, setLessonName] = useState("");
  async function getDetailCourse() {
    try {
      const dataDetailCourse = await axios.get(
        `http://localhost:4000/admin/editcourse/${courseid}`
      );
      setDataCourse({
        course_id: dataDetailCourse.data.data.course_id,
        course_name: dataDetailCourse.data.data.course_name,
        lessons: dataDetailCourse.data.data.lessons.map((lesson) => ({
          lesson_name: lesson.lesson_name,
          sublessons: lesson.sublessons,
        })),
      });
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(dataCourse)

  // useEffect(() => {
  //   getDetailCourse()
  //   if (updatedSubLessonName && updatedLessonId) {
  //     const updatedSubLessonList = subLessonList.map((subLesson) =>
  //       subLesson.lessonId === updatedLessonId
  //         ? { ...subLesson, subLessonName: updatedSubLessonName }
  //         : subLesson
  //     )
  //     setSubLessonList(updatedSubLessonList)
  //     setUpdatedSubLessonName('')
  //     setUpdatedLessonId('')
  //   }
  // }, [updatedSubLessonName, updatedLessonId, subLessonList])

  const addSubLesson = () => {
    const newLessonId = subLessonList.length + 1;
    const newSubLesson = { lessonId: newLessonId, subLessonName: "" };
    setSubLessonList([...subLessonList, newSubLesson]);
  };

  const deleteSubLesson = (lessonIdToDelete) => {
    if (subLessonList.length === 1) {
      alert("You can't delete the last sub-lesson.");
      return;
    }
    const updatedSubLessonList = subLessonList.filter(
      (subLesson) => subLesson.lessonId !== lessonIdToDelete
    );
    setSubLessonList(updatedSubLessonList);
  };

  const handleSubLesson = (lessonId, subLessonName) => {
    const updatedSubLessonList = subLessonList.map((subLesson) =>
      subLesson.lessonId === lessonId
        ? { ...subLesson, subLessonName }
        : subLesson
    );
    setSubLessonList(updatedSubLessonList);
  };

  const handleLesson = (event) => {
    const value = event.target.value;
    setLessonName(value);
  };

  const lessonData = [
    { lessonName: lessonName },
    { subLessonName: subLessonList },
  ];
  console.log(lessonData);

  const createButton = (event) => {
    const data = { lessonName, ...subLessonList[1] };
    console.log(data);
    updateState(data);
    // const lessonData = { lessonName, subLessonList }
    // const subLessonsArray = Object.values(lessonData).filter(
    //   (item) => typeof item === 'object'
    // )
    // // Map and prepare the data for sending to the server
    // const preparedData = subLessonsArray.map((subLesson) => ({
    //   lessonName: lessonData.lessonName,
    //   ...subLesson,
    // }))

    // console.log(preparedData)
  };

  return (
    <div className="flex flex-col">
      <div className="w-[1200px] ">
        <div className="flex flex-row justify-between file: items-center px-10 py-4">
          <div className="flex flex-row justify-center items-center space-x-4">
            <div
              className=""
              onClick={() => {
                navigate(`/admin/addcourse`);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18.7915 11.0051H7.62148L12.5015 6.1251C12.8915 5.7351 12.8915 5.0951 12.5015 4.7051C12.1115 4.3151 11.4815 4.3151 11.0915 4.7051L4.50148 11.2951C4.11148 11.6851 4.11148 12.3151 4.50148 12.7051L11.0915 19.2951C11.4815 19.6851 12.1115 19.6851 12.5015 19.2951C12.8915 18.9051 12.8915 18.2751 12.5015 17.8851L7.62148 13.0051H18.7915C19.3415 13.0051 19.7915 12.5551 19.7915 12.0051C19.7915 11.4551 19.3415 11.0051 18.7915 11.0051Z"
                  fill="#9AA1B9"
                />
              </svg>
            </div>
            <div className="flex flex-col ">
              <div className="flex flex-row Body3 space-x-2">
                <p className="text-[#9AA1B9]">Course</p>
                <p>{dataCourse.course_name}</p>
              </div>
              <h1 className="H3">Add Lesson</h1>
            </div>
          </div>
          <div className="space-x-4">
            <button className="Secondary">Cancle</button>
            <button className="Primary border-none" onClick={createButton}>
              Create
            </button>
          </div>
        </div>
      </div>
      <form
        className="w-[1200px] pb-[219px] h-auto  flex flex-col justify-center items-center bg-[#F6F7FC] pt-10"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="w-[1120px]  flex flex-col justify-center items-center bg-[#FFF]">
          <div className="w-[920px] flex flex-col justify-center">
            <div className="pt-[40px]">
              <p className="Body2 pb-1 ">Lesson name*</p>
              <input
                type="text"
                name="Lesson name"
                className="Input w-full h-[48px] mb-10"
                value={lessonName}
                onChange={handleLesson}
              />
            </div>
            <hr />
            <p className="Body1 my-10 text-[#646D89]">Sub-Lesson</p>{" "}
            {subLessonList.map((subLesson, index) => (
              <div key={index}>
                <div className="my-[12px] flex flex-row bg-[#F6F7FC] px-4 py-6">
                  <div className="w-[26px] h-[76px] mr-6 flex justify- items-center">
                    <DragIndicatorIcon
                      style={{ fontSize: 24, color: "#C8CCDB" }}
                      className="hover:cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-between">
                      <p className="Body2 pb-1">Sub-lesson name*</p>
                      <button
                        className="Ghost hover:cursor-pointer"
                        onClick={() => deleteSubLesson(subLesson.lessonId)}
                      >
                        Delete
                      </button>
                    </div>
                    <input
                      type="text"
                      name="sub-lesson-name"
                      className="Body2 Input w-[530px] h-[48px] mb-10 p"
                      value={subLesson.subLessonName}
                      onChange={(e) =>
                        handleSubLesson(subLesson.lessonId, e.target.value)
                      }
                    />
                    <p className="Body2 pb-1">Video*</p>
                    <AddLessonVideo />
                  </div>
                </div>
              </div>
            ))}
            <button
              className="Secondary w-fit mb-[60px] mt-3"
              onClick={addSubLesson}
            >
              +Add Sub-lesson
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddLesson;
