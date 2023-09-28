import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = React.createContext();

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [lesson, setLesson] = useState([]);

  const navigate = useNavigate();

  // ... (other code)

  const loginAdmin = async (loginData) => {
    try {
      // ... (existing login logic)

      if (!response.data.error) {
        console.log("Login successful");
        const admin_id = response.data.data[0].admin_id;
        setAdminId(admin_id);
        localStorage.setItem("adminID", admin_id);
        setIsLoggedIn(true); // Set isLoggedIn to true after successful login
      } else if (response.data.error.status === 400) {
        // Handle login error
      }
    } catch (error) {
      // Handle login error
    }
  };

  const logoutAdmin = () => {
    // Clear admin ID from local storage and reset state
    localStorage.removeItem("adminID");
    setAdminId("");
    setIsLoggedIn(false);
    // You can also add additional logout actions here if needed

    // Redirect to the logout or login page
    navigate("/logout"); // Update this path as needed
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout, // Include the logout function in the contex
        lesson,
        setLesson,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

const useAdminAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAdminAuth };
