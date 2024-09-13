

const backendURL = ``;

const apiSummary = {
    SignUp: {
        url: `${backendURL}/signup`,
        method: "POST",
    },
    LogIn: {
        url: `${backendURL}/login`,
        method: "POST",
    },
    current_user: {
        url: `${backendURL}/userdetails`,
        method: "GET"
    },
    logout_user: {
        url: `${backendURL}/logout`,
        method: "GET",
    },
    allUsers: {
        url: `${backendURL}/all-user`,
        method: "GET",
    },
    updateUser: {
        url: `${backendURL}/update-user`,
        method: "Post",
    },
    uploadProduct: {
        url: `${backendURL}/upload-products`,
        method: "POST",
    },
    allProduct: {
        url: `${backendURL}/getProduct`,
        method: "GET",
    },
    updateProduct: {
        url: `${backendURL}/update-product`,
        method: "POST"
    },
    categoryProduct: {
        url: `${backendURL}/get-CategoryProduct`,
        method: "GET",
    },
    categoryWiseProduct: {
        url: `${backendURL}/category-product`,
        method: "Post",
    },
    productDetails: {
        url: `${backendURL}/productdetails`,
        method: "POST",
    },
    addtocartProduct:{
        url: `${backendURL}/addtocart`,
        method: "POST",
    },
    countAddtoCartProduct:{
        url:`${backendURL}/countAddtoCartProduct`,
        method:"GET",
    },
    addToCartProductView:{
        url: `${backendURL}/view-part-product`,
        method: "GET",
    },
    updatCartProduct:{
        url: `${backendURL}/update-cart-product`,
        method:"POST"
    },
    deleteCartProduct:{
        url: `${backendURL}/delete-cart-product`,
        method: "POST",
    },
    searchProduct:{
        url: `${backendURL}/search`,
        method: "get",
    },
    filterProduct:{
        url: `${backendURL}/filter-product`,
        method: "POST",
    }




}


export default apiSummary;