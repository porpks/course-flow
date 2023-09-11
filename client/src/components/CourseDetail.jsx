import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./courseDetail.css";
import Collapsible from "../assets/Collapsible.jsx";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Model_mocking from "../assets/test/Model_mocking";
import Mymodal from "../components/Mymodal";
import { Hidden } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "480px",
  backgroundColor: "white",
  boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.2)",
  padding: "16px",
};

function CourseDetail() {
  const navigate = useNavigate();
  const [desireToggle, setDesireToggle] = useState(false);
  const openDesire = () => setDesireToggle(true);
  const closeDesire = () => setDesireToggle(false);

  const [subscribeToggle, setSubscribeToggle] = useState(false);
  const openSubscribe = () => setSubscribeToggle(true);
  const closeSubscribe = () => setSubscribeToggle(false);

  return (
    <section className="flex justify-center items-center border-2 border-sky-500">
      <div className="canvas_CourseDetail ">
        <div className="back-btn">
          <a
            onClick={() => {
              navigate("/ourcourse");
            }}
            className="flex flex-row justify-start items-center px-[8px] py-[4px] gap-[8px] cursor-pointer">
            <img src="../../public/image/arrow_back.svg" alt="arrow_back" />
            <p className="text-[--blue500] font-[700] text-[16px]">Back</p>
          </a>
        </div>
        <div className="flex gap-[30px]">
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
                {/* <Collapsible
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
                /> */}
              </div>
            </div>
          </div>

          <div className="Subscribe_box Shadow1">
            <div>
              <p className="Body3 text-[--orange500]">Course</p>
            </div>
            <div className="course-Subscribe flex flex-col gap-[8px]">
              <p className="course-title H3">Service Design Essentials</p>
              <p className="course-description Body2 text-[--gray700]">
                Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.
              </p>
            </div>
            <div className="course-price  H3 text-[--gray700] flex flex-row justify-center items-center">
              <p className="mr-[1rem]">THB</p>
              <p>3,559.00</p>
            </div>
            <div className="btn-grp">
              <button onClick={openDesire} className="Secondary w-[100%]">
                Get in Desire Course
              </button>
              {desireToggle ? (
                <Mymodal
                  open={desireToggle}
                  onClose={closeDesire}
                  closeButton={closeDesire}
                  description="Do you sure to add Service Design Essentials to your desire Course?"
                  yesDes="Yes, add this to my desire course"
                  noDes="No, I don’t"
                />
              ) : (
                null
              )}
              {subscribeToggle ? (
                <Mymodal
                  open={subscribeToggle}
                  onClose={closeSubscribe}
                  closeButton={closeSubscribe}
                  description="Do you sure to subscribe Service Design Essentials Course?"
                  yesDes="Yes, I want to subscribe"
                  noDes="No, I don’t"
                />
              ) : (
                null
              )}
              <button onClick={openSubscribe} className="Primary w-[100%]">
                Subscribe This Course
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                {/* <Model_mocking /> */}

                <div
                  className="model-box Shadow1 rounded-[24px] flex flex-col gap-[24px] p-[24px]"
                  style={style}
                >
                  <div className="top-model flex flex-row justify-between items-center">
                    <p className="Body1">Confirmation</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="41"
                      height="40"
                      viewBox="0 0 41 40"
                      fill="none"
                    >
                      <path
                        d="M15.5303 24.8483L25.4697 15.1514M15.5303 15.1514L25.4697 24.8483"
                        stroke="#C8CCDB"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="detail-model flex flex-col gap-[24px] ">
                    <p>
                      Do you sure to subscribe Service Design Essentials Course?
                    </p>
                    <div className="btn-box flex gap-[16px]">
                      <button className="Secondary">No, I don’t</button>
                      <button className="Primary">
                        Yes, I want to subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseDetail;
