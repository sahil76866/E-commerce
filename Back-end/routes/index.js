import express from 'express';
import userSignUp from '../Controllers/user/userSignUp.js';
import UserSignIn from '../Controllers/user/userSignIn.js';
import userLogout from '../Controllers/user/userLogout.js';
import userDetails from '../Controllers/user/userDetails.js';

import authToken from '../middleware/authToken.js';

import allUsers from '../Controllers/user/allUsers.js';
import updateRole from '../Controllers/user/updateRole.js';
import uploadProduct from '../Controllers/product/uploadProduct.js';
import getProduct from '../Controllers/product/getProduct.js';
import updateProduct from '../Controllers/product/updateProduct.js';
import getCategoryProduct from '../Controllers/product/getCategoryProductOne.js';
import getCategoryWiseProduct from '../Controllers/product/getCategoryWiseProduct.js';
import getProductDetails from '../Controllers/product/getProductDetails.js';
import addToCart from '../Controllers/user/addToCart.js';
import countAddtoCartProduct from '../Controllers/user/countAddtoCartProduct.js';
import addToCartViewProduct from '../Controllers/user/addToCartViewProduct.js';
import updateAddToCartProduct from '../Controllers/user/updateAddToCartProduct.js';
import deleteAddToCart from '../Controllers/user/deleteAddToCart.js';
import searchProduct from '../Controllers/product/searchProduct.js';
import filterProduct from '../Controllers/product/filterProduct.js';



const router = express.Router();

router.post('/signup', userSignUp)
router.post('/login', UserSignIn)
router.get('/logout', userLogout)
router.get('/userdetails', authToken, userDetails)

//admin panel
//by authToken user data can send to frontend 
router.get('/all-user', authToken, allUsers)
//update role 
router.post('/update-user', authToken, updateRole)

//product
//searchProduct
router.post('/upload-products', authToken, uploadProduct)
router.get('/getProduct', getProduct)
router.post('/update-product', authToken, updateProduct)
router.get('/get-CategoryProduct',getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/productdetails",getProductDetails)
router.get("/search",searchProduct)

// user add to cart
router.post("/addtocart",authToken,addToCart)
router.get("/countAddtoCartProduct",authToken,countAddtoCartProduct)

router.get("/view-part-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCart)

//filter product
router.post("/filter-product",filterProduct)


export default router;

