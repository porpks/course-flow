import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

function Mymodal(props) {
  return (
    <>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center">
        <Box className="bg-[#fff] rounded-[25px] shadow-lg shadow-gray-700 w-[528px] ">
          <div className="flex justify-between items-center h-[56px] px-[24px] py-[8px]">
            <div className="Body1">Confirmation</div>
            <button
              className="w-[41px] h-[40px] border-none bg-[#fff] cursor-pointer"
              onClick={props.closeButton}>
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
            <div className="flex justify-center gap-[16px] mt-[24px]">
              <button className="Secondary" onClick={props.noOnClick}>
                {props.noDes}
              </button>
              <button
                className="Primary border-none"
                onClick={props.yesOnClick}>
                {props.yesDes}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default Mymodal;
