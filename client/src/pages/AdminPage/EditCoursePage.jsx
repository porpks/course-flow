import React from 'react'
import AdminEditCourse from '../../components/adminEditCourse/AdminEditCourse'
import Sidebar from '../../components/Sidebar'

export default function EditCoursePage() {
  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="w-[240px]  shadow-xl">
          <Sidebar isCoursePage={true} />
        </div>
        <div className="w-[1200px]  shadow-xl">
          <AdminEditCourse />
        </div>
      </div>
    </>
  )
}
