import React from "react";
import CourseFlowIcon from "../../assets/CourseFlowIcon";

function AdminLogin() {
  return (
    <div>
      <div className="bg-blue-400 w-[100vw]  flex flex-col justify-center items-center  ">
        <div className=" bg-white w-[568px] h-[568px] mt-[150px] mb-[306px] flex flex-col items-center justify-center p-[60px]">
          <div className="flex flex-col justify-center items-center mb-[46px]">
            <CourseFlowIcon />
            <h1 className="mt-[24px]">Admin Panel Control</h1>
          </div>
          <div className="mb-[40px]">
            <p className="Body2 pb-[4px]">Username</p>
            <input
              type="asdasd "
              className="w-[446px] h-[48px] py-[12px] pl-[12px] pr-[16px] rounded-[8px] border-[-grey400]  border border-solid"
            />
          </div>
          <div className="mb-[40px]">
            <p className="Body2 pb-[4px]">Password</p>
            <input
              type="asdasd"
              className="w-[446px]  h-[48px] py-[12px] pl-[12px] pr-[16px] rounded-[8px] border-[-grey400]  border border-solid"
            />
          </div>
          <button className="w-[446px] px-[32px] py-[18px]">Login</button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
