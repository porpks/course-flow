import React from 'react'
import Sidebar from '../../components/Sidebar'
import CourseList from '../../components/adminCourseListComponent/courselist'

function CourseListPage() {
  return (
    <>
      <div className="flex justify-center w-full">
        <div className="w-[240px]">
          <Sidebar isCoursePage={true} />
        </div>
        <CourseList />
      </div>
    </>
  )
}

export default CourseListPage
