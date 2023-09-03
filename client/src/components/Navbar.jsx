import CourseFlowIcon from "../assets/CourseFlowIcon.jsx";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { menuItems } from "../assets/NavbarDropdown.js";
import { Icon } from "@mui/material";
import PeopleIcon from "../assets/PeopleIcon.jsx";
import BookIcon from "../assets/BookIcon.jsx";
import CopyIcon from "../assets/CopyIcon.jsx";
import StarIcon from "../assets/StarIcon.jsx";
import LogoutIcon from "../assets/LogoutIcon.jsx";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth(); // Set initial state to false

  const handleLogin = () => {
    setIsLoggedIn(true); // Simulate a login action
  };
  const LoginButton = ({ buttonText }) => {
    return (
      <div>
        <button className="Shadow1 text-[16px] font-[700] w-[112px] h-[60px] rounded-[12px] border-none bg-[--blue500] text-white mx-[16px] hover:bg-[--blue400] active:bg-[--blue700] disabled:bg-[--gre400] disabled:text-[--gray600]">
          {buttonText}
        </button>
      </div>
    );
  };

  const AfterLogin = ({ profileName, profileImg }) => {
    const DropdownArrow = () => {
      return (
        <div className="relative group">
          <button className="flex items-center justify-center px-2 py-1 border border-gray-400 rounded-md group-hover:bg-gray-100">
            Dropdown
            <span className="ml-2 transition-transform group-hover:rotate-180">
              ▼
            </span>
          </button>
          <div className="absolute hidden mt-2 bg-white border border-gray-300 rounded-md shadow-md group-hover:block">
            {/* Dropdown content */}
            <ul className="py-2 px-3">
              <li className="cursor-pointer hover:bg-gray-100 py-1">
                Option 1
              </li>
              <li className="cursor-pointer hover:bg-gray-100 py-1">
                Option 2
              </li>
              <li className="cursor-pointer hover:bg-gray-100 py-1">
                Option 3
              </li>
            </ul>
          </div>
        </div>
      );
    };
    return (
      <div className="flex flex-row space-x-2 items-center">
        <Avatar alt={profileImg} src={profileImg} />
        <img src={profileImg} alt="profileImg" />
        <p>{profileName}</p>
        {/* <div className="h-0 w-0 border-x-8 border-x-transparent border-b-[25px] border-b-blue-600"></div>
        <DropdownArrow />
        <ion-icon name="caret-down-outline"></ion-icon> */}
      </div>
    );
  };

  const DropdownItem = (props) => {
    return (
      <div className="dropdownItem">
        <img src={props.icon} />
        <a>{props.text}</a>
      </div>
    );
  };

  return (
    <>
      <body className="flex flex-row justify-center">
        <nav className="flex flex-row justify-between items-center ju w-[80vw]">
          <CourseFlowIcon />
          <div className="flex flex-row items-center">
            <a
              href=""
              className="no-underline text-[16px] font-[700] justify-center px-[24px] py-[32px] mx-[16px]"
            >
              Our Course
            </a>
            {isLoggedIn ? (
              <div className="flex flex-row ">
                <AfterLogin profileImg="url" profileName="TESTS" />
                <ul
                  className="Body3 text-[--gray700] flex flex-col items-start p-[14px]"
                  style={{ fontWeight: "500" }}
                >
                  <div className="flex flex-row space-x-3 justify-start items-center">
                    <PeopleIcon width="16px" height="16px" stroke="#8DADE0" />
                    <DropdownItem text="Profile" />
                  </div>
                  <div className="flex flex-row space-x-3">
                    <BookIcon width="16px" height="16px" stroke="#8DADE0" />
                    <DropdownItem text="My Course" />
                  </div>
                  <div className="flex flex-row space-x-3">
                    <CopyIcon width="16px" height="16px" stroke="#8DADE0" />
                    <DropdownItem text="My Homework" />
                  </div>
                  <div className="flex flex-row space-x-3">
                    <StarIcon width="16px" height="16px" stroke="#8DADE0" />
                    <DropdownItem text="MyDesire Courses" />
                  </div>
                  <div className="flex flex-row space-x-3">
                    <LogoutIcon width="16px" height="16px" stroke="#8DADE0" />
                    <DropdownItem text="Log out" />
                  </div>
                </ul>
              </div>
            ) : (
              <LoginButton onClick={handleLogin} buttonText="Log in" />
            )}
          </div>
        </nav>
      </body>
    </>
  );
}
export default Navbar;
