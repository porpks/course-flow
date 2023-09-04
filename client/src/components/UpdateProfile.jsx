import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import calendarIcon from "../../public/image/calendarIcon.svg";

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
                fill="none"
              >
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
                id="name"
                name="name"
                className={`Body2 p-[12px] w-[100%] h-[48px] mb-[40px] rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${
                  formik.touched.name && formik.errors.name
                    ? " border-[#9B2FAC]"
                    : " border-[--gray500]"
                }`}
                placeholder="Enter Name and Lastname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />

              {formik.touched.name && formik.errors.name ? (
                <div className="text-[#9B2FAC] absolute right-0 -bottom-6 top-[50px]">
                  {formik.errors.name}
                </div>
              ) : null}
              {formik.touched.name && formik.errors.name ? (
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
                  id="dateOfBirth"
                  name="dateOfBirth"
                  slotProps={{ popper: { placement: "bottom-end" } }}
                  sx={{
                    width: 453,
                    "& .MuiInputBase-root": {
                      height: 48,
                      borderRadius: "0.5rem",
                      border:
                        formik.errors.dateOfBirth && formik.touched.dateOfBirth
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
                  value={formik.values.dateOfBirth}
                  onChange={handleDatePickerChange}
                  onBlur={formik.handleBlur}
                />
              </LocalizationProvider>

              {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                <div className="text-[#9B2FAC] absolute right-0 -bottom-6 top-[50px]">
                  {formik.errors.dateOfBirth}
                </div>
              ) : null}
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
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
                id="edu"
                name="edu"
                className={`Body2 p-[12px] w-[100%] h-[48px] mb-[40px] rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${
                  formik.touched.edu && formik.errors.edu
                    ? " border-[#9B2FAC]"
                    : " border-[--gray500]"
                }`}
                placeholder="Enter Educational Background"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.edu}
              />

              {formik.touched.edu && formik.errors.edu ? (
                <div className="text-[#9B2FAC] absolute right-0 -bottom-6 top-[50px]">
                  {formik.errors.edu}
                </div>
              ) : null}
              {formik.touched.edu && formik.errors.edu ? (
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
  );
}
export default UpdateProfile;
