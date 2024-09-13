import React, { useEffect, useState } from 'react'
import apiSummary from '../common'
import { toast } from 'react-toastify'
import '../App.css'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole'



export default function AllUsers() {
    const [allUser, setAllUser] = useState([])
    const [OpenUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id:""
    })



    const fetchAllUser = async () => {

        const dataResponse = await fetch(apiSummary.allUsers.url, {
            method: apiSummary.allUsers.method,
            credentials: "include"
        })
        const result = await dataResponse.json()
        if (result.success) {
            setAllUser(result.data)

        }

        if (result.error) {
            toast.error(result.message)
        }
    }

    useEffect(() => {
        fetchAllUser();
    }, []);

    //update
    const handleUpdate = (el) => {
        setUpdateUserDetails(el)
        setOpenUpdateRole(true)
      

    }



    return (
        <>
            <div className='bg-white p-4 '>
                <table className='w-full userTable  '>
                    <thead>
                        <tr className='bg-black text-white'>
                            <th>Sr.</th>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>Role</th>
                            <th>Created-At</th>
                            <th>Action</th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            allUser.map((el, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{el?.name}</td>
                                        <td>{el?.email}</td>
                                        <td>{el?.role}</td>
                                        <td>{moment(el?.createdAt).format('LL')}</td>
                                        <td>
                                            <button
                                                onClick={() => handleUpdate(el )}
                                                className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500'>
                                                <MdModeEdit />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                {
                    OpenUpdateRole && (

                        <ChangeUserRole
                        name={updateUserDetails.name}
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                        callfunc={fetchAllUser}

                        onclose={() => setOpenUpdateRole(false)} />
                    )
                }
            </div>
        </>
    )
}
