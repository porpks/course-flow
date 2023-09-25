/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
function AssignmentTopbar({ setSearchQuery }) {
  const navigate = useNavigate();
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update searchQuery state
  };
  return (
    <>
      <div className="TopBar w-[100%px] h-[92px] px-10 py-4 bg-white border-solid border-b border-t-0 border-l-0 border-r-0 border-gray-300 justify-start items-center gap-4 flex">
        <div className="Assignment grow shrink basis-0 text-slate-800 text-2xl font-medium font-['Inter'] leading-loose">
          Assignment
        </div>
        <div className="ActionWrapper justify-start items-center gap-4 flex">
          <div className="Search h-12 px-4 py-3 bg-white rounded-lg border border-solid border-[--gray300] justify-start items-center gap-2.5 flex">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.7984 4.20005C9.04801 4.20005 7.36927 4.89541 6.13153 6.13315C4.89379 7.37089 4.19844 9.04962 4.19844 10.8C4.19844 12.5505 4.89379 14.2292 6.13153 15.467C7.36927 16.7047 9.04801 17.4001 10.7984 17.4001C12.5489 17.4001 14.2276 16.7047 15.4653 15.467C16.7031 14.2292 17.3984 12.5505 17.3984 10.8C17.3984 9.04962 16.7031 7.37089 15.4653 6.13315C14.2276 4.89541 12.5489 4.20005 10.7984 4.20005ZM2.39844 10.8C2.39855 9.45685 2.72077 8.13327 3.33807 6.94032C3.95537 5.74738 4.84975 4.71986 5.94618 3.94397C7.04261 3.16807 8.30912 2.66642 9.63947 2.48109C10.9698 2.29577 12.3252 2.43218 13.592 2.87888C14.8587 3.32557 15.9999 4.06953 16.9197 5.04835C17.8395 6.02716 18.5112 7.21229 18.8784 8.50432C19.2456 9.79635 19.2977 11.1576 19.0301 12.4739C18.7626 13.7902 18.1833 15.0231 17.3408 16.0693L21.3344 20.064C21.4229 20.1464 21.4938 20.2458 21.543 20.3562C21.5922 20.4666 21.6186 20.5858 21.6207 20.7066C21.6229 20.8275 21.6006 20.9475 21.5554 21.0596C21.5101 21.1716 21.4427 21.2734 21.3573 21.3589C21.2718 21.4444 21.17 21.5117 21.058 21.557C20.9459 21.6023 20.8259 21.6245 20.705 21.6224C20.5842 21.6202 20.465 21.5938 20.3546 21.5446C20.2442 21.4954 20.1448 21.4245 20.0624 21.3361L16.0676 17.3425C14.8335 18.3365 13.3433 18.9612 11.7692 19.1443C10.1952 19.3275 8.60138 19.0616 7.17198 18.3775C5.74257 17.6933 4.53584 16.6188 3.69117 15.278C2.84649 13.9372 2.39833 12.3847 2.39844 10.8Z"
                fill="#646D89"
              />
            </svg>
            <input
              placeholder="Search..."
              className="Search grow shrink basis-0 placeholder:text-slate-400 text-base font-normal font-['Inter'] leading-normal border-none outline-none"
              onChange={handleSearchChange}
            />
          </div>
          <div
            className="Primary px-8 py-4 bg-blue-800 rounded-xl shadow justify-center items-center gap-2.5 flex"
            onClick={() => {
              navigate("/admin/addassingment");
            }}>
            <div className=" text-center text-white text-base font-bold font-['Inter'] leading-normal">
              + Add Assignment
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssignmentTopbar;
