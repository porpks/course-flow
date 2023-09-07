import React, { useState, useEffect } from "react";
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
        setIsLoggedIn(false);
        setUserID("");
        console.log("Logout successful");
      } else {
        console.error("Logout failed: Unexpected server response");
      }
    } catch (error) {
      alert(error.message);
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
        isAuthenticated,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
