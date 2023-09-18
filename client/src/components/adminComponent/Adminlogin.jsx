import React, { useState } from "react";
import CourseFlowIcon from "../../assets/CourseFlowIcon";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleLogin = () => {
    // Perform login authentication here
    if (username === "admin" && password === "password") {
      // Successful login
      console.log("Login successful");
      // Do something after successful login, such as redirecting to a dashboard page
    } else {
      // Invalid credentials
      console.log("Invalid username or password");
      // Display an error message to the user or perform any other error handling
    }
  };

  return (
    <div>
      <div className="Linear2 w-[100vw]  flex flex-col justify-center items-center">
        <div className=" bg-white w-[568px] h-[568px] mt-[150px] mb-[306px] flex flex-col items-center justify-center p-[60px]">
          <div className="flex flex-col justify-center items-center mb-[46px]">
            <CourseFlowIcon width="315" height="36" />
            <h1 className="mt-[24px] Nunito font-[700] text-[24px] text-[#646D89]">
              Admin Panel Control
            </h1>
          </div>
          <div className="mb-[40px]">
            <p
              className="Body2 pb-[4px]"
              name="username"
              value={username}
              onChange={handleInputChange}
            >
              Username
            </p>
            <input type="text" className="Input w-[446px] h-[48px] " />
          </div>
          <div className="mb-[40px]">
            <p
              className="Body2 pb-[4px]"
              name="password"
              value={password}
              onChange={handleInputChange}
            >
              Password
            </p>
            <input type="text" className="Input w-[446px] h-[48px]" />
          </div>
          <button
            className="Primary w-[446px] border-none"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
