import productModel from "../../models/ProductModel.js"

const searchProduct = async (req, res) => {
    try {
        const query = req.query.q;
        const regx = new RegExp(query, "i", "g")

        const product = await productModel.find({
            "$or": [
                {
                    ProductName:regx
                }, {
                    Category:regx
                }
            ]
        })

        res.json({
            data: product,
            message: "Search Product list",
            error: false,
            success: true
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            success: false,
            error: true

        })

    }


}
export default searchProduct;