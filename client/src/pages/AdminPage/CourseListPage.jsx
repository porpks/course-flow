import React from "react";
import Sidebar from "../../components/Sidebar";
import CourseList from "../../components/adminCourseListComponent/courselist";

function CourseListPage() {
  return (
    <div className="flex">
      <Sidebar isCoursePage={true} />
      <CourseList />
    </div>
  );
}

export default CourseListPage;
