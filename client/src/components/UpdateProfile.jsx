import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import calendarIcon from "../../public/image/calendarIcon.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import CircularIndeterminate from "../assets/loadingProgress";
import SnackBar from "./SnackBar";

function UpdateProfile() {
  const { setUserID, setUsername, userId } = useAuth();
  const params = useParams();

  const [image, setImage] = useState("");

  const [avatar, setAvatar] = useState({});

  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

      if (allowedTypes.includes(file.type)) {
        if (file.size <= 2 * 1024 * 1024) {
          setAvatar(event.target.files[0]);
          setAvatarUrl(URL.createObjectURL(event.target.files[0]));
        } else {
          displaySnackbar("File size exceeds 2MB.", "warning");
        }
      } else {
        displaySnackbar(
          "Invalid file type. Please choose a .jpg, .jpeg, or .png file.",
          "warning"
        );
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

  const handleRemoveImage = async () => {
    setAvatar({});
    setAvatarUrl("");
    setImage("");
    await axios.put(`http://localhost:4000/profile/delete/${userId}`);
  };

  const initialValues = {
    full_name: "",
    date_of_birth: null,
    edu_background: "",
    email: "",
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const getData = async () => {
  //   const result = await axios.get(`http://localhost:4000/profile/${userId}`);

  //   const initialValues = {
  //     full_name: result.data.data.full_name,
  //     date_of_birth: dayjs(result.data.data.date_of_birth) || "",
  //     edu_background: result.data.data.edu_background,
  //     email: result.data.data.email,
  //   };

  //   formik.setValues(initialValues);
  // };

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const getDataImage = async () => {
  //   const imageUrl = await axios.get(
  //     `http://localhost:4000/profile/image/${userId}`
  //   );
  //   setImage(imageUrl.data);
  // };

  const onSubmit = async () => {
    const newUserData = {
      full_name: formik.values.full_name,
      date_of_birth: formik.values.date_of_birth,
      edu_background: formik.values.edu_background,
      email: formik.values.email,
      avatar: avatar,
    };

    await axios.put(`http://localhost:4000/profile/${userId}`, newUserData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    try {
      const response = await axios.get(
        `http://localhost:4000/profile/${userId}`
      );
      setUsername(response.data.data);
      localStorage.removeItem("username");
      localStorage.removeItem("userimage");
      localStorage.setItem("username", response.data.data.full_name);
      localStorage.setItem("userimage", response.data.data.image_url);
    } catch (error) {
      alert(error.message);
    }
    const useid = userId;
    setUserID(params.id ? params.id : useid);

    navigate("/ourcourse");
  };

  const validate = (values) => {
    let errors = {};

    if (!values.full_name) {
      errors.full_name = "Required!";
    } else if (!/^[A-Z' -]+$/i.test(values.full_name)) {
      errors.full_name = `Name must be included (A-Z) , (a-z) and (' , -)z`;
    }

    if (!values.date_of_birth) {
      errors.date_of_birth = "Required!";
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(values.date_of_birth);
      if (selectedDate > currentDate) {
        errors.date_of_birth = "Date must be in the past";
      }
    }

    if (!values.edu_background) {
      errors.edu_background = "Required!";
    }

    if (!values.email) {
      errors.email = "Required!";
    } else if (!/^[a-zA-Z0-9._-]+@[^.]+\.(com)$/i.test(values.email)) {
      errors.email = "Invalid email address!";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const handleDatePickerChange = (newValue) => {
    const timestamp = new Date(newValue);
    formik.handleChange({
      target: {
        name: "date_of_birth",
        value: dayjs(timestamp),
        type: "date",
      },
    });
  };

  const navigate = useNavigate();
  const today = dayjs();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4000/profile/${userId}`
        );
        const imageUrl = await axios.get(
          `http://localhost:4000/profile/image/${userId}`
        );

        const initialValues = {
          full_name: result.data.data.full_name,
          date_of_birth: dayjs(result.data.data.date_of_birth) || "",
          edu_background: result.data.data.edu_background,
          email: result.data.data.email,
        };

        setImage(imageUrl.data);
        formik.setValues(initialValues);
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        setIsLoading(false); // Handle errors here if needed
      }
    };

    fetchData();
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (
      !formik.values.full_name ||
      !formik.values.date_of_birth ||
      !formik.values.edu_background ||
      !formik.values.email
    ) {
      displaySnackbar("Please fill out all fields.", "warning");
      return;
    }
    displaySnackbar("Your profile has been updated.", "success");
    formik.handleSubmit(e);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-[100%] min-h-[100vh] gap-8 text-black">
        <h1>Loading...</h1>
        <CircularIndeterminate />
      </div>
    );
  }
  return (
    <>
      <SnackBar
        open={openSnackbar}
        onClose={handleClose}
        severity={snackStatus}
        message={snackBarMes}
      />

      <div className="relative flex justify-center w-[99.7%]">
        <div className="flex flex-col items-center w-[1440px] h-[995px]">
          <div className="absolute left-[102px] top-[100px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none">
              <circle
                cx="5.5"
                cy="5.5"
                r="4"
                stroke="#2F5FAC"
                strokeWidth="3"
              />
            </svg>
          </div>

          <div className="absolute left-[43px] top-[159px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none">
              <circle cx="13.1741" cy="13.1741" r="13.1741" fill="#C6DCFF" />
            </svg>
          </div>

          <div className="absolute right-[-5px] top-[216px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="53"
              height="74"
              viewBox="0 0 53 74"
              fill="none">
              <circle cx="37" cy="37" r="37" fill="#C6DCFF" />
            </svg>
          </div>

          <div className="absolute right-[126.22px] top-[126px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="51"
              height="51"
              viewBox="0 0 51 51"
              fill="none">
              <path
                d="M11.3581 19.9099L37.1499 15.9774L27.6597 40.28L11.3581 19.9099Z"
                stroke="#FBAA1C"
                strokeWidth="3"
              />
            </svg>
          </div>

          <h2 className="H2 pt-[100px] pb-[72px]">Profile</h2>
          <div className="flex justify-between w-[930px] h-[521px] bg-cover">
            <div className="relative h-fit">
              <img
                src={
                  avatarUrl
                    ? avatarUrl
                    : image
                      ? image
                      : "../public/image/noprofile.svg"
                }
                className="relative w-[358px] h-[358px] object-cover	rounded-2xl	"
              />

              {avatarUrl || image ? (
                <button
                  className="flex justify-center items-center absolute top-0 right-0 m-[6px] bg-[#9B2FAC] rounded-full w-[32px] h-[32px] border-none cursor-pointer"
                  onClick={handleRemoveImage}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none">
                    <path
                      d="M5.82422 16.1764L16.1772 5.82349M5.82422 5.82349L16.1772 16.1764"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ) : null}

              <div className="absolute w-[180px] h-[180px] top-[89px] left-[89px] rounded-full flex justify-center items-center hover:bg-[rgba(264,264,264,0.5)] border-[--blue500] border-[3px] hover:border-dashed group">
                <label
                  htmlFor="upload"
                  className="hidden group-hover:block w-full h-full pt-[45px] text-[--blue500] text-center text-xl rounded-full cursor-pointer">
                  <div className="text-[48px] font-extralight mb-3">+</div>
                  <div className="text-[20px] font-medium">Upload Image</div>
                  <input
                    id="upload"
                    name="avatar"
                    type="file"
                    onChange={(e) => handleFileChange(e)}
                    hidden
                  />
                </label>
              </div>
            </div>
            <form onSubmit={onSubmitForm}>
              <div className="w-[450px] Body2">
                <div>Name</div>
                <div className="relative h-[100%]">
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    className={`Body2 p-[12px] w-[100%] h-[48px] mb-[40px] rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${formik.touched.full_name && formik.errors.full_name
                        ? " border-[#9B2FAC]"
                        : " border-[--gray500]"
                      }`}
                    placeholder="Enter Name and Lastname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.full_name}
                  />

                  {formik.touched.full_name && formik.errors.full_name ? (
                    <div className="text-[#9B2FAC] absolute right-0 -bottom-6 top-[50px]">
                      {formik.errors.full_name}
                    </div>
                  ) : null}
                  {formik.touched.full_name && formik.errors.full_name ? (
                    <img
                      src="../../public/Exclamation-circle.svg"
                      className="absolute right-[16px] top-[16px]"
                    />
                  ) : null}
                </div>

                <div>Date of Birth</div>
                <div className="relative h-[100%]">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      id="date_of_birth"
                      name="date_of_birth"
                      // slotProps={{ popper: { placement: "bottom-end" } }}
                      sx={{
                        width: 450,
                        "& .MuiInputBase-root": {
                          height: 50,
                          borderRadius: "0.5rem",
                          border:
                            formik.errors.date_of_birth &&
                              formik.touched.date_of_birth
                              ? "2px solid #9B2FAC"
                              : "2px solid #CBD5E0",
                          width: "100%",
                          marginBottom: "40px",
                        },
                        "& .MuiInputBase-root:focus": {
                          border: "none",
                        },
                      }}
                      components={{
                        OpenPickerIcon: () => (
                          <img
                            src={calendarIcon}
                            alt="Calendar Icon"
                            className="w-[24px] h-[24px] mx-[4px] "
                          />
                        ),
                      }}
                      format="DD-MM-YYYY"
                      maxDate={today}
                      // showDaysOutsideCurrentMonth
                      value={formik.values.date_of_birth}
                      onChange={handleDatePickerChange}
                      onBlur={formik.handleBlur}
                    />
                  </LocalizationProvider>

                  {formik.touched.date_of_birth &&
                    formik.errors.date_of_birth ? (
                    <div className="text-[#9B2FAC] absolute right-0 -bottom-6 top-[50px]">
                      {formik.errors.date_of_birth}
                    </div>
                  ) : null}
                  {formik.touched.date_of_birth &&
                    formik.errors.date_of_birth ? (
                    <img
                      src="../../public/Exclamation-circle.svg"
                      className="absolute right-[47px] top-[16px]"
                    />
                  ) : null}
                </div>

                <div>Educational Background</div>
                <div className="relative h-[100%]">
                  <input
                    type="text"
                    id="edu_background"
                    name="edu_background"
                    className={`Body2 p-[12px] w-[100%] h-[48px] mb-[40px] rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${formik.touched.edu_background &&
                        formik.errors.edu_background
                        ? " border-[#9B2FAC]"
                        : " border-[--gray500]"
                      }`}
                    placeholder="Enter Educational Background"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.edu_background}
                  />

                  {formik.touched.edu_background &&
                    formik.errors.edu_background ? (
                    <div className="text-[#9B2FAC] absolute right-0 -bottom-6 top-[50px]">
                      {formik.errors.edu_background}
                    </div>
                  ) : null}
                  {formik.touched.edu_background &&
                    formik.errors.edu_background ? (
                    <img
                      src="../../public/Exclamation-circle.svg"
                      className="absolute right-[16px] top-[16px]"
                    />
                  ) : null}
                </div>

                <div>Email</div>
                <div className="relative">
                  <input
                    disabled
                    type="email"
                    id="email"
                    name="email"
                    className={`Body2 p-[12px] w-[100%] h-[48px] mb-[40px] rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${formik.touched.email && formik.errors.email
                        ? " border-[#9B2FAC]"
                        : " border-[--gray500]"
                      }`}
                    placeholder="Enter Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />

                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-[#9B2FAC] absolute right-0 -bottom-6 top-[50px]">
                      {formik.errors.email}
                    </div>
                  ) : null}
                  {formik.touched.email && formik.errors.email ? (
                    <img
                      src="../../public/Exclamation-circle.svg"
                      className="absolute right-[16px] top-[16px]"
                    />
                  ) : null}
                </div>

                <button
                  className="Primary w-[100%] border-none cursor-pointer"
                  type="submit">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdateProfile;
