import React, { useContext, useState } from 'react'
import { ImSearch } from "react-icons/im";
import { FaRegCircleUser } from "react-icons/fa6"
import { BsCartPlusFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import apiSummary from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../Store/userSlice';
import ROLE from '../common/role'
import Context from '../context';
import Logo from './Logo';


const Header = () => {
  const [menuDisplay, setMenuDisplay] = useState(false)
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery =URLSearch.getAll('q')
  const [search, setSearch] = useState(searchQuery)


  // const [search, setSearch] = useState(searchInput?.search.split("=")[1])

  // console.log("searchInput", searchInput?.search.split("=")[1])

  const handleLogout = async () => {
    const fetchLogout = await fetch(apiSummary.logout_user.url, {
      method: apiSummary.logout_user.method,
      credentials: "include"
    })

    const data = await fetchLogout.json();
    if (data.success) {
      toast.success(data.message, {
        theme: "colored"
      })
      dispatch(setUserDetails(null))
      navigate('/')
    }
    if (data.error) {
      toast.error(data.error)
    }
  }


  // console.log("header count", context)

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)

    if (value) {
      navigate(`/search?q=${value}`)

    } else {
      navigate('/search')
    }


  }


  return (
    <header className='  h-16 shadow-md  bg-white fixed w-full z-10'>
      <div className=" h-full container mx-auto flex  items-center  justify-between px-4">

        <div>
          <Link to={"/"}>
         <Logo w={70} h={40} /> 
            
          </Link>
        </div>

        {/* search icon nav */}

        <div className='hidden md:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>

          <input type="text"
            name='searchbox'
            id='searchbox'
            placeholder='search products here...'
            className='w-full outline-none '
            onChange={handleSearch}
            value={search}
          />
          <div className='text-lg  h-8 w-14 bg-red-600 flex items-center pl-4 rounded-r-full text-white'>
            <ImSearch />
          </div>
        </div>



        {/* rights icons admin cart */}
        <div className='flex  items-center gap-7'>
          <div className="relative group flex justify-center">
            {
              user?._id && (
                <div className='text-center text-2xl cursor-pointer '
                  onClick={() => setMenuDisplay(prev => !prev)}>

                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} alt={user?.name} className='w-10 h-10 rounded-full' />
                    ) : (
                      <FaRegCircleUser />
                    )
                  }

                </div>)}



            {
              menuDisplay && (
                <div className={`absolute bg-white bottom-0 top-10 h-fit p-2 shadow-lg rounded  `}>
                  <nav>
                    {/* hidden for all screen and visible md:block on above 760px */}

                    {/* only admin can use admin panel */}
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link Link to={'/adminPanel/all-products'}
                          className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2  '
                          onClick={() => setMenuDisplay(prev => !prev)}  > Admin Panel</Link>
                      )}


                  </nav>
                </div>
              )
            }
          </div>



          {
            user?._id && (
              <Link to={"/cart"} className='text-center text-2xl cursor-pointer relative'>
                <span> <BsCartPlusFill /></span>
                <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3 ">
                  <p className='text-sm'>{context?.cartProductCount} </p>
                </div>
              </Link>
            )
          }


          <div>
            {
              user?._id ? (
                <button onClick={handleLogout}
                  className='bg-red-600 px-3 py-1 rounded-full text-white hover:bg-red-700 '>Logout</button>
              ) : (

                <Link to={"login"} className='bg-red-600 px-3 py-1 rounded-full text-white hover:bg-red-700 '>Login</Link>
              )
            }
          </div>


        </div>


      </div>



    </header >
  )
}

export default Header
