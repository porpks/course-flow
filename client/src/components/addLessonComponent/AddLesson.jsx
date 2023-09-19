import React, { useState } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { func } from "prop-types";

function AddLesson() {
  const [lessonData, setLessonData] = useState({
    lessonName: "", // Initialize with an empty string
    subLessonName: "", // Initialize with an empty string
  });
  const [subLessons, setSubLessons] = useState(["1,2"]);

  const handleSubLesson = (e) => {
    e.preventDefault();
    if (lessonData.subLessonName.trim() !== "") {
      setSubLessons([...subLessons, lessonData.subLessonName]);
      setLessonData({
        ...lessonData,
        subLessonName: "",
      });
    }
  };

  function AddSubLesson() {
    return subLessons.map((subLesson, index) => (
      <div
        key={index}
        className="my-[12px] flex flex-row bg-[#F6F7FC] px-4 py-6"
      >
        {/* รายละเอียดของ Sub-lesson ที่แสดง */}
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
              onClick={() => handleDeleteSubLesson(index)}
            >
              Delete
            </button>
          </div>
          <p className="Body2 Input w-[530px] h-[48px] mb-10 p">{subLesson}</p>
          <p className="Body2 pb-1">Video*</p>
          <button className="w-[160px] h-[160px] flex flex-col justify-center items-center #F1F2F6 border-none hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M12.5 4.5V19.5M20 12H5"
                stroke="#5483D0"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="Body3 text-[#5483D0] pt-2">Upload Video</p>
          </button>
        </div>
      </div>
    ));
  }

  const handleDeleteSubLesson = (index) => {
    const updatedSubLessons = [...subLessons];
    updatedSubLessons.splice(index, 1);
    setSubLessons(updatedSubLessons);
  };

  // function AddSubLesson() {
  //   return (
  //     <div className="my-[12px] flex flex-row bg-[#F6F7FC] px-4 py-6">
  //       <div className="w-[26px] h-[76px] mr-6 flex justify- items-center">
  //         <DragIndicatorIcon
  //           style={{ fontSize: 24, color: "#C8CCDB" }}
  //           className="hover:cursor-pointer"
  //         />
  //       </div>
  //       <div className="flex flex-col w-full">
  //         <div className="flex flex-row justify-between">
  //           <p className="Body2 pb-1">Sub-lesson name*</p>
  //           <button className="Ghost hover:cursor-pointer">Delete</button>
  //         </div>
  //         <input
  //           type="text"
  //           name="sub-lesson-name"
  //           className="Body2 Input w-[530px] h-[48px] mb-10 p"
  //           value={lessonData.subLessonName}
  //           onChange={(e) =>
  //             setLessonData({
  //               ...lessonData,
  //               subLessonName: e.target.value,
  //             })
  //           }
  //         />
  //         <p className="Body2 pb-1">Video*</p>
  //         <button className="w-[160px] h-[160px] flex flex-col justify-center items-center #F1F2F6 border-none hover:cursor-pointer">
  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   width="25"
  //   height="24"
  //   viewBox="0 0 25 24"
  //   fill="none"
  // >
  //   <path
  //     d="M12.5 4.5V19.5M20 12H5"
  //     stroke="#5483D0"
  //     stroke-width="2"
  //     stroke-linecap="round"
  //     stroke-linejoin="round"
  //   />
  // </svg>
  //           <p className="Body3 text-[#5483D0] pt-2">Upload Video</p>
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <form
      className="w-[1200px] h-[932px]  flex flex-col justify-center items-center bg-[#F6F7FC]"
      onSubmit={(e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        // Add logic here to handle the form submission
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
              value={lessonData.lessonName}
              onChange={(e) =>
                setLessonData({ ...lessonData, lessonName: e.target.value })
              }
            />
          </div>
          <hr />
          <p className="Body1 my-10 text-[#646D89]">Sub-Lesson</p>
          <AddSubLesson />
          <button
            className="Secondary w-fit mb-[60px] mt-3"
            onClick={handleSubLesson}
          >
            +Add Sub-lesson
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddLesson;
