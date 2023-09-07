import "../App.css";
import "../index.css";
import HomePage from "../pages/HomePage.jsx";
import OurCoursePage from "../pages/OurCoursePage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import Profile from "../pages/Profile.jsx";
import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "../contexts/AuthContext.jsx";
// import jwtInterceptor from "./utils/jwtInterceptors";

function AuthenticatedApp() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/ourcourse' element={<OurCoursePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='*' element={null} />
      </Routes>
    </>
  );
}

export default AuthenticatedApp;
