import React, { useState } from "react";

const AuthContext = React.createContext();

function AuthProvider(props) {
    const [state, setState] = useState("eiei")
    return (
        <AuthContext.Provider
            value={{ state, setState }}>
            {props.children}
        </AuthContext.Provider>
    )
}
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };