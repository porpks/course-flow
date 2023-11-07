import SubFooterIMG from "../assets/SubFooterIMG.jsx";
import { useNavigate } from "react-router-dom";

function SubFooter() {
  const footerStyle = {
    background: "linear-gradient(271deg, #5697ff 7.78%, #2558dd 73.86%)",
  };
  const navigate = useNavigate();

  return (
    <>
      <div
        className='flex flex-row justify-center h-[500px] relative'
        style={footerStyle}>
        <footer className=' w-[80vw] flex flex-row justify-between relative '>
          <div className='w-[40vw] flex flex-col justify-evenly items-start '>
            <h1 className='H2 text-white w-[70%]'>
              Interested in Becoming a Software Developer?
            </h1>
            <a href=''>
              <button
                className='Secondary hover-scale'
                onClick={() => {
                  navigate("/ourcourse");
                }}>
                Check Out Our Course
              </button>
            </a>
          </div>

          <svg
            width='27'
            height='27'
            viewBox='0 0 27 27'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='absolute left top-[403px] left-[406px]'>
            <circle
              cx='13.1741'
              cy='13.1741'
              r='11.6741'
              stroke='#2FAC8E'
              strokeWidth='3'
            />
          </svg>
          <div className='w-[40vw] self-end'>
            <a href=''>
              <SubFooterIMG height='448.594' width='592' />
            </a>
            <svg
              width='37'
              height='37'
              viewBox='0 0 37 37'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='absolute top-[128px] right-[-55px]'>
              <path
                d='M34.9135 34.9134L2.46871 26.2199L26.22 2.4686L34.9135 34.9134Z'
                stroke='white'
                strokeWidth='2'
              />
            </svg>
          </div>
        </footer>
      </div>
    </>
  );
}
export default SubFooter;
