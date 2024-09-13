import React, { useContext, useEffect, useRef, useState } from 'react'
import FetchCategoryWiseProduct from '../helper/FetchCategoryWiseProduct'
import displayCurrency from '../helper/displayCurrency'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import addToCart from '../helper/addToCart';
import Context from '../context';


const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const scrollElement = useRef()

    const loadingList = new Array(6).fill(null)
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }


    const fetchData = async () => {

        const categoryProduct = await FetchCategoryWiseProduct(category)
        setLoading(false)
        // console.log("VerticalData", categoryProduct?.data)
        setData(categoryProduct?.data)
    }


    useEffect(() => {
        fetchData();
    }, [])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 400

    }
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 400

    }

    return (
        <div className='container mx-auto px-4 my-6 relative'>

            <h2 className='text-2xl font-semibold capitalize py-4  transition-all '>{heading}</h2>


            <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none  transition-all' ref={scrollElement}>

                <button
                    onClick={scrollLeft}
                    className=' bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block'>
                    <FaAngleLeft />
                </button>
                <button
                    onClick={scrollRight}
                    className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' >
                    <FaAngleRight />
                </button>
                {
                    loading ? (
                        loadingList.map((product, index) => {
                            return (


                                <div key={index} className='  w-full min-w-[280px] md:min-w-[320px] max-w-[320px]  animate-pulse  bg-white  rounded-sm shadow ' >

                                    <div className="bg-slate-300 h-48   p-1 ">
                                    </div>


                                    <div className='p-4 grid w-full gap-2    '>
                                        <h2 className=' md:text-lg  bg-slate-300 rounded py-3.5 '></h2>
                                        <p className=' bg-slate-300 rounded  py-3.5'> </p>

                                        <div className='flex  gap-3 w-full  '>
                                            <p className='  bg-slate-300  rounded py-3.5 w-full '>  </p>
                                            <p className='  bg-slate-300 rounded  py-3.5 w-full '></p>
                                        </div>
                                        <button className=' bg-slate-300 rounded-full w-full  py-3.5'></button>
                                    </div>
                                </div>
                            )
                        })


                    ) : (
                        data.map((product, index) => {
                            return (


                                <Link to={`product/${product?._id}`} key={index} className='  w-full min-w-[280px] md:min-w-[320px] max-w-[320px]   bg-white  rounded-sm shadow ' >

                                    <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center ">
                                        <img src={product.ProductImage[0]} alt="" className=' mix-blend-multiply object-scale-down h-full hover:scale-110 transition-all' />
                                    </div>

                                    <div className='p-4  grid gap-3 '>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.ProductName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.Category} </p>

                                        <div className='flex gap-3  '>
                                            <p className=' font-medium text-red-600  italic'> {displayCurrency(product?.SellingPrice)} </p>
                                            <p className='text-slate-500  italic  line-through'>{displayCurrency(product?.Price)} </p>
                                        </div>
                                        <button className='mt-3 text-sm bg-red-600 hover:bg-green-600 rounded-full text-white px-3 py-1.5'
                                            onClick={(e) => handleAddToCart(e, product?._id)}
                                        >Add To Cart</button>
                                    </div>

                                </Link>


                            )
                        })

                    )
                }


            </div>
        </div >
    )
}

export default VerticalCardProduct;
