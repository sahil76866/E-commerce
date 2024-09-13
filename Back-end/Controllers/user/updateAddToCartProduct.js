import addToCartModel from "../../models/CartProduct.js";

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addtocartProductId = req?.body?._id

        const qty = req.body.quantity
        const updateProduct = await addToCartModel.updateOne({_id:addtocartProductId}, {
            ...(qty && { quantity: qty })
        })

        res.json({
            message:"update product",
            data:updateProduct,
            error:false,
            success:true
        })

    } catch (error) {
        res.json({
            message: error?.message || error,
            error: true,
            success: false
        })

    }
}

export default updateAddToCartProduct;