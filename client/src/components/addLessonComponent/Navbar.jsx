import React from "react";

function Navbar() {
  return (
    <div className="w-[1200px]">
      <div className="flex flex-row justify-between file: items-center px-10 py-4">
        <div className="flex flex-row justify-center items-center space-x-4">
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
          <div className="flex flex-col ">
            <div className="flex flex-row Body3 space-x-2">
              <p className="text-[#9AA1B9]">Course</p>
              <p c>'Service Design Essentials'Introduction</p>
            </div>
            <h1 className="H3">Add Lesson</h1>
          </div>
        </div>
        <div className="space-x-4">
          <button className="Secondary">Cancle</button>
          <button className="Primary border-none">Create</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
