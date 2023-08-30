import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";

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
    </>
  );
}

export default App;
