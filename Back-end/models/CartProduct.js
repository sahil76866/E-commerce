import mongoose from 'mongoose'

const addToCart = new mongoose.Schema({

    productId: {
        ref: 'product',  //databasenname from cartproduct
        type: String,
    },
    quantity: Number,
    userId: String,
}, {
    timeStamps: true
})

const addToCartModel = mongoose.model("addtoCartModel", addToCart)

export default addToCartModel;