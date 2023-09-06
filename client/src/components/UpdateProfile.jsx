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

function UpdateProfile() {
  const { userID, setUserID } = useAuth();
  const params = useParams();

  const [image, setImage] = useState("");

  const [avatar, setAvatar] = useState({});

  const [avatarUrl, setAvatarUrl] = useState("");

  const handleFileChange = (event) => {
    setAvatar(event.target.files[0]);
    setAvatarUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handleRemoveImage = async () => {
    setAvatar({});
    setAvatarUrl("");
    await axios.put(`http://localhost:4000/profile/delete/${params.id}`);
  };

  const getData = async (params) => {
    const result = await axios.get(
      `http://localhost:4000/profile/${params.id}`
    );

    const initialValues = {
      full_name: result.data.data.full_name,
      dateofbirth: dayjs(result.data.data.dateofbirth) || "",
      edu_background: result.data.data.edu_background,
      email: result.data.data.email,
    };
    console.log(result);
    formik.setValues(initialValues);
  };

  const initialValues = {
    full_name: "",
    dateofbirth: "",
    edu_background: "",
    email: "",
  };

  const getDataImage = async () => {
    const imageUrl = await axios.get(
      `http://localhost:4000/profile/image/${params.id}`
    );
    setImage(imageUrl.data);
  };

  const onSubmit = async (values) => {
    const newUserData = {
      full_name: formik.values.full_name,
      dateofbirth: formik.values.dateofbirth,
      edu_background: formik.values.edu_background,
      email: formik.values.email,
      avatar: avatar,
    };

    await axios.put(`http://localhost:4000/profile/${params.id}`, newUserData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    navigate("/ourcourse");
  };

  const validate = (values) => {
    let errors = {};

    if (!values.full_name) {
      errors.full_name = "Required!";
    } else if (!/^[A-Z' -]+$/i.test(values.full_name)) {
      errors.full_name = `Name must be included (A-Z) , (a-z) and (' , -)z`;
    }

    if (!values.dateofbirth) {
      errors.dateofbirth = "Required!";
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(values.dateofbirth);
      if (selectedDate > currentDate) {
        errors.dateofbirth = "Date must be in the past";
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
        name: "dateofbirth",
        value: dayjs(timestamp),
        type: "date",
      },
    });
  };

  const navigate = useNavigate();
  const today = dayjs();

  useEffect(() => {
    getData(params);
    getDataImage();
  }, [image]);

  return (
    <div className="relative flex justify-center w-[100%]">
      <div className="flex flex-col items-center w-[1440px] h-[995px]">
        <div className="absolute left-[102px] top-[100px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none">
            <circle cx="5.5" cy="5.5" r="4" stroke="#2F5FAC" strokeWidth="3" />
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
                  : "../public/image/user_profile.png"
              }
              className="relative w-[358px] h-[358px] object-cover	rounded-2xl	"
            />

            {avatarUrl ? (
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
          <form onSubmit={formik.handleSubmit}>
            <div className="w-[453px] Body2">
              <div>Name</div>
              <div className="relative h-[100%]">
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  className={`Body2 p-[12px] w-[100%] h-[48px] mb-[40px] rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${
                    formik.touched.full_name && formik.errors.full_name
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
                    id="dateofbirth"
                    name="dateofbirth"
                    slotProps={{ popper: { placement: "bottom-end" } }}
                    sx={{
                      width: 453,
                      "& .MuiInputBase-root": {
                        height: 48,
                        borderRadius: "0.5rem",
                        border:
                          formik.errors.dateofbirth &&
                          formik.touched.dateofbirth
                            ? "2px solid #9B2FAC"
                            : "2px solid #CBD5E0",
                        padding: "12px",
                        width: "100%",
                        marginBottom: "40px",
                        outline: "none",
                      },
                      "& .MuiInputBase-root:focus": {
                        border: "1px solid #F47E20",
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
                    value={formik.values.dateofbirth}
                    // onChange={formik.handleChange}
                    onChange={handleDatePickerChange}
                    onBlur={formik.handleBlur}
                  />
                </LocalizationProvider>

                {formik.touched.dateofbirth && formik.errors.dateofbirth ? (
                  <div className="text-[#9B2FAC] absolute right-0 -bottom-6 top-[50px]">
                    {formik.errors.dateofbirth}
                  </div>
                ) : null}
                {formik.touched.dateofbirth && formik.errors.dateofbirth ? (
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
                  className={`Body2 p-[12px] w-[100%] h-[48px] mb-[40px] rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${
                    formik.touched.edu_background &&
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
                  type="email"
                  id="email"
                  name="email"
                  className={`Body2 p-[12px] w-[100%] h-[48px] mb-[40px] rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${
                    formik.touched.email && formik.errors.email
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
  );
}
export default UpdateProfile;
