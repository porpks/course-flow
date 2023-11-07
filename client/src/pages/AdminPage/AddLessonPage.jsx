import React from 'react'
import AddLesson from '../../components/addLessonComponent/AddLesson'
import Sidebar from '../../components/Sidebar'

function AddLessonPage() {
  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="w-[240px]  shadow-xl">
          <Sidebar isCoursePage={true} />
        </div>
        <div className="w-[1200px]  shadow-xl">
          <AddLesson />
        </div>
      </div>
    </>
  )
}

export default AddLessonPage
