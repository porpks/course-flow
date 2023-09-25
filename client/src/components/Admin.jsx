import '../App.css'
import '../index.css'
import { Routes, Route } from 'react-router-dom'
import AdminLogin from './adminComponent/Adminlogin'
import React, { PureComponent } from 'react'
import AdminPage from '../pages/AdminPage/AdminPage'
import AddLessonPage from '../pages/AdminPage/AddLessonPage'
import CourseListPage from '../pages/AdminPage/CourseListPage'
import AddCoursePage from '../pages/AdminPage/AddCoursePage'
import EditCoursePage from '../pages/AdminPage/EditCoursePage'
import EditLessonPage from '../pages/AdminPage/EditLessonPage'
import AssignmentAdminListPage from '../pages/AdminPage/AssignmentAdminListPage.jsx'

function AdminApp() {
  return (
    <>
      <Routes>
        <Route path="*" element={null} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/courselist" element={<CourseListPage />} />
        <Route path="/admin/addcourse" element={<AddCoursePage />} />
        <Route
          path="/admin/editcourse/:courseId"
          element={<EditCoursePage />}
        />
        <Route path="/admin/editcourse/addlesson" element={<AddLessonPage />} />
        <Route
          path="/admin/editcourse/:courseId/editlesson/:lessonId"
          element={<EditLessonPage />}
        />
        <Route
          path="/admin/assingmentlist"
          element={<AssignmentAdminListPage />}
        />
        <Route
          path="/ourcourse/coursedetail/:id"
          element={<CourseDetailPage />}
        />
      </Routes>
    </>
  )
}

export default AdminApp
