import React from "react";

function Modal(props) {
  return (
    <div className="bg-[#fff] rounded-[25px] shadow-lg shadow-gray-300 w-[528px] h-[212px]">
      <div className="flex justify-between items-center h-[56px] px-[24px] py-[8px]">
        <div className="Body1">Confirmation</div>
        <button className="w-[41px] h-[40px] border-none bg-[#fff] cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="41"
            height="40"
            viewBox="0 0 41 40"
            fill="none">
            <path
              d="M15.5303 24.8483L25.4697 15.1514M15.5303 15.1514L25.4697 24.8483"
              stroke="#C8CCDB"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="bg-gray-200 w-[100%] h-[1px]"></div>
      <div className="p-[24px] Body2">
        <div className="text-[#646D89]">{props.description}</div>
        <div className="flex gap-[16px] mt-[24px]">
          <button className="Secondary">{props.no}</button>
          <button className="Primary border-none">{props.yes}</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
