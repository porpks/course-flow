import "./App.css";
import "./index.css";

// import HomePage from "./pages/HomePage.jsx";
// import OurCoursePage from "./pages/OurCoursePage.jsx";
// import RegisterPage from "./pages/RegisterPage.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import Profile from "./pages/Profile.jsx";

// import jwtInterceptor from "./utils/jwtInterceptors";
import { useAuth } from "./contexts/AuthContext.jsx";
import AuthenticatedApp from "./components/AuthenticatedApp.jsx";
import UnauthenticatedApp from "./components/UnauthenticatedApp.jsx";
import React from "react";
import ReactDOM from "react-dom";
import AdminAuthenApp from "./components/AdminAuthen.jsx";
// Disable the warning

ReactDOM.unstable_disableWarnOnNestedVirtualComponents = true;
function App() {
  const auth = useAuth();
  const { isAdminAuthenticated } = useAuth();
  return isAdminAuthenticated ? (
    <AdminAuthenApp />
  ) : auth.isAuthenticated ? (
    <AuthenticatedApp />
  ) : (
    <UnauthenticatedApp />
  );
}
export default App;
