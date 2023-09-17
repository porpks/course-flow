import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
// import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext.jsx";
// import jwtInterceptor from "./utils/jwtInterceptors.jsx";
import AssignmentAdminnListPage from "./pages/AssignmentAdminnListPage";
// jwtInterceptor();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <AuthProvider> */}
    {/* <App /> */}
    <AssignmentAdminnListPage />
    {/* </AuthProvider>
    </BrowserRouter> */}
  </React.StrictMode>
);
