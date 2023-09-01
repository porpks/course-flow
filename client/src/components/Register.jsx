import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuth } from '../contexts/AuthContext.jsx'

function Register() {
    const navigate = useNavigate()
    const { registerData,
        setRegisterData,
        isRegister,
        setIsRegister,
    } = useAuth()

    return (
        <div className="flex justify-center min-h-[960px] relative overflow-hidden">
            <div className="w-[450px] mt-[100px] bg-white overflow-visible">
                <h1 className="H2 text-[#22269E]">
                    Register to start learning!
                </h1>

                <Formik
                    initialValues={{}}
                    validate={values => {
                        const errors = {};
                        if (!values) {
                            alert("Please input the form");
                        }
                        if (!values.name) {
                            errors.name = 'Required!'
                        } else if (!/^[A-Z' -]+$/i.test(values.name)) {
                            errors.name = `Name must be included (A-Z) , (a-z) and (' , -)`;
                        }

                        else if (!values.dateOfBirth) {
                            errors.dateOfBirth = 'Required!'
                        } else if (new Date(values.dateOfBirth) > new Date().getTime()) {
                            errors.dateOfBirth = `Date must  be in the past`;
                        }

                        else if (!values.eduBg) {
                            errors.eduBg = 'Required!'
                        }

                        else if (!values.email) {
                            errors.email = 'Required!';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address!';
                        }
                        else if (!values.password) {
                            errors.password = 'Required!'
                        }
                        else if (values.password.length < 12) {
                            errors.password = 'Password must contain at least 12 or more characters'
                        }
                        return errors;
                    }}
                    onSubmit={(values, actions) => {
                        console.log(values)
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(true);
                        const timeOut = setTimeout(() => {
                            actions.setSubmitting(false);
                            clearTimeout(timeOut);
                        }, 400);

                    }}
                >
                    {({ errors,
                        touched,
                        handleSubmit,
                        isSubmitting,
                        isValid }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className='relative mt-10'>
                                <label htmlFor="name" className="Body2">
                                    Name
                                </label>
                                <Field type="text" name="name" id="name"
                                    placeholder="Enter Name and Lastname"
                                    className={`Body2 w-full mt-1 p-3 rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${errors.name && touched.name ? " border-[#9B2FAC]" : " border-[--gray500]"}`} />
                                <ErrorMessage name="name" component="div"
                                    className='text-[#9B2FAC] absolute right-0 -bottom-6' />
                                {errors.name && touched.name ? <img src='../../public/Exclamation-circle.svg' className='absolute right-4 top-11' /> : null}
                            </div>

                            <div className='relative mt-10'>
                                <label htmlFor="dateOfBirth" className="Body2">
                                    Date of Birth
                                </label>
                                <Field type="date" name="dateOfBirth" id="dateOfBirth"
                                    placeholder="Enter Date of Birth"
                                    className={`Body2 w-full mt-1 p-3 rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${errors.dateOfBirth && touched.dateOfBirth ? " border-[#9B2FAC]" : " border-[--gray500]"}`} />
                                <ErrorMessage name="dateOfBirth" component="div"
                                    className='text-[#9B2FAC] absolute right-0 -bottom-6' />
                                {errors.dateOfBirth && touched.dateOfBirth ? <img src='../../public/Exclamation-circle.svg' className='absolute right-10 top-11' /> : null}
                            </div>

                            <div className='relative mt-10'>
                                <label htmlFor="eduBg" className="Body2">
                                    Education Background
                                </label>
                                <Field type="text" name="eduBg" id="eduBg"
                                    placeholder="Enter Education Background"
                                    className={`Body2 w-full mt-1 p-3 rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${errors.eduBg && touched.eduBg ? " border-[#9B2FAC]" : " border-[--gray500]"}`} />
                                <ErrorMessage name="eduBg" component="div"
                                    className='text-[#9B2FAC] absolute right-0 -bottom-6' />
                                {errors.eduBg && touched.eduBg ? <img src='../../public/Exclamation-circle.svg' className='absolute right-4 top-11' /> : null}
                            </div>

                            <div className='relative mt-10'>
                                <label htmlFor="email" className="Body2">
                                    Email
                                </label>
                                <Field type="email" name="email" id="email"
                                    placeholder="Enter Email"
                                    className={`Body2 w-full mt-1 p-3 rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${errors.email && touched.email ? " border-[#9B2FAC]" : " border-[--gray500]"}`} />
                                <ErrorMessage name="email" component="div"
                                    className='text-[#9B2FAC] absolute right-0 -bottom-6' />
                                {errors.email && touched.email ? <img src='../../public/Exclamation-circle.svg' className='absolute right-4 top-11' /> : null}
                            </div>

                            <div className='relative mt-10'>
                                <label htmlFor="password" className="Body2">
                                    Password
                                </label>
                                <Field type="password" name="password" id="password"
                                    placeholder="Enter Password"
                                    className={`Body2 w-full mt-1 p-3 rounded-lg border-solid focus:border-[--orange500] focus:outline-none ${errors.password && touched.password ? " border-[#9B2FAC]" : " border-[--gray500]"}`} />
                                <ErrorMessage name="password" component="div"
                                    className='text-[#9B2FAC] absolute right-0 -bottom-6' />
                                {errors.password && touched.password ? <img src='../../public/Exclamation-circle.svg' className='absolute right-4 top-11' /> : null}
                            </div>

                            <button type="submit" disabled={isSubmitting}
                                className="Body1 text-white bg-[--blue500] w-full mt-10 p-4 rounded-2xl border-none disabled:bg-[--gray500]">
                                {isSubmitting ? "Registering..." : "Register"}
                            </button>
                        </Form>
                    )}
                </Formik>



                <h1 className="Body2 mt-8">Already have an account?
                    <span className="font-semibold text-[--blue500] ml-2 cursor-pointer active:text-[--blue400]"
                        onClick={() => navigate('/login')}>
                        Log in
                    </span>
                </h1>
            </div>

            <img src="../../public/Vector9.svg" className="absolute left-0 top-[330px]" />
            <img src="../../public/Ellipse5.svg" className="absolute left-[80px] top-[80px]" />
            <img src="../../public//Group5.svg" className="absolute left-[180px] top-[190px]" />
            <img src="../../public/Vector8.svg" className="absolute right-0 -top-[88px]" />
            <img src="../../public/Ellipse4.svg" className="absolute right-[50px] top-[500px]" />
        </div >
    )
}
export default Register