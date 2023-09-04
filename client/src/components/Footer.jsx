import "./footer.css";
import CourseFlowIcon from "../assets/CourseFlowIcon";
import { Link, useNavigate } from "react-router-dom";
function Footer() {
  const navigate = useNavigate();
  return (
    <div className="footerBg bg-[--blue700]">
      <div className="footerGrid">
        <div className="courseLogo cursor-default ">
          <a
            href="#homepage"
            onClick={() => {
              navigate("/");
            }}
          >
            <CourseFlowIcon />
          </a>
        </div>
        <div className="linkContents">
          <a
            href=""
            className="Body2 text-[--gray500] w-[140px] cursor-pointer no-underline"
          >
            All Course
          </a>
          <a
            href=""
            className="Body2 text-[--gray500] w-[140px] cursor-pointer no-underline"
          >
            Bundle Package
          </a>
        </div>
        <div className="socialMedia">
          <a href="https://www.facebook.com" target="_blank">
            <img src="../../public/image/fbLogo.svg" alt="fbLogo" />
          </a>
          <a href="https://www.instagram.com" target="_blank">
            <img src="../../public/image/igLogo.svg" alt="igLogo" />
          </a>
          <a href="https://www.twitter.com" target="_blank">
            <img src="../../public/image/twLogo.svg" alt="twLogo" />
          </a>
        </div>
      </div>
    </div>
  );
}
export default Footer;
