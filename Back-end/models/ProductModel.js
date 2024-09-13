import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    ProductName: String,
    BrandName: String,
    Category: String,
    ProductImage: [],
    Price: Number,
    Description: String,
    SellingPrice: Number
}, {
    timestamps: true
})
const productModel = mongoose.model('product', productSchema);

export default productModel;