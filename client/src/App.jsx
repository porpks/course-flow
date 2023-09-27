import './App.css'
import './index.css'

// import HomePage from "./pages/HomePage.jsx";
// import OurCoursePage from "./pages/OurCoursePage.jsx";
// import RegisterPage from "./pages/RegisterPage.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import Profile from "./pages/Profile.jsx";

// import jwtInterceptor from "./utils/jwtInterceptors";
import { useAuth } from './contexts/AuthContext.jsx'
import AuthenticatedApp from './components/AuthenticatedApp.jsx'
import UnauthenticatedApp from './components/UnauthenticatedApp.jsx'
import React from 'react'
import ReactDOM from 'react-dom'

// Disable the warning
ReactDOM.unstable_disableWarnOnNestedVirtualComponents = true
function App() {
  const auth = useAuth()

  return auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />
}
export default App
