import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayCurrency from '../helper/displayCurrency';

const AdminProductCard = ({ data, fetchdata }) => {

    const [editProduct, setEditProduct] = useState(false);

    return (
        <>
            <div className='bg-white p-4 rounded' >
                <div className="w-40 ">
                    <div className='w-38 mb-2  h-32 flex  justify-center items-center'>
                        <img className=' mx-auto h-full object-fill' src={data?.ProductImage[0]} width={100} height={100} alt="" />

                    </div>

                    <h1 className='text-ellipsis line-clamp-2 mb-1'>{data.ProductName}</h1>


                    <div>
                        <p className='font-semibold '>
                            <strike className='my-1 italic font-medium display: block ' >
                                {
                                    displayCurrency(data.Price)
                                }
                            </strike>

                            {
                                displayCurrency(data.SellingPrice)
                            }
                        </p>


                        <div className='w-fit ml-auto p-2 bg-green-100 cursor-pointer
                 hover:bg-green-600 rounded-full hover:text-white'
                            onClick={() => setEditProduct(true)}
                        >
                            <MdModeEditOutline />
                        </div>
                    </div>
                </div>


                {
                    editProduct && (
                        <AdminEditProduct productData={data} onclose={() => setEditProduct(false)} fetchdata={fetchdata} />
                    )
                }
            </div>
        </>
    )
}

export default AdminProductCard
