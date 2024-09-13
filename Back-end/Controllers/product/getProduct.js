import productModel from "../../models/ProductModel.js";


const getProduct = async (req, res) => {
    try {
        const allProductData=await productModel.find().sort({createdAt:-1})

        res.json({
            message:"All Products",
            success:true,
            error:false,
            data:allProductData 
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
export default getProduct;