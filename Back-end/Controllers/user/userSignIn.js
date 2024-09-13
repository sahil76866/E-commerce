import bcrypt from 'bcrypt';
import User from '../../models/userModel.js';
import jwt from 'jsonwebtoken';


async function UserSignIn(req, res) {
    try {
        const { email, password } = req.body;
        // console.log("from login", req.body)
        if (!email) {
            throw new Error('Please enter valid email')
        }

        if (!password) {
            throw new Error('Please enter valid password')
        }

        const user = await User.findOne({ email })
        // console.log("Matching user", user)

        if (!user) {
            throw new Error("user not found")
        }


        const chekPassword = await bcrypt.compare(password, user.password)


        // console.log("checkPAss", chekPassword)

        if (chekPassword) {
            // generate JsonWebToken cookies
            const tokenData = {
                _id: user._id,
                email: user.email,

            }
            const token = await jwt.sign(tokenData, process.env.TOKENSECRET_KEY,
                { expiresIn: 60 * 60 * 8 })   //8hrs

            const tokenOption = {
                httpOnly: true,
                secure: true
            }

            res.cookie("token", token, tokenOption).json({
                data: token,
                message: "login successfull",
                success: true,
                error: false
            })


        } else {
            res.status(401).json({
                message: "Invalid password",
                success: false,
                error: true,
            })
        }


    } catch (error) {

        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}

export default UserSignIn;