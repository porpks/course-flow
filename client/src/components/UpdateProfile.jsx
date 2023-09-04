import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import calendarIcon from "../../public/image/calendarIcon.svg";
import Navbar from "./Navbar.jsx";

function UpdateProfile() {
  const initialValues = {
    name: "",
    dateOfBirth: null,
    edu: "",
    email: "",
  };

  const onSubmit = (values) => {
    console.log("Form data", values);
    navigate("/");
  };

  const validate = (values) => {
    let errors = {};

    if (!values.name) {
      errors.name = "Required!";
    } else if (!/^[A-Z' -]+$/i.test(values.name)) {
      errors.name = `Name must be included (A-Z) , (a-z) and (' , -)`;
    }

    if (!values.dateOfBirth) {
      errors.dateOfBirth = "Required!";
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(values.dateOfBirth);
      if (selectedDate > currentDate) {
        errors.dateOfBirth = "Date must be in the past";
      }
    }

    if (!values.edu) {
      errors.edu = "Required!";
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
        name: "dateOfBirth",
        value: timestamp,
        type: "date",
      },
    });
  };

  const navigate = useNavigate();
  const today = dayjs();

  return (
    <body className="flex justify-center">
      <div className="relative flex flex-col items-center w-[1440px] h-[995px]">
        <div className="absolute left-[102px] top-[100px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none">
            <circle cx="5.5" cy="5.5" r="4" stroke="#2F5FAC" stroke-width="3" />
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

        <div className="absolute left-[1387px] top-[216px]">
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
              stroke-width="3"
            />
          </svg>
        </div>

        <h2 className="H2 pt-[100px] pb-[72px]">Profile</h2>
        <div className="flex justify-between w-[930px] h-[521px] bg-cover">
          <div className="relative">
            <img
              src="../public/image/user_profile.png"
              className="relative w-[358px] h-[358px] object-cover	rounded-2xl	"
            />
            <button className="flex justify-center items-center absolute top-0 right-0 m-[6px] bg-[#9B2FAC] rounded-full w-[32px] h-[32px] border-none cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none">
                <path
                  d="M5.82422 16.1764L16.1772 5.82349M5.82422 5.82349L16.1772 16.1764"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <form className="product-form" onSubmit={submitHandle}>
            <div className="w-[453px] Body2">
              <div>Name</div>
              <input
                type="text"
                className="p-[12px] w-[100%] h-[48px] rounded-lg border-gray-400 border-[1px] border-solid mb-[40px] focus:outline-none focus:border-orange-500 focus:border-[1px]"
                placeholder="Enter Name and Lastname"
                onChange={(e) => setName(e.target.value)}
              />

              <div>Date of Birth</div>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  slotProps={{ popper: { placement: "bottom-end" } }}
                  sx={{
                    width: 453,
                    marginBottom: 5,
                    "& .MuiInputBase-root": {
                      height: 48,
                      borderRadius: "0.5rem",
                      border: "1px solid #CBD5E0",
                    },
                    "&.MuiInputBase-root:focus": {
                      border: "1px solid #F47E20",
                    },
                  }}
                  components={{
                    OpenPickerIcon: () => (
                      <img
                        src={calendarIcon}
                        alt="Calendar Icon"
                        className="w-[24px] h-[24px] mx-[4px]"
                      />
                    ),
                  }}
                  format="DD-MM-YYYY"
                  maxDate={today}
                  // showDaysOutsideCurrentMonth
                  onChange={(newValue) => {
                    const timestamp = new Date(newValue);
                    setDateOfBirth(timestamp);
                  }}
                />
              </LocalizationProvider>

              <div>Educational Background</div>
              <input
                type="text"
                className="p-[12px] w-[100%] h-[48px] rounded-lg border-gray-400 border-[1px] border-solid mb-[40px] focus:outline-none focus:border-orange-500 focus:border-[1px]"
                placeholder="Enter Educational Background"
                onChange={(e) => setEdu(e.target.value)}
              />

              <div>Email</div>
              <input
                type="email"
                className="p-[12px] w-[100%] h-[48px] rounded-lg border-gray-400 border-[1px] border-solid mb-[37px]  focus:outline-none focus:border-orange-500 focus:border-[1px]"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                className="Primary w-[100%] border-none cursor-pointer"
                type="submit">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </body>
  );
}
export default UpdateProfile;
