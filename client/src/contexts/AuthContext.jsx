/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = React.createContext();
import secureLocalStorage from "react-secure-storage";
import SnackBar from "../components/SnackBar";

function AuthProvider(props) {
  const [state, setState] = useState("eiei");
  const [registerData, setRegisterData] = useState({});
  const [loginData, setLoginData] = useState({});
  const [adminId, setAdminId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setAdminIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);
  const [username, setUsername] = useState({});
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  const isAdminAuthenticated = Boolean(localStorage.getItem("adminID"));
  const [courseId, setCourseId] = useState(null);
  const [isShowVdo, setIsShowVdo] = useState(false);
  const [isShowAsm, setIsShowAsm] = useState(false);
  const [videoHead, setVideoHead] = useState("");
  const [videoKey, setVideoKey] = useState(null);
  const [pauseTime, setPauseTime] = useState(0);
  const [videoUrl, setvideoUrl] = useState(
    "https://xkebssagktnylcibaxzh.supabase.co/storage/v1/object/public/test-avatar/video/1%20Minute%20Sample%20Video.mp4?t=2023-09-20T08%3A40%3A19.620Z"
  );
  const [deleteAssignment, setDeleteAssignment] = useState({
    state: false,
    assignment_id: null,
  });
  const [lesson, setLesson] = useState([]);

  const [adminImageUrl, setAdminImageUrl] = useState("");
  const [adminVideoUrl, setAdminVideoUrl] = useState("");
  const [getImgUrl, setGetImgUrl] = useState("");
  const [getVdoUrl, setGetVdoUrl] = useState("");

  const userIdFromCookie = getCookie("cookieUserID");
  const userId = secureLocalStorage.getItem("userID");
  const navigate = useNavigate();

  function displaySnackbar(message, status) {
    setOpenSnackBar(false);
    setSnackStatus(status);
    setSnackbarMes(message);
    setOpenSnackBar(true);
  }
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [snackBarMes, setSnackbarMes] = useState("");
  const [snackStatus, setSnackStatus] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const logout = async () => {
    try {
      localStorage.clear(), setIsLoggedIn(false), clearAllCookies();
      // (window.location.href = '/')
      // setUserID("");
      // const response = await axios.get(`http://localhost:4000/auth/logout`);
      // if (response.status === 200) {
      //   localStorage.clear();
      //   setIsLoggedIn(false);
      //   setUserID("");
      // } else {
      //   console.error("Logout failed: Unexpected server response");
      // }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.clear();
      logout();
    }

    return () => {};
  }, [userId]);

  function clearAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

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
      if (result.data.message === "Email not confirmed") {
        displaySnackbar(
          "Email is not confirmed. Please check you email to verify",
          "warning"
        );
      } else {
        const token = result.data.token;
        // setUserID(result.data.data[0].user_id);
        setCookie("cookieUserID", result.data.data[0].user_id, 1);
        setCookie("token", token, 1);
        localStorage.setItem("isLoggedIn", true);
        secureLocalStorage.setItem("userID", result.data.data[0].user_id);
        localStorage.setItem("token", token);
        // setIsLoggedIn(true);
        // const response = await axios.get(
        //   `http://localhost:4000/profile/${userID}`
        // );
        setTimeout(async () => {
          try {
            const response = await axios.get(
              `http://localhost:4000/profile/${result.data.data[0].user_id}`
            );
            const hasToken = !!localStorage.getItem("token");
            setUsername(response.data.data);
            localStorage.setItem("username", response.data.data.full_name);
            localStorage.setItem("userimage", response.data.data.image_url);
            localStorage.setItem("isLoggedIn", hasToken ? "true" : "false");
          } catch (error) {
            console.error(error);
          }
        }, 50);

        displaySnackbar("login successful", "success");
        navigate("/ourcourse");
      }
    } catch (error) {
      displaySnackbar(
        "Email or password is incorrect. Please try again.",
        "warning"
      );
    }
  };

  const loginAdmin = async (loginData) => {
    const response = await axios.post(
      "http://localhost:4000/authadmin/login",
      loginData
    );
    try {
      if (!response.data.error) {
        console.log("Login successful");
        const admin_id = response.data.data[0].admin_id;
        const token = response.data.token;
        console.log(token);
        localStorage.setItem("adminID", admin_id);
        localStorage.setItem("token", token);
        setCookie("token", token, 1);
        setCookie("cookieAdminID", admin_id, 1);
        setTimeout(async () => {
          try {
            const hasToken = !!localStorage.getItem("token");
            localStorage.setItem(
              "isAdminLoggedIn",
              hasToken ? "true" : "false"
            );
          } catch (error) {
            console.error(error);
          }
        }, 50);
        setAdminIsLoggedIn(true);
        displaySnackbar("login successful", "success");
        navigate("admin/courselist");
      }
    } catch (error) {
      displaySnackbar(
        "Email or password is incorrect. Please try again.",
        "warning"
      );
    }
  };

  const logoutAdmin = () => {
    localStorage.clear(),
      setIsLoggedIn(false),
      clearAllCookies(),
      setAdminId(""),
      navigate("/admin"); // Update this path as needed
  };

  return (
    <>
      <SnackBar
        open={openSnackbar}
        onClose={handleClose}
        severity={snackStatus}
        message={snackBarMes}
      />
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
          deleteAssignment,
          setDeleteAssignment,
          userIdFromCookie,
          loginAdmin,
          logoutAdmin,
          lesson,
          setLesson,
          adminImageUrl,
          setAdminImageUrl,
          adminVideoUrl,
          setAdminVideoUrl,
          getImgUrl,
          setGetImgUrl,
          getVdoUrl,
          setGetVdoUrl,
          isAdminAuthenticated,
        }}>
        {props.children}
      </AuthContext.Provider>
    </>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
