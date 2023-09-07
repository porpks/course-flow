import React from "react";
import "./courseDetail.css";
import Collapsible from "../assets/Collapsible.jsx";
function CourseDetail() {
  return (
    <section className="flex justify-center items-center border">
      <div className="canvas_CourseDetail ">
        <div className="back-btn">
          <a className="flex flex-row justify-start items-center px-[8px] py-[4px] gap-[8px] cursor-pointer">
            <img src="../../public/image/arrow_back.svg" alt="arrow_back" />
            <p className="text-[--blue500] font-[700] text-[16px]">Backup</p>
          </a>
        </div>
        <div className="flex gap-[24px]">
          <div className="CourseDetail">
            <div className="vdo-preview">
              <img
                src="../../public/image/VDO_coursePreview.svg"
                alt=""
                className="rounded-[8px] w-[739px] h-[460px] cursor-pointer"
              />
            </div>
            <div className="CourseDetail_description flex flex-col gap-[24px]">
              <div className="courseDetail_title ">
                <p className="H2">Course Detail</p>
              </div>
              <div className="courseDetail_body">
                <p className="Body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Elementum aenean fermentum, velit vel, scelerisque morbi
                  accumsan. Nec, tellus leo id leo id felis egestas. Quam sit
                  lorem quis vitae ut mus imperdiet. Volutpat placerat dignissim
                  dolor faucibus elit ornare fringilla. Vivamus amet risus
                  ullamcorper auctor nibh. Maecenas morbi nec vestibulum ac
                  tempus vehicula.
                  <br />
                  <br />
                  Vel, sit magna nisl cras non cursus. Sed sed sit ullamcorper
                  neque. Dictum sapien amet, dictumst maecenas. Mattis nulla
                  tellus ut neque euismod cras amet, volutpat purus. Semper
                  purus viverra turpis in tempus ac nunc. Morbi ullamcorper sed
                  elit enim turpis. Scelerisque rhoncus morbi pulvinar donec at
                  sed fermentum. Duis non urna lacus, sit amet. Accumsan orci
                  elementum nisl tellus sit quis. Integer turpis lectus eu
                  blandit sit. At at cras viverra odio neque nisl consectetur.
                  Arcu senectus aliquet vulputate urna, ornare. Mi sem tellus
                  elementum at commodo blandit nunc. Viverra elit adipiscing ut
                  dui, tellus viverra nec.
                  <br />
                  <br />
                  <br />
                  Lectus pharetra eget curabitur lobortis gravida gravida eget
                  ut. Nullam velit morbi quam a at. Sed eu orci, sociis nulla at
                  sit. Nunc quam integer metus vitae elementum pulvinar mattis
                  nulla molestie. Quis eget vestibulum, faucibus malesuada eu.
                  Et lectus molestie egestas faucibus auctor auctor.
                </p>
              </div>
            </div>
            <div className="lesson_sample">
              <p className="H2 text-[--black] mb-[24px]">Module Samples</p>
              <div className="collapsible-contents">
                <Collapsible
                  title="Introduction"
                  content="This is the content 01"
                />
                <Collapsible
                  title="Introduction"
                  content="This is the content 02"
                />
                <Collapsible
                  title="Introduction"
                  content="This is the content 03"
                />
                <Collapsible
                  title="Introduction"
                  content="This is the content 04"
                />
                <Collapsible
                  title="Introduction"
                  content="This is the content 05"
                />
                <Collapsible
                  title="Introduction"
                  content="This is the content 06"
                />
              </div>
            </div>
          </div>

          <div className="Subscribe_box Shadow1">
            <div className="Subscribe-content w-[245px] h-[100%] bg-black flex justify-center items-center">
              <p className="text-white">Content</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseDetail;
