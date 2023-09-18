import React, { useState } from "react";
import "../assets/collapsible.css"; // Create this CSS file for styling
import { v4 as uuidv4 } from "uuid";

const Collapsible = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };
  const subLessonTotal = props.content;

  return (
    <div className="collapsible">
      <div className="collapsible-btn">
        <p className="H3 text-[--gray700]">{props.number}</p>
        <button className="collapsible-title H3" onClick={toggleCollapsible}>
          {props.title}
        </button>
        <img src="../../public/image/arrowDropDown.svg" alt="" />
      </div>
      <div
        className={`collapsible-content ${isOpen ? "show" : ""} `} //เช็คเงื่อนให้เพื่อกำหนดชื่อ class
      >
        <div className="py-[24px] Body2 text-[--gray700] ">
          {subLessonTotal.map((item, index) => (
            <ul className="px-[40px]" key={uuidv4()}>
              <li>{item.sublesson_name}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collapsible;
