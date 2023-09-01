import SubFooterIMG from "../assets/SubFooterIMG.jsx";

function SubFooter() {
  const footerStyle = {
    background: "linear-gradient(271deg, #5697ff 7.78%, #2558dd 73.86%)",
  };

  return (
    <>
      <body className="flex flex-row justify-center" style={footerStyle}>
        <footer className="h-[90vh] w-[80vw] flex flex-row justify-between">
          <div className="w-[40vw] flex flex-col justify-evenly items-start ">
            <h1 className="H2 text-white w-[70%]">
              Interested in Becoming a Software Developer?
            </h1>
            <button className="text-[16px] font-[700] justify-center px-[32px] py-[18px]  text-[--orange500] rounded-[12px] border-[--orange500]">
              Check Out Our Course
            </button>
          </div>
          <div className="w-[40vw]">
            <SubFooterIMG />
          </div>
        </footer>
      </body>
    </>
  );
}
export default SubFooter;
