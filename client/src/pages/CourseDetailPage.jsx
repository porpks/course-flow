import React from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import CourseDetail from "../components/CourseDetail.jsx";
import SubFooter from "../components/SubFooter.jsx";

function CourseDetailPage() {
  return (
    <>
      <Navbar />
      <CourseDetail />
      <SubFooter />
      <Footer />
    </>
  );
}

export default CourseDetailPage;
