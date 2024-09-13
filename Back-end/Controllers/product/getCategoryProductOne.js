import productModel from '../../models/ProductModel.js'



const getCategoryProduct = async (req, res) => {
    try {
        const product = await productModel.distinct("Category")
        // console.log("Category",product)

        //array to store one  product from each category

        const productByCategory = [];

        for (const Category of product) {
            const product = await productModel.findOne({ Category })

            if (product) {
                productByCategory.push(product)

            }
        }
        res.json({
            message: "category Product",
            data: productByCategory,
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

export default getCategoryProduct;