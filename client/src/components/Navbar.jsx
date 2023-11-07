import CourseFlowIcon from "../assets/CourseFlowIcon.jsx";
import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { menuItems } from "../assets/NavbarDropdown.js";
import { Icon } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import PeopleIcon from "../assets/PeopleIcon.jsx";
import BookIcon from "../assets/BookIcon.jsx";
import CopyIcon from "../assets/CopyIcon.jsx";
import StarIcon from "../assets/StarIcon.jsx";
import LogoutIcon from "../assets/LogoutIcon.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Navbar() {
  const { isLoggedIn, logout, setIsLoggedIn, setUserID, username, userId } =
    useAuth();
  const navigate = useNavigate();
  // const userID = localStorage.getItem("userID");
  const userName = localStorage.getItem("username");
  const userImage = localStorage.getItem("userimage");
  const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = async (userID) => {
    logout();
    navigate("/");
  };

  const LoginButton = ({ buttonText }) => {
    return (
      <div>
        <button
          className='Primary Shalow1 mx-[16px]'
          onClick={() => {
            navigate("/login");
          }}>
          {buttonText}
        </button>
      </div>
    );
  };

  const AfterLogin = () => {
    return (
      <div className='flex flex-row space-x-2 items-center'>
        <Avatar alt={userName} src={userImage} />
        <p>{userName}</p>
        <BasicMenu />
      </div>
    );
  };
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn == "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const BasicMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div className='Body3'>
        <Button
          id='basic-button'
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup='true'
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}>
          <ion-icon name='caret-down-outline'></ion-icon>
        </Button>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}>
          <MenuItem
            onClick={() => {
              navigate(`/profile/${userId}`);
            }}
            className=' space-x-4 '
            style={{ width: "216px" }}>
            <PeopleIcon width='16px' height='16px' stroke='#8DADE0' />
            <p className='Body3 text-[--gray700]' style={{ fontWeight: "500" }}>
              Profile{" "}
            </p>
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate("/mycourse");
            }}
            className=' space-x-4 '>
            <BookIcon width='16px' height='16px' stroke='#8DADE0' />
            <p className='Body3 text-[--gray700]' style={{ fontWeight: "500" }}>
              My Course
            </p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/assignment");
            }}
            className=' space-x-4 '>
            <CopyIcon width='16px' height='16px' stroke='#8DADE0' />
            <p className='Body3 text-[--gray700]' style={{ fontWeight: "500" }}>
              My Homework
            </p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/desire");
            }}
            className=' space-x-4 '>
            <StarIcon width='16px' height='16px' stroke='#8DADE0' />
            <p className='Body3 text-[--gray700]' style={{ fontWeight: "500" }}>
              My Desire Courses
            </p>
          </MenuItem>

          <Divider />
          <MenuItem onClick={handleLogout} className=' space-x-4 '>
            <LogoutIcon width='16px' height='16px' stroke='#646D89' />
            <p className='Body3 text-[--gray700]' style={{ fontWeight: "500" }}>
              Logout
            </p>
          </MenuItem>
        </Menu>
      </div>
    );
  };

  return (
    <>
      <div
        id='homepage'
        className='flex flex-row justify-center Shadow2 h-[88px]'>
        <nav className='flex flex-row justify-between items-center ju w-[80vw]'>
          <div
            className='cursor-pointer'
            onClick={() => {
              navigate("/");
            }}>
            <CourseFlowIcon />
          </div>

          <div className='flex flex-row items-center'>
            <div
              className='no-underline text-[16px] font-[700] justify-center px-[24px] py-[32px] mx-[16px] cursor-pointer hover-scale'
              onClick={() => {
                navigate("/ourcourse");
              }}>
              Our Course
            </div>
            {isLoggedIn && username ? (
              <div className='flex flex-row justify-center items-center space-x-3'>
                <AfterLogin profileImg='url' profileName='TESTS' />
              </div>
            ) : (
              <LoginButton buttonText='Log in' />
            )}
            {/* {isLoggedIn ? <AfterLogin /> : <LoginButton buttonText="Login" />} */}
          </div>
        </nav>
      </div>
    </>
  );
}
export default Navbar;
