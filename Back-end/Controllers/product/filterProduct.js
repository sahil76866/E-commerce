import productModel from "../../models/ProductModel.js";

const filterProduct = async (req, res) => {
    try {
        const categoryList = req?.body?.Category || []
        // console.log("filter product list",categoryList)

        const product = await productModel.find({
            Category: { "$in": categoryList }
        })

        res.json({
            data: product,
            error: false,
            message : "filter product",
            success: true
        })

    } catch (error) {
        res.json({
            error: true,
            success: false,
            message: error.message || error
        })

    }
}

export default filterProduct;