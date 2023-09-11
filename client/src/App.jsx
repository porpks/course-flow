import "./App.css";
import "./index.css";
<<<<<<< HEAD
import HomePage from "./pages/HomePage.jsx";
import OurCoursePage from "./pages/OurCoursePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Profile from "./pages/Profile.jsx";
import MycoursePage from "./pages/MyCoursePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import jwtInterceptor from "./utils/jwtInterceptor";
jwtInterceptor();

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
            <Route path="/mycourse" element={<MycoursePage />} />
            <Route path="*" element={null} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
=======
// import HomePage from "./pages/HomePage.jsx";
// import OurCoursePage from "./pages/OurCoursePage.jsx";
// import RegisterPage from "./pages/RegisterPage.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import Profile from "./pages/Profile.jsx";

// import jwtInterceptor from "./utils/jwtInterceptors";
import { useAuth } from "./contexts/AuthContext.jsx";
import AuthenticatedApp from "./components/AuthenticatedApp.jsx";
import UnauthenticatedApp from "./components/UnauthenticatedApp.jsx";

function App() {
  const auth = useAuth()
  return auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
>>>>>>> 4999396e16914f9695ca3c3f9ece7810f9e493cc
}
export default App;
