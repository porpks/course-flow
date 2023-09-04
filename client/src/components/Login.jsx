import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import axios from 'axios'

function Login() {
    const navigate = useNavigate()
    const { loginData,
        setLoginData,
    } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!email || !password) {
            console.log("nodata");
        } else {
            setLoginData({
                email,
                password,
            })
            setEmail("")
            setPassword("")
            try {
                const result = await axios.post('http://localhost:4000/auth/login', loginData)
            } catch (error) {
                alert(error)
            }
        }

    }

    console.log(loginData);
    return (

        <div className="flex justify-center min-h-[100vh] relative overflow-hidden">
            <div className="w-[450px] mt-[100px] bg-white overflow-visible">
                <h1 className="H2 text-[#22269E]">
                    Welcome back!
                </h1>

                <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="email" className="Body2 mt-10">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="Body2 mt-1 p-3 rounded-lg border-solid border-[--gray500] focus:border-[--orange500] focus:outline-none"
                        placeholder="Enter Email"
                    />
                    <label htmlFor="password" className="Body2 mt-10">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="Body2 mt-1 p-3 rounded-lg border-solid border-[--gray500] focus:border-[--orange500] focus:outline-none"
                        placeholder="Enter Password"
                    />
                    <button type="submit" className="Body1 text-white bg-[--blue500] mt-10 p-4 rounded-2xl border-none cursor-pointer hover:bg-[--blue400] active:bg-[--blue700]">
                        Login
                    </button>
                </form>

                <h1 className="Body2 mt-8">Don’t have an account?
                    <span className="font-semibold text-[--blue500] ml-2 cursor-pointer active:text-[--blue400]"
                        onClick={() => navigate('/register')}>
                        Register
                    </span>
                </h1>
            </div>

            <img src="../../public/Vector9.svg" className="absolute left-0 top-[330px]" />
            <img src="../../public/Ellipse5.svg" className="absolute left-[80px] top-[80px]" />
            <img src="../../public//Group5.svg" className="absolute left-[180px] top-[190px]" />
            <img src="../../public/Vector8.svg" className="absolute right-0 -top-[88px]" />
            <img src="../../public/Ellipse4.svg" className="absolute right-[50px] top-[500px]" />
        </div>
    )
}
export default Login