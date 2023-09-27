import React from 'react'
import EditLesson from '../../components/edlitLessonComponent/editLesson'
import NavbarEditLesson from '../../components/edlitLessonComponent/NavbarEditLesson'
import Sidebar from '../../components/Sidebar'

function EditLessonPage() {
  return (
    <div className="flex flex-row">
      {/* <Navbar /> */}
      <Sidebar isCoursePage={true} />
      <EditLesson />
    </div>
  )
}

export default EditLessonPage
