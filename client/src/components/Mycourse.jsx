import React from "react";
import Avatar from "@mui/material/Avatar";
function Mycourse() {
  return (
    <body className="w-[80%] flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center ">
        <h2 className="H2">My Course</h2>
        <div className="flex flex-row mt-[30px]">
          <a className="Body2 p-[8px] m-[8px]">All Course</a>
          <a className="Body2 p-[8px] m-[8px]">Inprogress</a>
          <a className="Body2 p-[8px] m-[8px]">Complete</a>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col w-[357px] px-[24px] py-[32px] content-center items-center">
          <Avatar alt="" src="" sx={{ width: 120, height: 120 }} />
          <h2 className="my-[24px]">Max Mayfield</h2>
          <div className="flex flex-row ">
            <div className="flex flex-col justify-between p-[16px] w-[142.5px] h-[134px] bg-[--gray200] mx-[12px]">
              <p className="Body2">Course Inprogress</p>
              <p className="H3"> 3</p>
            </div>
            <div className="flex flex-col justify-between p-[16px] w-[142.5px] h-[134px] bg-[--gray200] mx-[12px]">
              <p className="Body2">Course Complete</p>
              <p className="H3">2</p>
            </div>
          </div>
        </div>

        <div className="w-[740px]">asdasd</div>
      </div>
    </body>
  );
}

export default Mycourse;
