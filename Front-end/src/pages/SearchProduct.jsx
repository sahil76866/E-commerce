import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import apiSummary from '../common'
import VerticalCard from '../components/VerticalCard'

export default function SearchProduct() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const query = useLocation()
  // console.log(" full query", query)
  // console.log("query search", query.search)

  const fetchProduct = async () => {
    setLoading(true)
    const response = await fetch(`${apiSummary.searchProduct.url}${query.search}`)
    const dataResponse = await response.json()

    // console.log("data", dataResponse)
    setLoading(false)
    setData(dataResponse.data)
  }

  useEffect(() => {
    fetchProduct()
  }, [query])



  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>loading......</p>
        )
      }

      <p className=' text-2xl font-semibold my-3'>Search Result: {data.length} </p>
      {
        data.length === 0 && !loading && (
          <p className='bg-white text-lg text-center p-4'>No Data Found....!!! </p>
        )
      }

      {
        data.length !== 0 && !loading && (
          <VerticalCard loading={loading} data={data} />
        )
      }

    </div>
  )
}
