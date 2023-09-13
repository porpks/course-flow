/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";

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

  const logout = async () => {
    try {
      if (!userID) {
        console.error("Cannot log out: User ID is not available.");
        return;
      }
      const response = await axios.get(
        `http://localhost:4000/auth/logout/${userID}`
      );
      if (response.status === 200) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserID("");
      } else {
        console.error("Logout failed: Unexpected server response");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const getDataCourse = async () => {
      try {
        const result = await axios.get(
          "http://localhost:4000/learn/videotime",
          {
            params: { userID: userID, courseID: courseId },
          }
        );
        const data = result.data.data;
        console.log(data);
        if (data.length > 0) {
          const handleShowVideo = (sublessonName, sublessonID) => {
            setVideoHead(sublessonName);
            setVideoKey(sublessonID);
            setIsShowVdo(true);
            setIsShowAsm(true);
          };
          handleShowVideo(data[0].sublesson_name, data[0].sublesson_id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDataCourse();
  }, [courseId]);

  console.log(videoHead);
  console.log(videoKey);
  console.log(isShowVdo);
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
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
