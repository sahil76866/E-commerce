import User from '../../models/userModel.js';

async function updateRole(req, res) {
    try {
        const sessionUser=req.userId;

        const { userId, email, name, role } = req.body;
        const payload = {
            ...(email && { email: email }),
            ...(name && { name: name }),
            ...(role && { role: role })
        }



        const user =await User.findById(sessionUser)
        // console.log("user.role",user.role);
        

        const updateUser=await  User.findByIdAndUpdate(userId,payload)
        res.json({
            success:true,
            message: 'User role updated successfully',
            data: updateUser,
            error:false

        })

    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })

    }
}

export default updateRole;