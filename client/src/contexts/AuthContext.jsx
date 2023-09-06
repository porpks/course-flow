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

  const initializeUser = async (userID) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/profile/${userID}`
      );
      setUsername(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (userID) {
      initializeUser(userID);
      return () => {
        console.log("Component unmounted");
      };
    }
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
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
