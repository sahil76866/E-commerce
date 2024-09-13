import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiSummary from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './Store/userSlice';


export default function App() {

  const dispatch = useDispatch()
  const [cartProductCount, setCartProductCount] = useState(0)


  const fetchUSerDetails = async () => {
    const dataResponse = await fetch(apiSummary.current_user.url, {
      method: apiSummary.current_user.method,

      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },

    })

    const result = await dataResponse.json();
    if (result.success) {
      dispatch(setUserDetails(result.data))
    }

    // console.log('image', result)

  }

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(apiSummary.countAddtoCartProduct.url, {
      method: apiSummary.countAddtoCartProduct.method,
      credentials: "include"
    })
    const result = await dataResponse.json()
    // console.log("result", result)
    setCartProductCount(result?.data?.count)

  }



  useEffect(() => {
    // user Details
    fetchUSerDetails()

    // user Cart Details
    fetchUserAddToCart()

  }, [])


  return (
    <>
      <Context.Provider value={{
        fetchUSerDetails,  //userdetails fetch
        cartProductCount, //current user count add to cart product count
        fetchUserAddToCart
      }}>
        <ToastContainer className='mt-12  '
          position="top-right"
          theme="dark"
          toastClassName='cursive'
        />

        <Header />
        <main className='  min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  )
}
