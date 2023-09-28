import React from 'react'
import AddLesson from '../../components/addLessonComponent/AddLesson'
import Navbar from '../../components/addLessonComponent/Navbar'
import Sidebar from '../../components/Sidebar'

function AddLessonPage() {
  return (
    <div className="w-screen flex items-center justify-center">
      <div className="flex flex-row justify-center w-[1440px]">
        {/* <Navbar /> */}
        <Sidebar isCoursePage={true} />
        <AddLesson />
      </div>
    </div>
  )
}

export default AddLessonPage
