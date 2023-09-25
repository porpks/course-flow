import React from 'react'
import AddLesson from '../../components/addLessonComponent/AddLesson'
import Navbar from '../../components/addLessonComponent/Navbar'
import Sidebar from '../../components/Sidebar'

function AddLessonPage() {
  return (
    <div className="flex flex-row">
      {/* <Navbar /> */}
      <Sidebar isCoursePage={true} />
      <AddLesson />
    </div>
  )
}

export default AddLessonPage
