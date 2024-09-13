import apiSummary from "../common"

const FetchCategoryWiseProduct = async (category) => {
    const response = await fetch(apiSummary.categoryWiseProduct.url, {
        method: apiSummary.categoryWiseProduct.method,
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({
            Category: category
        })
    })

    const dataresult = await response.json()
    // console.log(dataresult)
    return dataresult
}

export default FetchCategoryWiseProduct;