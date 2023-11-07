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
import AdminPage from "../pages/AdminPage/AdminPage";
import AddLessonPage from "../pages/AdminPage/AddLessonPage";
import CourseListPage from "../pages/AdminPage/CourseListPage";
import AddCoursePage from "../pages/AdminPage/AddCoursePage";
import EditCoursePage from "../pages/AdminPage/EditCoursePage";
import EditLessonPage from "../pages/AdminPage/EditLessonPage";
import AssignmentAdminListPage from "../pages/AdminPage/AssignmentAdminListPage.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import AddAssignmentPage from "../pages/AdminPage/AddAssignmentPage";
import EditAssignmentPage from "../pages/AdminPage/EditAssignmentPage";

function AdminAuthenApp() {
  const { userId, logout } = useAuth();

  const ProtectedProfileRoute = () => {
    const params = useParams();
    const userID = Number(params.id);
    if (userId == userID) {
      return <Profile />;
    } else {
      // localStorage.removeItem("token");
      // setIsLoggedIn(false);
      logout();
      return <LoginPage />;
    }
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/ourcourse' element={<OurCoursePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path={`/profile/:id`} element={<ProtectedProfileRoute />} />
        <Route
          path='/ourcourse/coursedetail/:id'
          element={<CourseDetailPage />}
        />
        <Route path='/mycourse' element={<MyCoursePage />} />
        <Route path='/desire' element={<DesireCoursePage />} />
        <Route path='/assignment' element={<AssignmentPage />} />
        <Route path='/learning/:courseId' element={<LearningPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/admin/courselist' element={<CourseListPage />} />
        <Route path='/admin/addcourse' element={<AddCoursePage />} />
        <Route path='/admin/addcourse/addlesson' element={<AddLessonPage />} />
        <Route
          path='/admin/addcourse/editlesson/:lessonId'
          element={<EditLessonPage />}
        />
        <Route
          path='/admin/editcourse/:courseId'
          element={<EditCoursePage />}
        />
        <Route path='/admin/editcourse/addlesson' element={<AddLessonPage />} />
        <Route
          path='/admin/editcourse/:courseId/editlesson/:lessonId'
          element={<EditLessonPage />}
        />
        <Route
          path='/admin/assingmentlist'
          element={<AssignmentAdminListPage />}
        />
        <Route path='/admin/addassingment' element={<AddAssignmentPage />} />
        <Route
          path='/admin/editassingment/:assignId'
          element={<EditAssignmentPage />}
        />
        <Route path='*' element={<NotFoundPage />} />{" "}
      </Routes>
    </>
  );
}

export default AdminAuthenApp;
