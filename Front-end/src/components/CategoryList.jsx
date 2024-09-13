import React, { useEffect, useState } from 'react'
import apiSummary from '../common'
import { Link } from 'react-router-dom'

const CategoryList = () => {

  const [categoryProduct, setCategoryProduct] = useState([])
  const [loading, setLoading] = useState(true)


  const categoryLoading = new Array(13).fill(null)



  const fetchCategoryProduct = async () => {
    setLoading(true)
    const response = await fetch(apiSummary.categoryProduct.url)
    const dataResponse = await response.json()
     setLoading(false);
    setCategoryProduct(dataResponse.data)

  }



  useEffect(() => {
    fetchCategoryProduct()
  }, [])

  return (
    <>
      <div className="container mx-auto  py-4 ">
        <div className="flex items-center gap-3 justify-between overflow-scroll scrollbar-none ">


          {
            loading ? (
   
              categoryLoading.map((item, index) => {

                return (
                  <div  key={"categoryLoading" + index} >
                    <div className="h-16 w-16 md:w-20 md:h-20 rounded-full   bg-slate-200 animate-bounce  ">
                    </div>
                  
                  </div>
                )
              })

            ) : (


              categoryProduct.map((product, index) => {
                return (
                  // Link /product-category/'+product?.Category is used to open category wise data

                  <Link to={'/product-category?Category=' + product?.Category} className='cursor-pointer' key={product?.Category+index} >
                    <div className='w-16 h-16 md:w-20  md:h-20  rounded-full overflow-hidden p-3 bg-slate-200 flex items-center justify-center  '>
               
                      <img
                        src={product?.ProductImage[0]}
                        alt={product?.Category}
                        className='h-full  object-scale-down mix-blend-multiply hover:scale-125 transition-all ' />
                    </div>
                    <p className='text-center text-sm md:text-base capitalize'>{product?.Category} </p>
                  </Link>
                )
              })
            )
          }
        </div>



      </div>
    </>
  )
}

export default CategoryList
