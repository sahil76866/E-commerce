import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../helper/productCategory'
import VerticalCard from '../components/VerticalCard'
import apiSummary from '../common'

const CategoryProduct = () => {


  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  //sort
  const [sortBy, setSortBy] = useState("")
  //filter
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListinArray = urlSearch.getAll("Category")

  const urlCategoryListinObject = {}

  urlCategoryListinArray.forEach((el) => {
    urlCategoryListinObject[el] = true
  })

  // console.log("urlCategoryListinArray", urlCategoryListinArray)

  const [selectCategory, setSelectCategory] = useState(urlCategoryListinObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])


  const fetchdata = async () => {
    setLoading(true)
    const response = await fetch(apiSummary.filterProduct.url, {
      method: apiSummary.filterProduct.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Category: filterCategoryList
      })
    })

    const dataResponse = await response.json()
    setData(dataResponse?.data || [])
    setLoading(false)

    // console.log("dataresponse sort", dataResponse)
  }





  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked
      }
    })
    // console.log("selected category", name, value, checked)
  }
  // console.log("selected category", selectCategory)


  useEffect(() => {
    fetchdata()
  }, [filterCategoryList])



  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(CategoryKeyName => {
      if (selectCategory[CategoryKeyName]) {
        return CategoryKeyName
      }

      return null

    }).filter(el => el)
    // console.log("array of category", arrayOfCategory)
    setFilterCategoryList(arrayOfCategory)

    //format for url change when change on the checkbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${el}`
      }
      return `category=${el}&&`
    })

    navigate("/product-category?" + urlFormat.join(""))
    // console.log("urlFormat", urlFormat)
  }, [selectCategory])



  //sortby price
  const handleChangeSortBy = (e) => {
    const { value } = e.target

    setSortBy(value)

    if (value === "asc") {
      setData(prev => prev.sort((a, b) => a.SellingPrice - b.SellingPrice))
    }

    if (value === "dsc") {
      setData(prev => prev.sort((a, b) => b.SellingPrice - a.SellingPrice))
    }


  }

  useEffect(() => {

  }, [sortBy])


  // console.log(params?.CategoryName)
  return (
    <>

      <div className="container mx-auto p-4">

        {/* Desktop version */}

        <div className='hidden lg:grid grid-cols-[200px,1fr]'>

          {/* left side */}

          <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll '>

            {/* sortby price */}
            <div>

              <h3 className='text-base uppercase font-medium text-slate-600 border-b pb-1 border-slate-500 '>Sort by</h3>

              <form className='text-sm flex flex-col gap-2 p-2 mt-2'>

                <div className='flex items-center gap-3'>
                  <input
                    type='radio'
                    name='sortBy'
                    checked={sortBy === 'asc'}
                    value={"asc"}
                    onChange={handleChangeSortBy} />
                  <label>Price - Low to High</label>
                </div>

                <div className='flex items-center gap-3'>
                  <input
                    type='radio'
                    name='sortBy'
                    checked={sortBy === 'dsc'}
                    value={"dsc"}
                    onChange={handleChangeSortBy} />
                  <label>Price - High to Low</label>
                </div>

              </form>


            </div>

            {/* filterby */}
            <div>

              <h3 className='text-base uppercase font-medium text-slate-600 border-b pb-1 border-slate-500 mt-6 '>Filter by</h3>

              <form className='text-sm flex flex-col gap-2 p-2 mt-2'>

                {
                  productCategory.map((product, index) => {
                    return (
                      <div key={index} className='flex items-center gap-3'>
                        <input type='checkbox'
                          name={'Category'}
                          id={product?.value}
                          value={product?.value}
                          onChange={handleSelectCategory}
                          checked={selectCategory[product?.value]}
                        />
                        <label htmlFor={product?.value}> {product?.label} </label>

                      </div>
                    )
                  })
                }

              </form>


            </div>

          </div>


          {/* right side */}

          <div className='px-4'>
            <p className='font-medium text-slate-700 text-lg my-2 '> Search Result : {data.length}</p>
            <div className=' min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
              {
                data.length !== 0 && (
                  <VerticalCard data={data} loading={loading} />
                )
              }
            </div>
          </div>

        </div>
      </div>


    </>
  )
}

export default CategoryProduct
