import User from '../../models/userModel.js';

async function userDetails(req,res) {
    try {
        // console.log("id",req.userId)
        const user = await User.findById(req.userId)
        res.status(200).json({
            data:user,
            error:false,
            success:true,
            message:"user details"
        })
   
    } catch (error) {
        res.status(400).json({
            message:error.message||error,
            error:true,
            success:false
        })
        
    }
    
}

export default userDetails;