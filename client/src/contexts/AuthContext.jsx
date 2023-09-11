/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });
  const [registerData, setRegisterData] = useState({});
  const [loginData, setLoginData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);
  const [username, setUsername] = useState({});
  const navigate = useNavigate();

  const login = async (data) => {
    // console.log(data);
    const result = await axios.post("http://localhost:4000/auth/login", data);
    // console.log(result);
    const token = result.data.accessToken;
    localStorage.setItem("token", token);
    setUserID(result.data.data[0].user_id);
    setIsLoggedIn(true);
    navigate(`/profile/${result.data.data[0].user_id}`);
    // navigate("/");
    // return result;
  };

  const initializeUser = async (userID) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/profile/${userID}`
      );
      setUsername(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    initializeUser(userID);
    return () => {
      // console.log("Component unmounted");
    };
  }, [userID]);

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

  const isAuthenticated = Boolean(localStorage.getItem("token"));
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
        login,
        isAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
