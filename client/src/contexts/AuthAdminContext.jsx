import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = React.createContext();
import secureLocalStorage from "react-secure-storage";

function AuthAdminProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AuthContext.Provider
          value={{
            isLoggedIn,
            setIsLoggedIn,
            
          }}
        >
          {props.children}
        </AuthContext.Provider>
      );
    }
}




const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };