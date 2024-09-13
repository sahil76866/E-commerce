import uploadProductPermission from "../../helpers/permission.js"
import productModel from "../../models/ProductModel.js"

async function uploadProduct(req, res) {
    try {
        const sessionUserId = req.userId
        // console.log("sessionUserId", sessionUserId)

        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied");

        }


        const uploadProduct = new productModel(req.body)
        const result = await uploadProduct.save()
        res.status(201).json({
            message: "Product uploaded successfully",
            data: result,
            error: false,
            success: true
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })

    }

}
export default uploadProduct;
