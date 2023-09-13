/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
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
  const navigate = useNavigate();
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
        // localStorage.removeItem("token");
        localStorage.removeItem("userID");
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
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

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
      const response = await axios.get(
        `http://localhost:4000/profile/${localStorage.getItem(userID)}`
      );
      // const response = await axios.get(
      //   `http://localhost:4000/profile/${result.data.data[0].user_id}`
      // );
      setUsername(response.data.data);
      console.log(response);
      localStorage.setItem("username", response.data.data.full_name);
      localStorage.setItem("userimage", response.data.data.image_url);
      console.log(username);
      navigate("/ourcourse");
    } catch (error) {
      alert(error);
    }
  };
  // console.log(username);
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
        login,
        isLoggedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
