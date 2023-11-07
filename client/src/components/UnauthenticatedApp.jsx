import '../App.css'
import '../index.css'
import HomePage from '../pages/HomePage.jsx'
import OurCoursePage from '../pages/OurCoursePage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import { Routes, Route } from 'react-router-dom'
import AdminLogin from './adminComponent/Adminlogin'
import React, { PureComponent } from 'react'
import CourseDetailPage from '../pages/CourseDetailPage'
import AdminPage from '../pages/AdminPage/AdminPage'
import AddLessonPage from '../pages/AdminPage/AddLessonPage'
import CourseListPage from '../pages/AdminPage/CourseListPage'
import AddCoursePage from '../pages/AdminPage/AddCoursePage'
import EditCoursePage from '../pages/AdminPage/EditCoursePage'
import EditLessonPage from '../pages/AdminPage/EditLessonPage'
import AssignmentAdminListPage from '../pages/AdminPage/AssignmentAdminListPage.jsx'
import NotFoundPage from './NotFoundPage.jsx'

function UnauthenticatedApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ourcourse" element={<OurCoursePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/admin" element={<AdminPage />} />
        {/* <Route path="/admin/courselist" element={<CourseListPage />} />
        <Route path="/admin/addcourse" element={<AddCoursePage />} />
        <Route path="/admin/addcourse/addlesson" element={<AddLessonPage />} />
        <Route
          path="/admin/addcourse/editlesson/:lessonId"
          element={<EditLessonPage />}
        /> */}
        {/* <Route
          path="/admin/addcourse/addlesson/:lessonId"
          element={<AddLessonPage />}
        /> */}
        {/* <Route path="/admin/editcourse/" element={<EditCoursePage />} />
        <Route path="/admin/editcourse/addlesson" element={<AddLessonPage />} />
        <Route
          path="/admin/editcourse/:courseId/editlesson/:lessonId"
          element={<EditLessonPage />}
        />
        <Route
          path="/admin/assingmentlist"
          element={<AssignmentAdminListPage />}
        /> */}
        <Route
          path="/ourcourse/coursedetail/:id"
          element={<CourseDetailPage />}
        />
      </Routes>
    </>
  )
}

export default UnauthenticatedApp
