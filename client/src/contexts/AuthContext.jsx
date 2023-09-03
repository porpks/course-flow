import React, { useState } from "react";

const AuthContext = React.createContext();

function AuthProvider(props) {
    const [state, setState] = useState("eiei")
    const [registerData, setRegisterData] = useState({})
    const [loginData, setLoginData] = useState({})
    return (
        <AuthContext.Provider
            value={{
                state, setState,
                registerData, setRegisterData,
                loginData, setLoginData,
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };