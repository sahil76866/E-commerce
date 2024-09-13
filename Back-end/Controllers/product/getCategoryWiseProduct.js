import productModel from "../../models/ProductModel.js"

const getCategoryWiseProduct = async (req, res) => {
    try {
        const { Category } = req?.body || req?.query
        const product = await productModel.find({ Category })


        res.json({
            data: product,
            message: "Product",
            success: true,
            error: false
        })


    } catch (error) {
        res.status(400).json({

            message: error.message || error,
            error: true,
            success: false
        })

    }
}

export default getCategoryWiseProduct;