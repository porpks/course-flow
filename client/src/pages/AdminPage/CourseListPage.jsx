import React from 'react'
import Sidebar from '../../components/Sidebar'
import CourseList from '../../components/adminCourseListComponent/courselist'

function CourseListPage() {
  return (
    <>
      <div className="flex justify-center w-full">
        <div className="w-[240px]  shadow-xl">
          <Sidebar isCoursePage={true} />
        </div>
        <div className="flex flex-col w-[1200px]  shadow-xl">
          <CourseList />
        </div>
      </div>
    </>
  )
}

export default CourseListPage
