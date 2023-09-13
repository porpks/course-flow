import "../App.css";
import "../index.css";
import HomePage from "../pages/HomePage.jsx";
import OurCoursePage from "../pages/OurCoursePage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./adminComponent/Adminlogin";
import React, { PureComponent } from "react";
import CourseDetailPage from "../pages/CourseDetailPage";

function UnauthenticatedApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ourcourse" element={<OurCoursePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={null} />{" "}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="*" element={null} />
        <Route
          path="/ourcourse/coursedetail/:id"
          element={<CourseDetailPage />}
        />
      </Routes>
    </>
  );
}

export default UnauthenticatedApp;
