/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useEffect } from "react";
const AuthContext = React.createContext();
import axios from "axios";

function AuthProvider(props) {
  const [state, setState] = useState("eiei");
  const [registerData, setRegisterData] = useState({});
  const [loginData, setLoginData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set initial state to false
  const [userID, setUserID] = useState(null);
  const [username, setUsername] = useState({});

  const initializeUser = async (userID) => {
    try {
      const response = await axios.get(`http://localhost:4000/profile/63`);
      setUsername(response.data);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    initializeUser();
    return () => {
      console.log("Component unmounted");
    };
  }, [userID]);

  const logout = async () => {
    try {
      //   if (!userID) {
      //     console.error("Cannot log out: User ID is not available.");
      //     return;
      //   }
      const response = await axios.get(
        `http://localhost:4000/auth/logout/${userID}`
      );
      if (response.status === 200) {
        setIsLoggedIn(false);
        setUsername(null);
        console.log("Logout successful");
      } else {
        console.error("Logout failed: Unexpected server response");
      }
    } catch (error) {
      // console.error("Logout failed:", error.message);
    }
  };

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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
