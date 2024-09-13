import addToCartModel from "../../models/CartProduct.js";

const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;

        const currentUser = req.userId;

        const isProductAvailable = await addToCartModel.findOne({ productId })
        // console.log("productId ", productId)
        // console.log("currentUser", currentUser)
        // console.log("avalibale", isProductAvailable)
        if (isProductAvailable) {
            return res.json({
                message: "Product already in cart",
                success: false,
                error: true
            })
        }

        const payload = {
            userId: currentUser,
            productId: productId,
            quantity: 1
        }
        const newCart = await addToCartModel(payload);
        const saveProduct = await newCart.save()

        res.json({
            message: "Product added to cart",
            success: true,
            error: false,
            data: saveProduct

        })

    } catch (error) {
        res.json({
            message: error.message,
            error: true,
            success: false
        })

    }
}

export default addToCart;