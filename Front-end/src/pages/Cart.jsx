import React, { useContext, useEffect, useState } from 'react'
import apiSummary from '../common'
import Context from '../context'
import displayCurrency from '../helper/displayCurrency'
import { MdDelete } from "react-icons/md";

const Cart = () => {

    const [data, setdata] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)

    const loadingCart = new Array(context.cartProductCount).fill(null)



    const fetchData = async () => {
      

        const response = await fetch(apiSummary.addToCartProductView.url, {
            method: apiSummary.addToCartProductView.method,
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },

        })
        const result = await response.json()

        if (result.success) {
            setdata(result?.data)
        }
  
    }

    const handleLoading = async () => {
        await fetchData()
    }


    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)

    }, [])


    const increaseQty = async (id, qty) => {
        const response = await fetch(apiSummary.updatCartProduct.url, {
            method: apiSummary.updatCartProduct.method,
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    quantity: qty + 1,
                    _id: id
                }
            )
        })
        const result = await response.json()

        if (result.success) {
            fetchData()
        }
    }


    const decreseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(apiSummary.updatCartProduct.url, {
                method: apiSummary.updatCartProduct.method,
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        quantity: qty - 1,
                        _id: id
                    }
                )
            })
            const result = await response.json()

            if (result.success) {
                fetchData()
            }
        }
    }


    //deleteProduct

    const deleteCartProduct = async (id) => {
        const response = await fetch(apiSummary.deleteCartProduct.url, {
            method: apiSummary.deleteCartProduct.method,
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    _id: id
                }
            )
        })
        const result = await response.json()
        if (result.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }



    // console.log("cartdata", data)
    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.SellingPrice), 0)






    return (
        <div className='container mx-auto'>

            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>No Data </p>
                    )
                }
            </div>


            <div className=' flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                {/* view product*/}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart.map((el, index) => {
                                return (

                                    <div key={el + "add to cart loading" + index}
                                        className='w-full bg-slate-300 h-32 my-2 border border-slate-400 animate-pulse rounded'>
                                    </div>
                                )
                            })

                        ) : (
                            data.map((product, index) => {
                                return (
                                    <div key={product?._id + "Add tocart Loading"}
                                        className='w-full bg-white  h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr] '>

                                        <div className="w-32 h-32 bg-slate-200">
                                            <img src={product?.productId?.ProductImage[0]} className='  py-4 w-full h-full object-scale-down mix-blend-multiply' />
                                        </div>

                                        <div className='px-4 py-2 relative'>

                                            {/* delete product */}
                                            <div className='absolute right-2 text-red-400 hover:text-2xl   hover:text-red-600'
                                                onClick={() => deleteCartProduct(product?._id)}
                                            >
                                                < MdDelete />

                                            </div>



                                            <h2 className='capitalize text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.ProductName} </h2>
                                            <p className='capitalize text-slate-500 italic '>{product?.productId?.Category} </p>

                                            <div className='flex items-center justify-between'>
                                                <p className='text-red-600 font-medium text-lg'>{displayCurrency(product?.productId.SellingPrice)} </p>

                                                <p className='text-slate-600 font-medium text-lg'>{displayCurrency(product?.productId.SellingPrice * product?.quantity)} </p>

                                            </div>
                                            <div className='flex items-center gap-3 mt-1'>
                                                <button
                                                    className=' border-2  border-red-600 w-6 h-6 pb-1 hover:text-white hover:bg-red-600 flex justify-center items-center rounded'
                                                    onClick={() => decreseQty(product?._id, product?.quantity)}
                                                >-
                                                </button>
                                                <span>{product?.quantity} </span>
                                                <button
                                                    className=' border-2  border-red-600 w-6 h-6 pb-1 hover:text-white hover:bg-red-600 flex justify-center items-center rounded'
                                                    onClick={() => increaseQty(product?._id, product?.quantity)}
                                                >+
                                                </button>
                                            </div>

                                        </div>

                                    </div>
                                )
                            })
                        )
                    }
                </div>

                {/* summary */}

                <div className='mt-5 lg:mt-0 w-full max-w-sm '>
                    {
                        loading ? (

                            <div className='h-36 bg-slate-300 border border-slate-300 animate-pulse'>
                                {/* Total :{context.cartProductCount} */}
                            </div>
                        ) : (
                            <div className='h-36 bg-white'>
                                <h2 className='text-white bg-green-600 px-4 py-1'> Summary</h2>

                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Quantity</p>
                                    {totalQty}
                                </div>

                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Subtotal</p>
                                    <p>{displayCurrency(totalPrice)}</p>
                                </div>
                        

                                <button className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>

                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default Cart
