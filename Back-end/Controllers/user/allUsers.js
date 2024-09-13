import User from '../../models/userModel.js';

async function allUsers(req, res) {
    try {
        // console.log('current user id', req.userId)
        const allUsers = await User.find({});
        res.json({
            message: 'ALL users',
            data: allUsers,
            success: true,
            error: false
        })

    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })

    }
}

export default allUsers;