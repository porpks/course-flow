import "../App.css";
import "../index.css";
import HomePage from "../pages/HomePage.jsx";
import OurCoursePage from "../pages/OurCoursePage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import Profile from "../pages/Profile.jsx";
import CourseDetailPage from "../pages/CourseDetailPage";
import MyCoursePage from "../pages/MyCoursePage";
import DesireCoursePage from "../pages/DesireCoursePage";
import AssignmentPage from "../pages/AssignmentPage";
import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "../contexts/AuthContext.jsx";
// import jwtInterceptor from "./utils/jwtInterceptors"
import { useAuth } from "../contexts/AuthContext.jsx";
import LearningPage from "../pages/LearningPage";
import { useParams } from "react-router-dom";

function AuthenticatedApp() {
  const { userID } = useAuth();

  const ProtectedProfileRoute = () => {
    const params = useParams();
    const userId = Number(params.id);
    if (userID == userId) {
      return <Profile />;
    } else {
      localStorage.removeItem("token");
      return <LoginPage />;
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ourcourse" element={<OurCoursePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path={`/profile/:id`} element={<ProtectedProfileRoute />} />
        <Route path="/ourcourse/coursedetail/:id" element={<CourseDetailPage />} />
        <Route path="/mycourse" element={<MyCoursePage />} />
        <Route path="/desire/:userId" element={<DesireCoursePage />} />
        <Route path="/assignment" element={<AssignmentPage />} />
        <Route path="/learning" element={<LearningPage />} />

        <Route path="*" element={null} />
      </Routes>
    </>
  );
}

export default AuthenticatedApp;
