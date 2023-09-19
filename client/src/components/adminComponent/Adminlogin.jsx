import React, { useState } from "react";
import CourseFlowIcon from "../../assets/CourseFlowIcon";
import axios from "axios";
import Login from "../Login";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState(null);
  const [login, isLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    email: null,
    password: null,
  });

  const handleLogin = async (loginData) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/authadmin/login",
        loginData
      );
      if (response.data.success) {
        // console.log("Login successful");
      }
      const admin_id = response.data.data[0].user_id;
      setAdminId(admin_id);
      localStorage.setItem("adminID", admin_id);

      console.log(response.data.data[0]);
    } catch (error) {
      // console.error("Error during login:", error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      alert("nodata");
    } else {
      handleLogin(loginData);
    }
  };
  return (
    <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
      <div className="Linear2 w-[100vw]  flex flex-col justify-center items-center">
        <div className=" bg-white w-[568px] h-[568px] mt-[150px] mb-[306px] flex flex-col items-center justify-center p-[60px]">
          <div className="flex flex-col justify-center items-center mb-[46px]">
            <CourseFlowIcon width="315" height="36" />
            <h1 className="mt-[24px] Nunito font-[700] text-[24px] text-[#646D89]">
              Admin Panel Control
            </h1>
          </div>
          <div className="mb-[40px]">
            <p className="Body2 pb-[4px]" name="username">
              Username
            </p>
            <input
              type="text"
              className="Input w-[446px] h-[48px]"
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-[40px]">
            <p className="Body2 pb-[4px]" name="password">
              Password
            </p>
            <input
              type="password"
              className="Input w-[446px] h-[48px]"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>
          <button
            className="Primary w-[446px] border-none"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default AdminLogin;
