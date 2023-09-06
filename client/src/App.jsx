import "./App.css";
import "./index.css";
import HomePage from "./pages/HomePage.jsx";
import OurCoursePage from "./pages/OurCoursePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Profile from "./pages/Profile.jsx";
import CourseDetailPage from "./pages/CourseDetailPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";

function App() {
  return (
    <>
      {/* 
      <div className="w-[500px] h-[500px] bg-[--blue100] Shadow2"></div>
      <h1 className="H1">ทดสอบ H1</h1>
      <p className="Body1">ทดสอบ B1</p>
      <Icon width="100" height="100" />
      <FacebookIcon /> */}
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ourcourse" element={<OurCoursePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/ourcourse/coursedetail" element={<CourseDetailPage />} />
            <Route path="*" element={null} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
