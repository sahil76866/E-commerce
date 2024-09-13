import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoClose } from "react-icons/io5";
import apiSummary from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({ name, email, role, onclose, userId, callfunc }) => {
  // for user update role

  const [userRole, setUserRole] = useState(role)


  const handleChangeRole = (e) => {
    setUserRole(e.target.value)
    // console.log(e.target.value)
  }
  //update user role

  const updateRole = async () => {
    try {

      const fetchresponse = await fetch(apiSummary.updateUser.url, {
        method: apiSummary.updateUser.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          role: userRole
        })
      })
      const result = await fetchresponse.json();


      if (result.success) {
        toast.success(result.message, {
          theme: "colored"
        });
        callfunc();
        onclose();

      }

      //console.log("result updaterole", result)

    } catch (error) {
      toast.error(error)
    }
  }


  return (
    <div className='fixed top-1 bottom-0 right-2 left-2 bg-opacity-55 bg-slate-400
                    w-full h-full z-10 flex justify-between items-center '>
      <div className="mx-auto   bg-white rounded-lg p-4 w-full max-w-md">

        <button className='block text-lg  ml-auto' onClick={onclose}>
          <IoClose />
        </button>

        <h1 className='text-center text-base font-serif '>Change User Role</h1>
        <p>Name:{name}</p>
        <p>Email:{email}</p>

        <div className="flex items-center justify-between my-4">
          <p>ROLE</p>

          <select name=""
            value={userRole}
            onChange={handleChangeRole}
            id=""
            className='border px-4 py-1'>
            {
              Object.values(ROLE).map((el) => {
                return (
                  <option key={el} value={el}>{el}</option>

                )
              })
            }

          </select>
        </div>
        <button
          onClick={updateRole}
          className='w-fit mx-auto block border py-1 px-3 rounded-full bg-red-500 text-white hover:bg-red-700'>
          Change Role
        </button>



      </div>
    </div>
  )
}

export default ChangeUserRole
