import apiSummary from "../common";
import { toast } from 'react-toastify';

const addToCart = async (e, id) => {
    e?.stopPropagation()
    e?.preventDefault()

    const response = await fetch(apiSummary.addtocartProduct.url, {
        credentials: "include",
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ productId: id })
    })
    const responseData = await response.json()
    // console.log(responseData)

    if (responseData.success) {
        toast.success(responseData.message , {
            theme: "colored"})
    }
    if (responseData.error) {
        toast.error(responseData.message)
    }
    return responseData

}
export default addToCart;