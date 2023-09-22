import React from "react";

import Sidebar from "../Sidebar";

import { Formik, Form, Field } from "formik";
function AdminAddCourse() {
  return (
    <>
      <div className="canvas flex flex-row">
        {/* LEFT-NAV */}
        <div className="">
          <Sidebar />
        </div>
        {/* RIGHT-NAV */}
        <div className="w-full">
          <div className="topNav flex  items-center gap-[16px] px-[40px] py-[16px]  w-100%">
            <div className="H3 flex-1">Add Course</div>
            <button className="Secondary Shadow1">Cancel</button>
            <button className="Primary Shadow1 border-none">Create</button>
          </div>
          {/* MIDDLE-AREA */}
          <div className="p-[40px] bg-orange-200 ">
            {/* PACKAGE  */}
            <div className="px-[100px] pt-[40px] pb-[60px] w-full h-full  bg-stone-500 ">
              <Formik>
                <Form className="flex flex-col  gap-[40px]">
                  <div className="">
                    <label className="">Course name *</label>
                    <Field
                      type="text"
                      name="courseName"
                      id="courseName"
                      placeholder="Enter Course Name"
                      className=""
                    />
                  </div>
                  <div className="">
                    <label className="">Course name *</label>
                    <Field
                      type="text"
                      name="courseName"
                      id="courseName"
                      placeholder="Enter Course Name"
                      className=""
                    />
                  </div>
                  <div className="">
                    <label className="">Course name *</label>
                    <Field
                      type="text"
                      name="courseName"
                      id="courseName"
                      placeholder="Enter Course Name"
                      className=""
                    />
                  </div>
                  <div className="">
                    <label className="">Course name *</label>
                    <Field
                      type="text"
                      name="courseName"
                      id="courseName"
                      placeholder="Enter Course Name"
                      className=""
                    />
                  </div>
                  <div className="">
                    <label className="">Course name *</label>
                    <Field
                      type="text"
                      name="courseName"
                      id="courseName"
                      placeholder="Enter Course Name"
                      className=""
                    />
                  </div>
                  <div className="">
                    <label className="">Course name *</label>
                    <Field
                      type="text"
                      name="courseName"
                      id="courseName"
                      placeholder="Enter Course Name"
                      className=""
                    />
                  </div>
                  <div className="">
                    <label className="">Course name *</label>
                    <Field
                      type="text"
                      name="courseName"
                      id="courseName"
                      placeholder="Enter Course Name"
                      className=""
                    />
                  </div>
                </Form>
              </Formik>
            </div>
            {/* add-lesson */}
            <div className="add-lesson flex flex-row gap-[16px] items-center ">
              <div className="H3 flex-1">Lesson</div>
              <button className="Primary Shadow1 px-[32px] py-[18px] justify-center border-none">
                + Add Lesson
              </button>
            </div>
            {/* table-SubLesson */}
            <div className="table-SubLesson">{/* <Example /> */}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminAddCourse;
