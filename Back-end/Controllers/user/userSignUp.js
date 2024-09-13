import bcrypt from 'bcrypt';
import User from '../../models/userModel.js';

async function userSignUp(req, res) {
    try {
        const { name, email, password, confirmPassword } = req.body;
        // console.log("requested data",req.body)
        if (!email) {
            throw new Error('Please enter valid email')
        }
        if (!name) {
            throw new Error('Please enter valid nname')
        }
        if (!password && !confirmPassword) {
            throw new Error('Please enter valid password')
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashedPassword
        }


        if (!hashedPassword) {
            throw new Error('Password hashing failed')
        }

        const userData = new User(payload)
        const saveUser = await userData.save();
        // console.log("save to database",saveUser)
        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "user created successfully"
        })


    } catch (error) {

        res.json({
            message: error.message || error,
            error: true,
            success: false
        })

    }
}

export default userSignUp;