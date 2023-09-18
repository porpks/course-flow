/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState("eiei");
  const [registerData, setRegisterData] = useState({});
  const [loginData, setLoginData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);
  const [username, setUsername] = useState({});
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  const [courseId, setCourseId] = useState(null);
  const [isShowVdo, setIsShowVdo] = useState(false);
  const [isShowAsm, setIsShowAsm] = useState(false);
  const [videoHead, setVideoHead] = useState("");
  const [videoKey, setVideoKey] = useState(null);
  const [pauseTime, setPauseTime] = useState(0);
  const [videoUrl, setvideoUrl] = useState(
    "https://yzcnxdhntdijwizusqmn.supabase.co/storage/v1/object/public/test-avatar/1%20Minute%20Sample%20Video.mp4?t=2023-09-08T15%3A26%3A51.001Z"
  );
  const userId = getCookie("userID");

  const navigate = useNavigate();

  const logout = async () => {
    try {
      if (!localStorage.getItem("userID")) {
        console.error("Cannot log out: User ID is not available.");
        return;
      }
      const response = await axios.get(
        `http://localhost:4000/auth/logout/${userID}`
      );
      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("userID");
        localStorage.removeItem("username");
        localStorage.removeItem("userimage");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("sublessonName");
        localStorage.removeItem("sublessonID");
        localStorage.removeItem("isShowVdo");
        localStorage.removeItem("isShowAsm");
        localStorage.removeItem("pauseTime");
        localStorage.removeItem("course_id");
        localStorage.clear();
        setIsLoggedIn(false);
        setUserID("");
      } else {
        console.error("Logout failed: Unexpected server response");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // Calculate expiration time
    const cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
    document.cookie = cookie;
  }

  const login = async (userData) => {
    try {
      const result = await axios.post(
        "http://localhost:4000/auth/login",
        userData
      );
      const token = result.data.token;
      setUserID(result.data.data[0].user_id);
      localStorage.setItem("token", token);
      localStorage.setItem("userID", result.data.data[0].user_id);
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);
      setCookie("userID", result.data.data[0].user_id, 1);
      // const response = await axios.get(
      //   `http://localhost:4000/profile/${userID}`
      // );
      setTimeout(async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/profile/${result.data.data[0].user_id}`
          );
          setUsername(response.data.data);
          console.log(response.data.data);
          localStorage.setItem("username", response.data.data.full_name);
          localStorage.setItem("userimage", response.data.data.image_url);
          localStorage.setItem("isLoggedIn", true);
        } catch (error) {
          console.error(error);
        }
      }, 500);

      navigate("/ourcourse");
    } catch (error) {
      alert(error);
    }
  };

  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        setState,
        isLoggedIn,
        setIsLoggedIn,
        registerData,
        setRegisterData,
        loginData,
        setLoginData,
        userID,
        setUserID,
        username,
        setUsername,
        logout,
        isAuthenticated,
        courseId,
        setCourseId,
        isShowVdo,
        setIsShowVdo,
        isShowAsm,
        setIsShowAsm,
        videoHead,
        setVideoHead,
        videoKey,
        setVideoKey,
        pauseTime,
        setPauseTime,
        login,
        userId,
        videoUrl,
        setvideoUrl,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
