import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SnackBar from "./SnackBar";
import calendarIcon from "../../public/image/calendarIcon.svg";
import dayjs from "dayjs";
import axios from "axios";
import { useEffect } from "react";

const today = dayjs();

function Register() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({});
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [disSubmit, setDisSubmit] = useState(true);
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [snackBarMes, setSnackbarMes] = useState("");
  const [snackBarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (Object.keys(registerData).length > 0) {
      sendRegisterRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, registerData]);

  const handleRegister = (values) => {
    if (values.name && dateOfBirth && values.eduBg && values.email && values.password) {
      setRegisterData({
        name: values.name,
        dateOfBirth: dateOfBirth,
        educationBackground: values.eduBg,
        email: values.email,
        password: values.password,
      })
    }
  };

  const sendRegisterRequest = async () => {

    try {
      const result = await axios.post("http://localhost:4000/auth/register", registerData);
      if (result.data.error) {
        setOpenSnackBar(false)
        setSnackbarMes(result.data.error)
        setSnackbarSeverity("warning")
        setOpenSnackBar(true)
      } else {
        setSnackbarMes("register success check you email to verify")
        setSnackbarSeverity("success")
        setOpenSnackBar(true)
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };
  const validateForm = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required!";
    }
    else if (!/^[A-Z' -]+$/i.test(values.name)) {
      errors.name = `Name must be included (A-Z) , (a-z) and (' , -)`;
    }
    // else if (!values.dateOfBirth) {
    //     errors.dateOfBirth = 'Required!'
    // } else if (new Date(values.dateOfBirth) > new Date().getTime()) {
    //     errors.dateOfBirth = `Date must  be in the past`;
    // }
    else if (!values.eduBg) {
      errors.eduBg = "Required!";
    }
    else if (!values.email) {
      errors.email = "Required!";
    }
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address!";
    }
    else if (!values.password) {
      errors.password = "Required!";
    }
    else if (values.password.length < 12) {
      errors.password =
        "Password must contain at least 12 or more characters";
    }
    else {
      setDisSubmit(false)
    }
    return errors;
  }

  return (
    <>
      <SnackBar
        open={openSnackbar}
        onClose={handleClose}
        severity={snackBarSeverity}
        message={snackBarMes}
      />

      <div className='flex justify-center min-h-[960px] relative overflow-hidden'>
        <div className='w-[450px] mt-[100px] bg-white overflow-visible'>
          <h1 className='H2 text-[#22269E]'>Register to start learning!</h1>

          <Formik
            initialValues={{}}
            validate={validateForm}
            onSubmit={(values, actions) => {

              handleRegister(values);

              actions.resetForm();
              actions.setFieldValue("name", "");
              setDateOfBirth(null);
              actions.setFieldValue("eduBg", "");
              actions.setFieldValue("email", "");
              actions.setFieldValue("password", "");

            }}>
            {({ errors, touched, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <div className='relative mt-10'>
                  <label htmlFor='name' className='Body2'>
                    Name
                  </label>
                  <Field

                    type='text'
                    name='name'
                    id='name'
                    placeholder='Enter Name and Lastname'
                    className={`Body2 w-full mt-1 p-3 rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${errors.name && touched.name
                      ? " border-[#9B2FAC]"
                      : " border-[--gray500]"
                      }`}
                  />
                  {errors.name && touched.name &&
                    <div className='text-[#9B2FAC] absolute right-0 -bottom-6'>
                      {errors.name}
                      <img
                        src='../../public/Exclamation-circle.svg'
                        className='absolute right-4 -top-10'
                      />
                    </div>}

                </div>

                <div className='relative mt-10'>
                  <label htmlFor='dateOfBirth' className='Body2'>
                    Date of Birth
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      slotProps={{ popper: { placement: "bottom-end" } }}
                      sx={{
                        width: 450,
                        marginBottom: 0,
                        "& .MuiInputBase-root": {
                          height: 50,
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
                            alt='Calendar Icon'
                            className='w-[24px] h-[24px] mx-[4px]'
                          />
                        ),
                      }}
                      format='DD-MM-YYYY'
                      maxDate={today}
                      value={dateOfBirth}
                      onChange={(newValue) => {
                        const timestamp = new Date(newValue);
                        setDateOfBirth(timestamp);
                      }}
                    />
                  </LocalizationProvider>
                </div>

                <div className='relative mt-10'>
                  <label htmlFor='eduBg' className='Body2'>
                    Education Background
                  </label>
                  <Field
                    type='text'
                    name='eduBg'
                    id='eduBg'
                    placeholder='Enter Education Background'
                    className={`Body2 w-full mt-1 p-3 rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${errors.eduBg && touched.eduBg
                      ? " border-[#9B2FAC]"
                      : " border-[--gray500]"
                      }`}
                  />
                  {errors.eduBg && touched.eduBg &&
                    <div className='text-[#9B2FAC] absolute right-0 -bottom-6'>
                      {errors.eduBg}
                      <img
                        src='../../public/Exclamation-circle.svg'
                        className='absolute right-4 -top-10'
                      />
                    </div>

                  }
                </div>

                <div className='relative mt-10'>
                  <label htmlFor='email' className='Body2'>
                    Email
                  </label>
                  <Field

                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter Email'
                    className={`Body2 w-full mt-1 p-3 rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${errors.email && touched.email
                      ? " border-[#9B2FAC]"
                      : " border-[--gray500]"
                      }`}
                  />
                  {errors.email && touched.email &&
                    <div className='text-[#9B2FAC] absolute right-0 -bottom-6'>
                      {errors.email}
                      <img
                        src='../../public/Exclamation-circle.svg'
                        className='absolute right-4 -top-10'
                      />
                    </div>

                  }
                </div>

                <div className='relative mt-10'>
                  <label htmlFor='password' className='Body2'>
                    Password
                  </label>
                  <Field
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Enter Password'
                    className={`Body2 w-full mt-1 p-3 rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${errors.password && touched.password
                      ? " border-[#9B2FAC]"
                      : " border-[--gray500]"
                      }`}
                  />
                  {errors.password && touched.password &&
                    <div className='text-[#9B2FAC] absolute right-0 -bottom-6'>
                      {errors.password}
                      <img
                        src='../../public/Exclamation-circle.svg'
                        className='absolute right-4 -top-10'
                      />
                    </div>

                  }
                </div>

                <button
                  type='submit'
                  disabled={disSubmit}
                  className='Body1 text-white bg-[--blue500] w-full mt-10 p-4 rounded-2xl border-none cursor-pointer disabled:bg-[--gray500] hover:bg-[--blue400] active:bg-[--blue700]'>
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
              </Form>
            )}
          </Formik>

          <h1 className='Body2 mt-8'>
            Already have an account?
            <span
              className='font-semibold text-[--blue500] ml-2 cursor-pointer active:text-[--blue400]'
              onClick={() => navigate("/login")}>
              Log in
            </span>
          </h1>
        </div>

        <img
          src='../../public/Vector9.svg'
          className='absolute left-0 top-[330px]'
        />
        <img
          src='../../public/Ellipse5.svg'
          className='absolute left-[80px] top-[80px]'
        />
        <img
          src='../../public//Group5.svg'
          className='absolute left-[180px] top-[190px]'
        />
        <img
          src='../../public/Vector8.svg'
          className='absolute right-0 -top-[88px]'
        />
        <img
          src='../../public/Ellipse4.svg'
          className='absolute right-[50px] top-[500px]'
        />
      </div>
    </>
  );
}
export default Register;
