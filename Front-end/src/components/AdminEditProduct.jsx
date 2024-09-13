import React, { useState } from 'react'
import productCategory from '../helper/productCategory';
import { IoClose } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa"
import { MdDeleteForever } from "react-icons/md"
import uploadImages from '../helper/uploadImages';
import DisplayImage from './DisplayImage';
import apiSummary from '../common';
import { toast } from "react-toastify"

export default function AdminEditProduct({ onclose, productData, fetchdata }) {


    const [fullScreenImage, setFullScreenImage] = useState("");
    const [openFullImage, setOpenFullImage] = useState(false);

    const [data, setData] = useState({
        ...productData,
        ProductName: productData?.ProductName,
        BrandName: productData?.BrandName,
        Category: productData?.Category,
        ProductImage: productData?.ProductImage || [],
        Price: productData?.Price,
        Description: productData?.Description,
        SellingPrice: productData?.SellingPrice
    })

    //handle form data
    const handlechange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    //upload product image from frontend view

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]

        //upload images in cloudinary
        try {
            const uploadCloudinary = await uploadImages(file);
            setData((prev) => {
                return {
                    ...prev,
                    ProductImage: [...prev.ProductImage, uploadCloudinary.url]
                }
            })
        } catch (error) {
            console.error(error);
        }

    }

    //delete uploaded image before submit
    const handledeleteProductImage = async (index) => {
        const newProductImage = [...data.ProductImage]
        newProductImage.splice(index, 1)
        setData((prev) => {
            return {
                ...prev,
                ProductImage: [...newProductImage]
            }
        })
    }

    // onsumit
    const handleSubmit = async (e) => {
        e.preventDefault();
        //from backend productModel----> permission----> uploadProduct----> routes(index)----> /upload-products -->frontend -->common --->then uploadProduct
        const response = await fetch(apiSummary.updateProduct.url, {
            method: apiSummary.uploadProduct.method,
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const responsedata = await response.json();
        // console.log("responsedata", responsedata);

        if (responsedata.success) {
            toast.success(responsedata?.message, {
                theme: "colored"
            })
            onclose()
            fetchdata()
        }
        if (responsedata.error) {
            toast.error(responsedata?.message)
        }
        // console.log(data)

    }


    return (
        <div className='fixed w-full h-full top-0 right-0 left-0 bottom-0  bg-slate-300 bg-opacity-35 flex justify-center items-center'>
            <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">

                <div className='flex justify-between items-center '>
                    <h2 className="font-bold text-lg">
                        Edit Product

                    </h2>
                    <div className="w-fit ml-auto text-2xl hover:text-red-500" 
                    onClick={onclose}>
                        <IoClose className="cursor-pointer" />
                    </div>
                </div>


                <form action="" onSubmit={handleSubmit} className='grid p-4 gap-2 overflow-y-scroll h-full pb-9'>

                    {/* productname */}

                    <label htmlFor="productName" className='mt-3'>Product Name :</label>
                    <input type="text"
                        id='productName'
                        name="ProductName"
                        placeholder='enter product name'
                        value={data.ProductName}
                        onChange={handlechange}
                        className='p-2 bg-stone-100 rounded-md border'
                        required
                    />

                    {/* brandname */}

                    <label htmlFor="BrandName" className='mt-3'>Brand Name :</label>
                    <input type="text"
                        id='BrandName'
                        name='BrandName'
                        placeholder='enter brand name'
                        value={data.BrandName}
                        onChange={handlechange}
                        className='p-2 bg-stone-100 rounded-md border'
                        required
                    />

                    {/* Category */}

                    <label htmlFor="Category" className='mt-3'>Category :</label>
                    <select
                        id='Category'
                        name='Category'
                        value={data.Category}
                        onChange={handlechange}
                        className='p-2 bg-stone-100 rounded-md border'
                        required
                    >
                        <option value={""}>Select Category</option>

                        {/* form another file */}

                        {
                            productCategory.map((el, index) => {
                                return (
                                    <option key={el.value + index} value={el.value}>{el.label}</option>
                                )
                            })
                        }
                    </select>


                    {/* product image*/}
                    <label htmlFor="ProductImage" className='mt-3'>Product Images :</label>
                    <label htmlFor="uploadImageInput">
                        <div className="p-2 bg-stone-100 rounded-md border h-32 w-full flex justify-center items-center">


                            <div className=" text-stone-500 flex justify-center items-center flex-col gap-2  cursor-pointer">
                                <span className='text-4xl'>
                                    <FaCloudUploadAlt />
                                </span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type='file'

                                    id='uploadImageInput'
                                    className='hidden'
                                    onChange={handleUploadProduct}
                                
                                />
                            </div>


                        </div>
                    </label>
                    {/* image upload */}
                    <div>
                        {
                            data?.ProductImage[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        data.ProductImage.map((el, index) => {
                                            return (
                                                <div className="relative group">
                                                    <img key={el}
                                                        src={el}
                                                        alt={el}
                                                        width={80}
                                                        height={80}
                                                        className='bg-stone-100 border cursor-pointer'
                                                        onClick={() => {
                                                            setOpenFullImage(true)
                                                            setFullScreenImage(el)
                                                        }} />

                                                    <div className='absolute bottom-0 right-0 p-1 text-white
                             bg-red-600 rounded-full hidden group-hover:block cursor-pointer'
                                                        onClick={() => handledeleteProductImage(index)}
                                                    >
                                                        <MdDeleteForever />

                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <span className='text-red-600 text-xs'>*Please Upload Product Image</span>
                            )
                        }
                    </div>


                    {/* for price section */}

                    <label htmlFor="price">Price :</label>
                    <input
                        type="number"
                        id="price"
                        name="Price"
                        min={1}
                        value={data.Price}
                        onChange={handlechange}
                        className='p-2 bg-stone-100 rounded-md border '
                        required
                    />


                    {/* forSellig price section */}


                    <label htmlFor="SellingPrice">SellingPrice :</label>
                    <input
                        type="number"
                        id="SellingPrice"
                        name="SellingPrice"
                        min={1}
                        value={data.SellingPrice}
                        onChange={handlechange}
                        className='p-2 bg-stone-100 rounded-md border '
                        required
                    />


                    {/* DescriptionDescription */}


                    <label htmlFor="Description" className='mt-3'>Description :</label>
                    <textarea
                        className=' h-28 p-2 bg-stone-100 rounded-md border resize-none '
                        id="Description"
                        name="Description"
                        placeholder='enter Product description'
                        value={data.Description}
                        onChange={handlechange}
                        required
                    ></textarea>

                    <button className='px-3 py-2 bg-red-500 text-white border rounded-xl m-5  hover:bg-red-700'>Update Product</button>
                </form>

            </div>

            {/* display image full screen */}


            {openFullImage && (
                <DisplayImage
                    imgUrl={fullScreenImage}
                    onclose={() => setOpenFullImage(false)} />

            )}

        </div>
    )
}
