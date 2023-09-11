import React, { useState } from "react";
import "../assets/collapsible.css"; // Create this CSS file for styling

const Collapsible = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible">
      <div className="collapsible-btn">
        <p className="H3 text-[--gray700]">00</p>
        <button className="collapsible-title H3" onClick={toggleCollapsible}>
          {title}
        </button>
        <img src="../../public/image/arrowDropDown.svg" alt="" />
      </div>
      <div
        className={`collapsible-content ${isOpen ? "show" : ""}`} //เช็คเงื่อนให้เพื่อกำหนดชื่อ class
      >
        {content}
      </div>
    </div>
  );
};

export default Collapsible;
