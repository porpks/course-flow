import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Mymodal from "../Mymodal";
import CircularIndeterminate from "../../assets/loadingProgress.jsx";
import SnackBar from "../SnackBar";
import { useParams } from "react-router-dom";
function CourseList() {
  const [courseData, setCourseData] = useState([]);
  const [searchBox, setSearchBox] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(8);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxpage] = useState(9);

  const [targetCourseId, setTargetCourseId] = useState(null);
  const [targetCourseName, setTargetCourseName] = useState(null);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const closeDelete = () => setDeleteToggle(false);

  const navigate = useNavigate();
  const courseId = useParams();
  const courseFetching = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/ourcourse?course=${searchBox}&start=${start}&end=${end}&desc&`
      );
      setMaxpage(Math.ceil(result.data.count / 8));
      setCourseData(result.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  function formatDateTime(isoDateTime) {
    const date = new Date(isoDateTime);

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    if (hours > 12) {
      hours -= 12;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    const formattedDateTime = `${month}/${day}/${year} ${hours}:${minutes}${ampm}`;

    return formattedDateTime;
  }

  const changeUpperPage = () => {
    let newStart = start + 8;
    let newEnd = end + 8;
    let newPage = page + 1;
    setStart(newStart);
    setEnd(newEnd);
    setPage(newPage);
  };

  const changeLowerPage = () => {
    if (start > 1) {
      let newStart = start - 8;
      let newEnd = end - 8;
      let newPage = page - 1;
      setStart(newStart);
      setEnd(newEnd);
      setPage(newPage);
    }
  };

  const handleDelete = async () => {
    if (targetCourseId) {
      try {
        await axios.delete(`http://localhost:4000/ourcourse/${targetCourseId}`);

        setTargetCourseName(null);
        setTargetCourseId(null);
        setDeleteToggle(false);
        courseFetching();
        displaySnackbar(`${targetCourseId} has been deleted`, "success");
      } catch (error) {
        console.log(error);
      }
    }
  };

  function displaySnackbar(message, status) {
    setOpenSnackBar(false);
    setSnackStatus(status);
    setSnackbarMes(message);
    setOpenSnackBar(true);
  }
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [snackBarMes, setSnackbarMes] = useState("");
  const [snackStatus, setSnackStatus] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  useEffect(() => {
    courseFetching();
  }, [searchBox, page]);

  if (isLoading) {
    return (
      <div className="gap-8 flex justify-center items-center w-[1300px] min-h-[100vh] text-black">
        <h1>Loading...</h1>
        <CircularIndeterminate />
      </div>
    );
  }

  return (
    <div className="w-[1200px]">
      {/* <div className="w-[100%]"> */}
      <SnackBar
        open={openSnackbar}
        onClose={handleClose}
        severity={snackStatus}
        message={snackBarMes}
      />
      {deleteToggle ? (
        <Mymodal
          open={deleteToggle}
          onClose={closeDelete}
          closeButton={closeDelete}
          yesOnClick={closeDelete}
          noOnClick={handleDelete}
          description={`Do you sure to delete ${targetCourseName} ?`}
          yesDes="No, I don’t"
          noDes={`Yes, I want to delete this course`}
        />
      ) : null}
      {/* <div className="TopBar w-[1200px] h-[92px] px-10 py-4 bg-white border-solid border-b border-t-0 border-l-0 border-r-0 border-gray-300 justify-start items-center gap-4 flex"> */}

      <div className="TopBar w-[100%] h-[92px] px-10 py-4 bg-white border-solid border-b border-t-0 border-l-0 border-r-0 border-gray-300 justify-start items-center gap-4 flex">
        <div className="Assignment grow shrink basis-0 text-slate-800 text-2xl font-medium font-['Inter'] leading-loose">
          Course
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
              className=" Search grow shrink basis-0 placeholder:text-slate-400 text-base font-normal font-['Inter'] leading-normal border-none outline-none"
              onChange={(e) => {
                setSearchBox(e.target.value);
                setStart(1);
                setEnd(8);
                setPage(1);
              }}
            />
          </div>
          <button
            onClick={() => navigate("/admin/addcourse")}
            className="Primary px-8 py-4 bg-blue-800 rounded-xl shadow justify-center items-center gap-2.5 flex border-none">
            <div className=" text-center text-white text-base font-bold font-['Inter'] leading-normal">
              + Add Course
            </div>
          </button>
        </div>
      </div>
      <div className="flex justify-center h-[932px] bg-[#F6F7FC]">
        <div>
          <div className="rounded-t-lg mt-[48px] w-[1120px] h-[41px] grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr,1fr,auto] bg-[--gray300] text-slate-600 text-sm">
            <div className="w-[48px]  flex items-center px-[16px] py-[10px]"></div>
            <div className="w-[96px]  flex items-center px-[16px] py-[10px]">
              Image
            </div>
            <div className="w-[268px]  flex items-center px-[16px] py-[10px]">
              Course name
            </div>
            <div className="w-[105px]  flex items-center px-[16px] py-[10px]">
              Lesson
            </div>
            <div className="w-[105px]  flex items-center px-[16px] py-[10px]">
              Price
            </div>
            <div className="w-[191px]  flex items-center px-[16px] py-[10px]">
              Created date
            </div>
            <div className="w-[176px]  flex items-center px-[16px] py-[10px]">
              Updated date
            </div>
            <div className="w-[120px]  flex items-center px-[24px] py-[10px]">
              Action
            </div>
          </div>
          {courseData.length === 0 ? (
            <div className="flex justify-center items-center w-[100%] mt-[39px] text-black">
              <p className="H3 text-[#646D89] mb-[19px]">
                The search returned no results
              </p>
            </div>
          ) : null}
          {courseData.map((item) => (
            <div
              key={item.course_id}
              className="w-[1120px] h-[88px] grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr,1fr,auto] bg-white Body2">
              <div className="w-[48px] flex items-center px-[16px] py-[32px]">
                {item.course_id}
              </div>
              <div className="w-[96px]  flex items-center px-[16px] py-[10px]">
                <img
                  src={item.cover_img}
                  alt={item.course_name.slice(0, 50)}
                  className="w-[64px] h-[47px] object-cover"
                />
              </div>
              <div className="w-[268px]  flex items-center px-[16px] py-[10px]">
                {item.course_name.slice(0, 50)}
              </div>
              <div className="w-[105px]  flex items-center px-[16px] py-[10px]">
                {item.lessons.length}
              </div>
              <div className="w-[105px]  flex items-center px-[16px] py-[10px]">
                {item.price?.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="w-[191px]  flex items-center px-[16px] py-[10px]">
                {formatDateTime(item.created_date)}
              </div>
              <div className="w-[176px]  flex items-center px-[16px] py-[10px]">
                {formatDateTime(item.updated_date) === "1/1/1970 7:00AM"
                  ? formatDateTime(item.created_date)
                  : formatDateTime(item.updated_date)}
              </div>
              <div className="w-[120px]  flex items-center justify-center gap-[17px] ">
                <button
                  className="cursor-pointer bg-white border-none"
                  onClick={() => {
                    setDeleteToggle(true);
                    setTargetCourseId(item.course_id);
                    setTargetCourseName(item.course_name);
                  }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.5 4.47801V4.70501C17.799 4.8238 19.0927 4.9946 20.378 5.21701C20.4751 5.23382 20.5678 5.26958 20.6511 5.32225C20.7343 5.37491 20.8063 5.44346 20.8631 5.52397C20.9198 5.60448 20.9601 5.69537 20.9817 5.79146C21.0033 5.88755 21.0058 5.98696 20.989 6.08401C20.9722 6.18106 20.9364 6.27384 20.8838 6.35707C20.8311 6.4403 20.7626 6.51233 20.682 6.56907C20.6015 6.62581 20.5106 6.66613 20.4146 6.68774C20.3185 6.70935 20.2191 6.71182 20.122 6.69501L19.913 6.66001L18.908 19.73C18.8501 20.4836 18.5098 21.1875 17.9553 21.7011C17.4008 22.2146 16.6728 22.5 15.917 22.5H8.08401C7.3282 22.5 6.60026 22.2146 6.04573 21.7011C5.4912 21.1875 5.15095 20.4836 5.09301 19.73L4.08701 6.66001L3.87801 6.69501C3.78096 6.71182 3.68155 6.70935 3.58546 6.68774C3.48937 6.66613 3.39847 6.62581 3.31796 6.56907C3.15537 6.45449 3.04495 6.28 3.01101 6.08401C2.97706 5.88801 3.02236 5.68656 3.13694 5.52397C3.25153 5.36137 3.42601 5.25096 3.62201 5.21701C4.90727 4.99433 6.20099 4.82353 7.50001 4.70501V4.47801C7.50001 2.91401 8.71301 1.57801 10.316 1.52701C11.4387 1.49108 12.5623 1.49108 13.685 1.52701C15.288 1.57801 16.5 2.91401 16.5 4.47801ZM10.364 3.02601C11.4547 2.99113 12.5463 2.99113 13.637 3.02601C14.39 3.05001 15 3.68401 15 4.47801V4.59101C13.0018 4.46966 10.9982 4.46966 9.00001 4.59101V4.47801C9.00001 3.68401 9.60901 3.05001 10.364 3.02601ZM10.009 8.97101C10.0052 8.87252 9.98203 8.77574 9.94082 8.6862C9.89961 8.59667 9.84117 8.51612 9.76883 8.44917C9.69649 8.38222 9.61168 8.33017 9.51923 8.296C9.42678 8.26183 9.3285 8.2462 9.23001 8.25001C9.13152 8.25382 9.03474 8.27699 8.9452 8.3182C8.85567 8.35941 8.77512 8.41785 8.70817 8.49019C8.64122 8.56252 8.58917 8.64734 8.555 8.73979C8.52083 8.83224 8.5052 8.93052 8.50901 9.02901L8.85601 18.029C8.8637 18.2278 8.95004 18.4154 9.09604 18.5505C9.16833 18.6174 9.25309 18.6694 9.34548 18.7036C9.43787 18.7377 9.53608 18.7533 9.63451 18.7495C9.73293 18.7457 9.82964 18.7225 9.91912 18.6814C10.0086 18.6402 10.0891 18.5818 10.156 18.5095C10.2229 18.4372 10.2749 18.3524 10.3091 18.26C10.3432 18.1676 10.3588 18.0694 10.355 17.971L10.009 8.97101ZM15.489 9.02901C15.4963 8.92863 15.4834 8.82779 15.4509 8.73252C15.4185 8.63725 15.3672 8.54948 15.3001 8.47445C15.233 8.39942 15.1515 8.33866 15.0604 8.2958C14.9694 8.25293 14.8706 8.22883 14.77 8.22494C14.6694 8.22104 14.5691 8.23743 14.475 8.27313C14.3809 8.30883 14.2949 8.3631 14.2222 8.43272C14.1496 8.50234 14.0916 8.58587 14.0519 8.67835C14.0122 8.77083 13.9915 8.87036 13.991 8.97101L13.644 17.971C13.6363 18.1699 13.708 18.3637 13.8432 18.5098C13.9784 18.6559 14.1661 18.7423 14.365 18.75C14.5639 18.7577 14.7577 18.6861 14.9038 18.5508C15.0499 18.4156 15.1363 18.2279 15.144 18.029L15.489 9.02901Z"
                      fill="#8DADE0"
                    />
                  </svg>
                </button>
                <button
                  className="cursor-pointer bg-white border-none"
                  onClick={() =>
                    navigate(`/admin/editcourse/${item.course_id}`)
                  }>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none">
                    <path
                      d="M21.7313 2.26899C21.239 1.77681 20.5714 1.50031 19.8753 1.50031C19.1791 1.50031 18.5115 1.77681 18.0193 2.26899L16.8623 3.42599L20.5743 7.13799L21.7313 5.98099C22.2234 5.48872 22.4999 4.82111 22.4999 4.12499C22.4999 3.42888 22.2234 2.76127 21.7313 2.26899ZM19.5133 8.199L15.8013 4.48699L7.40125 12.887C6.78411 13.5038 6.33043 14.2648 6.08125 15.101L5.28125 17.786C5.24263 17.9156 5.23975 18.0532 5.27292 18.1842C5.30608 18.3153 5.37407 18.435 5.46967 18.5306C5.56527 18.6262 5.68494 18.6942 5.81601 18.7273C5.94709 18.7605 6.08469 18.7576 6.21425 18.719L8.89925 17.919C9.73548 17.6698 10.4964 17.2161 11.1133 16.599L19.5133 8.199Z"
                      fill="#8DADE0"
                    />
                    <path
                      d="M5.25 5.25C4.45435 5.25 3.69129 5.56607 3.12868 6.12868C2.56607 6.69129 2.25 7.45435 2.25 8.25V18.75C2.25 19.5456 2.56607 20.3087 3.12868 20.8713C3.69129 21.4339 4.45435 21.75 5.25 21.75H15.75C16.5456 21.75 17.3087 21.4339 17.8713 20.8713C18.4339 20.3087 18.75 19.5456 18.75 18.75V13.5C18.75 13.3011 18.671 13.1103 18.5303 12.9697C18.3897 12.829 18.1989 12.75 18 12.75C17.8011 12.75 17.6103 12.829 17.4697 12.9697C17.329 13.1103 17.25 13.3011 17.25 13.5V18.75C17.25 19.1478 17.092 19.5294 16.8107 19.8107C16.5294 20.092 16.1478 20.25 15.75 20.25H5.25C4.85218 20.25 4.47064 20.092 4.18934 19.8107C3.90804 19.5294 3.75 19.1478 3.75 18.75V8.25C3.75 7.85218 3.90804 7.47064 4.18934 7.18934C4.47064 6.90804 4.85218 6.75 5.25 6.75H10.5C10.6989 6.75 10.8897 6.67098 11.0303 6.53033C11.171 6.38968 11.25 6.19891 11.25 6C11.25 5.80109 11.171 5.61032 11.0303 5.46967C10.8897 5.32902 10.6989 5.25 10.5 5.25H5.25Z"
                      fill="#8DADE0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {maxPage > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-6 self-center">
              <button
                className={`${
                  page > 1 ? "cursor-pointer" : "cursor-not-allowed"
                } border-none px-4 py-2 bg-blue-800  hover:bg-blue-600 text-white font-semibold rounded-full focus:outline-none flex items-center `}
                onClick={page > 1 ? changeLowerPage : undefined}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline-block mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Prev
              </button>
              <span className="text-gray-600 text-lg">
                Page {page} / {maxPage}
              </span>
              <button
                className={`${
                  courseData.length < 8
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                } border-none px-4 py-2 bg-blue-800  hover:bg-blue-600 text-white font-semibold rounded-full focus:outline-none flex items-center`}
                onClick={courseData.length < 8 ? undefined : changeUpperPage}>
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline-block ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseList;
