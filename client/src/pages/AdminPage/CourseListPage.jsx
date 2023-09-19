import React from "react";
import Sidebar from "../../components/Sidebar";
import Courselist from "../../components/adminCourseListComponent/courselist";

function CourseListPage() {
  return (
    <div className="flex">
      <Sidebar isCoursePage={true} />
      <Courselist />
    </div>
  );
}

export default CourseListPage;
