import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

function AddLesson() {
  return (
    <div className="w-[1200px] h-[932px]  flex flex-col justify-center items-center">
      <div className="w-[1120px] h-[750px] flex flex-col justify-center items-center">
        <div className="w-[920px] flex flex-col justify-center">
          <div>
            <p className="Body2 pb-1">Lesson name*</p>
            <input
              type="text"
              name="Lesson name"
              className="Input w-full h-[48px] mb-10"
            />
          </div>
          <hr />
          <p className="Body1 my-10">Sub-Lesson</p>
          <div className="mb-[61px] flex flex-row">
            <div className="w-[26px] h-[76px] mr-6 flex justify- items-center">
              <DragIndicatorIcon style={{ fontSize: 24, color: "#C8CCDB" }} />
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between">
                <p className="Body2 pb-1">Sub-lesson name*</p>
                <button className="Ghost">Delete</button>
              </div>
              <input
                type="text"
                name="sub-lesson-name"
                className="Body2 Input w-[530px] h-[48px] mb-10 p"
              />
              <p className="Body2 pb-1">Video*</p>
              <button className="w-[160px] h-[160px] flex flex-col justify-center items-center bg-white border-none hover:cursor-pointer">
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
          <button className="Secondary w-fit">+Add Sub-lesson</button>
        </div>
      </div>
    </div>
  );
}

export default AddLesson;
