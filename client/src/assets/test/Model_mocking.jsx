import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "480px",
  backgroundColor: "white",
  boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.2)",
  padding: "16px",
};

function Model_mocking() {
  return (
    <div className="model-box Shadow1 rounded-[24px] flex flex-col gap-[24px] p-[24px]" style={style}>
      <div className="top-model flex flex-row justify-between items-center">
        <p className="Body1">Confirmation</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="40"
          viewBox="0 0 41 40"
          fill="none"
        >
          <path
            d="M15.5303 24.8483L25.4697 15.1514M15.5303 15.1514L25.4697 24.8483"
            stroke="#C8CCDB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="detail-model flex flex-col gap-[24px] ">
        <p>Do you sure to subscribe Service Design Essentials Course?</p>
        <div className="btn-box flex gap-[16px]">
          <button className="Secondary">No, I don’t</button>
          <button className="Primary">Yes, I want to subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default Model_mocking
