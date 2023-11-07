import React, { useState } from 'react'
import CourseFlowIcon from '../../assets/CourseFlowIcon'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import SnackBar from './SnackBar.jsx'

function AdminLogin() {
  const { loginAdmin } = useAuth()
  const [loginData, setLoginData] = useState({
    email: null,
    password: null,
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!loginData.email || !loginData.password) {
      displaySnackbar('Please fill in both email and password.', 'warning')
    } else {
      loginAdmin(loginData) // Attempt to login
      // Handle successful login (you can navigate the user or show a success message)
    }
  }
  function displaySnackbar(message, status) {
    setOpenSnackBar(false)
    setSnackStatus(status)
    setSnackbarMes(message)
    setOpenSnackBar(true)
  }
  const [openSnackbar, setOpenSnackBar] = useState(false)
  const [snackBarMes, setSnackbarMes] = useState('')
  const [snackStatus, setSnackStatus] = useState('')
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackBar(false)
  }

  return (
    <>
      <SnackBar
        open={openSnackbar}
        onClose={handleClose}
        severity={snackStatus}
        message={snackBarMes}
      />
      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <div className="Linear2 w-[100vw]  flex flex-col justify-center items-center">
          <div className=" bg-white w-[568px] h-[568px] mt-[150px] mb-[306px] flex flex-col items-center justify-center p-[60px]">
            <div className="flex flex-col justify-center items-center mb-[46px]">
              <CourseFlowIcon width="315" height="36" />
              <h1 className="mt-[24px] Nunito font-[700] text-[24px] text-[#646D89]">
                Admin Panel Control
              </h1>
            </div>
            <div className="mb-[40px]">
              <p className="Body2 pb-[4px]" name="username">
                Username
              </p>
              <input
                type="text"
                className="Input w-[446px] h-[48px]"
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
            </div>
            <div className="mb-[40px]">
              <p className="Body2 pb-[4px]" name="password">
                Password
              </p>
              <input
                type="password"
                className="Input w-[446px] h-[48px]"
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="Primary w-[446px] border-none"
              onClick={loginAdmin}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default AdminLogin
