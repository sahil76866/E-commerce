import addToCartModel from "../../models/CartProduct.js"

const countAddtoCartProduct=async(req,res)=>{
    try {
        const userId=req.userId

        const count=await addToCartModel.countDocuments({userId:userId})
        // console.log("count::::",count)
        
        res.json({
            data:{
                count:count
            },
            message:"Count of product in cart",
            error:false,
            success:true
        })
    } catch (error) {
        res.json({
            message:error.message,
            success:false,
            error:true
        })
        
    }
}

export default countAddtoCartProduct;