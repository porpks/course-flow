import React from 'react'
import AdminAddCourse from '../../components/adminAddCourse/AdminAddCourse'
import Sidebar from '../../components/Sidebar'

function AddCoursePage() {
  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="w-[240px]">
          <Sidebar isCoursePage={true} />
        </div>
        <div className="w-[1200px]">
          <AdminAddCourse />
        </div>
      </div>
    </>
  )
}

export default AddCoursePage
