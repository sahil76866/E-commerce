import React, { useState } from 'react'
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import SignUpImage from '../assest/signin.gif'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ImageToBase64 from '../helper/ImageToBase64';
import apiSummary from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {

  const [showPass, setPass] = useState(false)
  const [confirmPassword, setConfirmPass] = useState(false)
  const navigate = useNavigate()

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: '',

  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }
  //upload pic
  const handleUpload = async (e) => {
    const file = e.target.files[0]

    const imgPic = await ImageToBase64(file)
    // console.log('imagePic', imgPic)

    setData((prev) => {
      return {
        ...prev,
        profilePic: imgPic
      }
    })



  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(apiSummary.SignUp.url, {
        method: apiSummary.SignUp.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data),

      })
      const dataapi = await dataResponse.json()

      if (dataapi.success) {
        toast.success(dataapi.message, {
          theme: "colored"
        })
        navigate('/login')
      }

      if (dataapi.error) {
        toast.error(dataapi.message)
      }


    } else {
      toast.error(`Please check password and confirm Password`)
    }


  }

  // console.log("data login", data)
  return (
    <section id='SignUp'>
      <div className="mx-auto container p-4  ">
        <div className="bg-white p-2 w-full max-w-md mx-auto shadow-md mt-5">

          <div className=' w-24 h-24  mx-auto relative rounded-full overflow-hidden '>
            <div>
              <img src={data.profilePic || SignUpImage} alt="" />
            </div>
            <form >
              <label >
                <div className=' text-center  text-white font-bold bg-opacity-30 text-xs cursor-pointer
                   bg-slate-800 pb-4 absolute bottom-0 w-full  '>
                  Upload Photo
                </div>
                <input type="file" className='hidden' onChange={(e) => handleUpload(e)} />
              </label>
            </form>

          </div>


          {/* form */}

          <form action=""
            onSubmit={handleSubmit}
            className='my-4 '>

            {/* name */}
            <div className="container  flex justify-between">
              <label htmlFor='name'>FirstName </label>

            </div>

            <div className='bg-slate-100 p-2 '>
              <input type="text"
                name="name"
                id='name'
                value={data.name}
                onChange={handleChange}
                // required
                placeholder="first name"
                className=' outline-none bg-transparent ' />

            </div>


            {/* email */}

            <div className='mt-4'>

              <label htmlFor='mail' >Email </label>
            </div>
            <div className='bg-slate-100 p-2  '>
              <input type="email"
                name="email"
                id='mail'
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email"
                // required
                className='w-full h-full outline-none bg-transparent' />
            </div>

            {/* password */}


            <div>
              <div className="mt-4">

                <label htmlFor='password'>Password :</label>
              </div>
              <div className='bg-slate-100 p-2 flex '>

                <input type={showPass ? "text" : "password"}
                  name="password" id='password'
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={data.password}
                  // required
                  className='w-full h-full outline-none bg-transparent' />

                <div className="cursor-pointer text-xl "
                  onClick={() => setPass((prev) => !prev)}>

                  <span>
                    {showPass ? (<IoEye />) : (<FaEyeSlash />)}
                  </span>


                </div>
              </div>
              <div className="mt-4">

                <label htmlFor='confirmPassword'>Confirm Password :</label>
              </div>
              <div className='bg-slate-100 p-2 flex '>

                <input type={confirmPassword ? "text" : "password"}
                  name="confirmPassword" id='confirmPassword'
                  placeholder="Enter your confirmPassword"
                  onChange={handleChange}
                  value={data.confirmPassword}
                  // required
                  className='w-full h-full outline-none bg-transparent' />

                <div className="cursor-pointer text-xl "
                  onClick={() => setConfirmPass((prev) => !prev)}>

                  <span>
                    {confirmPassword ? (<IoEye />) : (<FaEyeSlash />)}
                  </span>


                </div>
              </div>





            </div>
            <button className='bg-red-600 text-white px-6 mt-6 py-2 w-full max-w-[150px]  
                         rounded-full  mx-auto block 
                         hover:scale-110 transition-all  '>
              SignUp
            </button>
          </form>




        </div>

      </div>
    </section>
  )
}

export default SignUp

