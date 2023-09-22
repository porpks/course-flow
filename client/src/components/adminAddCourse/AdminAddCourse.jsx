import React from "react";
import "./adminAddCourse.css";
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
          <div className="topNav  flex  items-center gap-[16px] px-[40px] py-[16px] w-100% bg  ">
            <div className="H3 flex-1">Add Course</div>
            <button className="Secondary Shadow1">Cancel</button>
            <button className="Primary Shadow1 border-none">Create</button>
          </div>
          {/* MIDDLE-AREA */}
          <div className="p-[40px] bg-[--gray100] ">
            {/* PACKAGE WRAPPER  */}
            <div className="packageWrapper px-[100px] pt-[40px] pb-[60px] w-full h-full mb-[24px] ">
              <Formik>
                <Form className="flex flex-col  gap-[40px]">
                  <div className="flex flex-col gap-[4px]">
                    <label className="">Course name *</label>
                    <Field
                      type="text"
                      name="courseName"
                      id="courseName"
                      placeholder="Enter Course Name"
                      className="Input"
                    />
                  </div>
                  <div className="flex gap-[80px] ">
                    <div className="flex flex-col flex-1 gap-[4px] ">
                      <label className="">Price *</label>
                      <Field
                        type="text"
                        name="courseName"
                        id="courseName"
                        placeholder="Enter Course Price"
                        className="Input"
                      />
                    </div>
                    <div className="flex flex-col flex-1 gap-[4px]">
                      <label className="">Total learning time *</label>
                      <Field
                        type="text"
                        name="courseName"
                        id="courseName"
                        placeholder="Enter Course Name"
                        className="Input"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <label className="">Course summary *</label>
                    <Field
                      as="textarea"
                      type="text"
                      name="courseName"
                      id="courseName"
                      placeholder="Enter Course Name"
                      className="Input h-[100px] resize-none"
                    />
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <label className="">Course detail *</label>
                    <Field
                      as="textarea"
                      type="text"
                      name="courseName"
                      id="courseName"
                      placeholder="Enter Course Name"
                      className="Input h-[220px] resize-none"
                    />
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <label className="">Cover image *</label>
                    <div className="relative h-fit">
                      <div className="relative bg-[--gray100] w-[358px] h-[358px] object-cover	rounded-2xl group	">
                        <div
                          className="
                          upload-position   w-[200px] h-[200px] 
                          flex flex-col justify-center items-center  
                          text-[--blue500] text-center text-xl rounded-2xl
                       "
                        >
                          <div className="text-[48px] font-extralight mb-3">
                            +
                          </div>
                          <div className="text-[20px] font-medium">
                            Upload Image
                          </div>
                        </div>
                        <div
                          className="
                          upload-position w-[90%] h-[90%]
                         hover:bg-[rgba(264,264,264,0.25)] rounded-lg cursor-pointer group-hover:block border-[--blue500] border-[2px] hover:border-dashed"
                        >
                          <label
                            htmlFor="upload"
                            className="hidden group-hover:block w-full h-full  text-[--blue500] text-center text-xl  cursor-pointer"
                          >
                            <input
                              id="upload"
                              name="avatar"
                              type="file"
                              onChange={(e) => handleFileChange(e)}
                              hidden
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <label className="">Video Trailer *</label>
                    <div className="relative h-fit">
                      <div className="relative bg-[--gray100] w-[358px] h-[358px] object-cover	rounded-2xl group	">
                        <div
                          className="
                          upload-position   w-[200px] h-[200px] 
                          flex flex-col justify-center items-center  
                          text-[--blue500] text-center text-xl rounded-2xl
                       "
                        >
                          <div className="text-[48px] font-extralight mb-3">
                            +
                          </div>
                          <div className="text-[20px] font-medium">
                            Upload Video Trailer
                          </div>
                        </div>
                        <div
                          className="
                          upload-position w-[90%] h-[90%]
                         hover:bg-[rgba(264,264,264,0.25)] rounded-lg cursor-pointer group-hover:block border-[--blue500] border-[2px] hover:border-dashed"
                        >
                          <label
                            htmlFor="upload"
                            className="hidden group-hover:block w-full h-full  text-[--blue500] text-center text-xl  cursor-pointer"
                          >
                            <input
                              id="upload"
                              name="avatar"
                              type="file"
                              onChange={(e) => handleFileChange(e)}
                              hidden
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
            {/* add-lesson */}
            <div className="add-lesson flex flex-row gap-[16px] items-center mb-[43px]">
              <div className="H3 flex-1">Lesson</div>
              <button className="Primary Shadow1 px-[32px] py-[18px] justify-center border-none">
                + Add Lesson
              </button>
            </div>
            {/* table-SubLesson */}
            <div className="table-SubLesson">table-SubLesson</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminAddCourse;
