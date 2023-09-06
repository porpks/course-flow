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

function Navbar() {
  const { isLoggedIn, username, logout, userID } = useAuth(); // Set initial state to falseSet initial state to false
  const navigate = useNavigate();

  const handleLogout = async (userID) => {
    // setIsLoggedIn(false);
    logout(userID);
    navigate("/");
    // const result = await axios.get(
    //   `http://localhost:4000/auth/logout/${userID}`
    // );
    // console.log(result);
  };

  const LoginButton = ({ buttonText }) => {
    return (
      <div>
        <button
          className='Shadow1 text-[16px] font-[700] w-[112px] h-[60px] rounded-[12px] border-none bg-[--blue500] text-white mx-[16px] hover:bg-[--blue400] active:bg-[--blue700] disabled:bg-[--gre400] disabled:text-[--gray600]'
          onClick={() => {
            navigate("/login");
          }}>
          {buttonText}
        </button>
      </div>
    );
  };

  const AfterLogin = () => {
    console.log(username);
    return (
      <div className='flex flex-row space-x-2 items-center'>
        <Avatar alt={username.full_name} src={username.image_url} />
        <p>{username.full_name}</p>
        <BasicMenu />
      </div>
    );
  };

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
              navigate(`/profile/${userID}`);
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
              navigate("/ourcourse");
            }}
            className=' space-x-4 '>
            <BookIcon width='16px' height='16px' stroke='#8DADE0' />
            <p className='Body3 text-[--gray700]' style={{ fontWeight: "500" }}>
              My Course
            </p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/ourcourse");
            }}
            className=' space-x-4 '>
            <CopyIcon width='16px' height='16px' stroke='#8DADE0' />
            <p className='Body3 text-[--gray700]' style={{ fontWeight: "500" }}>
              My Homework
            </p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/ourcourse");
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
              className='no-underline text-[16px] font-[700] justify-center px-[24px] py-[32px] mx-[16px] cursor-pointer'
              onClick={() => {
                navigate("/ourcourse");
              }}>
              Our Course
            </div>
            {isLoggedIn ? (
              <div className='flex flex-row justify-center items-center space-x-3'>
                <AfterLogin profileImg='url' profileName='TESTS' />
              </div>
            ) : (
              <LoginButton buttonText='Log in' />
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
export default Navbar;
