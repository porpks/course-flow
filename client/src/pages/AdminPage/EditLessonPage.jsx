import React from 'react'
import EditLesson from '../../components/edlitLessonComponent/editLesson'
import NavbarEditLesson from '../../components/edlitLessonComponent/NavbarEditLesson'
import Sidebar from '../../components/Sidebar'

function EditLessonPage() {
  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="w-[240px]">
          <Sidebar isCoursePage={true} />
        </div>
        <div className="w-[1200px]">
          <EditLesson />
        </div>
      </div>
    </>
  )
}

export default EditLessonPage
