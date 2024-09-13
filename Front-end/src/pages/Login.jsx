import React, { useContext, useState } from 'react'
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import LoginImage from '../assest/signin.gif'
import { Link, useNavigate } from 'react-router-dom';
import apiSummary from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {

    const [showPass, setPass] = useState(false)
    const navigate = useNavigate()
    const { fetchUSerDetails, fetchUserAddToCart } = useContext(Context)
    const [data, setData] = useState({
        email: '',
        password: '',
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataResponse = await fetch(apiSummary.LogIn.url, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        const datApi = await dataResponse.json()
        if (datApi.success) {
            toast.success(datApi.message, {
                theme: "colored"
            })
            navigate('/')
            fetchUSerDetails()
            fetchUserAddToCart()
        }
        if (datApi.error) {
            toast.error(datApi.message)
        }

    }

    return (
        <section id='login'>
            <div className="mx-auto container p-4 ">
                <div className="bg-white p-2 w-full max-w-md mx-auto shadow-md mt-5">

                    <div className=' w-20 h-20  mx-auto mb-9'>
                        <img src={LoginImage} alt="" />
                    </div>
                    {/* form */}
                    <form action=""
                        onSubmit={handleSubmit}
                        className='my-4 '>
                        <label htmlFor='email'>Email </label>
                        <div className='bg-slate-100 p-2 my-4'>
                            <input type="email"
                                name="email"
                                id='email'
                                value={data.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className='w-full h-full outline-none bg-transparent'
                            />
                        </div>

                        <div>
                            <label htmlFor='password'>Password </label>
                            <div className='bg-slate-100 p-2 flex my-4'>

                                <input type={showPass ? "text" : "password"}
                                    name="password" id='password'
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    value={data.password}
                                    className='w-full h-full outline-none bg-transparent'
                                />

                                <div className="cursor-pointer text-xl "
                                    onClick={() => setPass((prev) => !prev)}>

                                    <span>
                                        {showPass ? (<IoEye />) : (<FaEyeSlash />)}
                                    </span>


                                </div>

                            </div>
                            <Link to={'/forgot-password'}
                                className='block w-fit ml-auto italic hover:underline hover:text-red-600' >
                                Forgot Password ?</Link>
                        </div>
                        <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px]  
                         rounded-full  mx-auto block mt-4
                         hover:scale-110 transition-all  '>
                            Login
                        </button>
                    </form>

                    <p className='my-5'> Don't have Account?
                        <Link to={'/signUp'} className='text-red-500 font-bold'> Sign Up</Link>
                    </p>


                </div>

            </div>
        </section>
    )
}

export default Login
