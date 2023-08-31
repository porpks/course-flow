import { useState } from "react";
import "./App.css";
import "./index.css";
import "./assets/Icon.jsx";
import Icon from "./assets/Icon.jsx";
import ProtectIcon from "./assets/ProtectIcon.jsx";
import HeartIcon from "./assets/HeartIcon.jsx";
import MultiPeopleIcon from "./assets/MultiPeopleIcon.jsx";
import FacebookIcon from "./assets/FacebookIcon.jsx";

function App() {
  return (
    <>
      <p className="read-the-docs text-blue-500">
        Click on the Vite and React logos to learn more
      </p>
      <div className="w-[500px] h-[500px] bg-[--blue100] Shadow2"></div>
      <div className="w-[500px] h-[500px] bg-[--blue500] Shadow1 "></div>
      <h1 className="H1">ทดสอบ H1</h1>
      <h2 className="H2">ทดสอบ H2</h2>
      <h3 className="H3">ทดสอบ H3</h3>
      <p className="Body1">ทดสอบ B1</p>
      <p className="Body2">ทดสอบ B2</p>
      <p className="Body3">ทดสอบ B3</p>
      <p className="Body4">ทดสอบ B4</p>
      <p className="Body4">ทดสอบ B5</p>
      <img src={Icon} alt="" />
      <img src={ProtectIcon} alt="" />
      <Icon width="100" height="100" />
      <FacebookIcon />
    </>
  );
}

export default App;
