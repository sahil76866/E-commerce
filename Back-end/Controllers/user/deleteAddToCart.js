import addToCartModel from "../../models/CartProduct.js";

const deleteAddToCart = async (req, res) => {
    try {
        const currentUserId=req.userId;
        const  addtocartProductId=req.body._id;

        const deleteProduct=await addToCartModel.deleteOne({_id:addtocartProductId})

        res.json({
            message:"Product deleted to cart",
            error:false,
            data:deleteProduct,
            success:true
        })


    } catch (error) {
        res.json({
            message: error.message,
            error: true,
            success: false
        })

    }
}
export default deleteAddToCart;