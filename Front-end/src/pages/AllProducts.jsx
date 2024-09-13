import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import apiSummary from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadPRoduct] = useState(false)
  const [getallProduct, setAllProduct] = useState([])

  const fetchallProducts = async () => {
    const response = await fetch(apiSummary.allProduct.url)
    const responsedata = await response.json();

    setAllProduct(responsedata?.data || [])
  }

  useEffect(() => {
    fetchallProducts()
  },[])



  return (
    <>
      <div className="container bg-white py-2 px-4 flex justify-between items-center">
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full'

          onClick={() => setOpenUploadPRoduct(true)}>
          Upload Product</button>
      </div>

      {/* allProduct */}
      <div className='flex items-center gap-5 py-4 flex-wrap h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          getallProduct.map((product, index) => {
            return (
              <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchallProducts} />
             
            )
          })
        }
      </div>


      {/* upload all product component */}
      {
        openUploadProduct && (
          <UploadProduct onclose={() => setOpenUploadPRoduct(false)} fetchdata={fetchallProducts} />
        )
      }
    </>
  )
}

export default AllProducts
