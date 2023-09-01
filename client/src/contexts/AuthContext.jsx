import React, { useState } from "react";

const AuthContext = React.createContext();

function AuthProvider(props) {
    const [state, setState] = useState("eiei")
    const [registerData, setRegisterData] = useState({})
    const [isRegister, setIsRegister] = useState(false)
    const [loginData, setLoginData] = useState({})
    const [isLogin, setIsLogin] = useState(false)
    return (
        <AuthContext.Provider
            value={{
                state, setState,
                registerData, setRegisterData,
                isRegister, setIsRegister,
                loginData, setLoginData,
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };