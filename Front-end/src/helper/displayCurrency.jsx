const displayCurrency=(num)=>{
    const formatt=new Intl.NumberFormat('en-IN',{
        style:'currency',
        currency:'INR',
        minimumFractionDigits:2
    })

    return formatt.format(num)
}

export default displayCurrency;
