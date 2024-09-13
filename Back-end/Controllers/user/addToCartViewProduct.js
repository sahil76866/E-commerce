import addToCartModel from "../../models/CartProduct.js";

const addToCartViewProduct=async(req,res)=>{

    try {
        const currentUser=req.userId;  //from middleware

        const allProduct=await addToCartModel.find({userId:currentUser}).populate("productId")

        res.json({
            data:allProduct,
            success:true,
            error:false,
        })
        
    } catch (error) {
        res.json({
            message:error.message,
            error:true,
            success:false,
        })
        
    }
}
export default addToCartViewProduct;