/* eslint-disable react/prop-types */
import React, { useState } from "react";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState("eiei");
  const [registerData, setRegisterData] = useState({});
  const [loginData, setLoginData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set initial state to false

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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
