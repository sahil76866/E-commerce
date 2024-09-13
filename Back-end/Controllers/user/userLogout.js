async function userLogout(req,res) {
    try {
        res.clearCookie("token")

        res.status(201).json({
            message:'logout is successfull',
            error:false,
            success:true,
            data:[]
        })
  
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}
export default userLogout;