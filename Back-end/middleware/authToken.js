import jwt from "jsonwebtoken";

async function authToken(req, res, next) {
    try {
        const token =  req.cookies?.token
        // console.log("token",token);


        if (!token) {
            return res.status(200).json({
                message: "Please login....!",
                error: true,
                success: false
            });
        }

        
        jwt.verify(token, process.env.TOKENSECRET_KEY, (err, decoded) => {
            console.log(err)
            // console.log("decoded", decoded)

            if (err) {
                console.log("eror auth", err)
            }
            //store decoded id into userid
            req.userId = decoded?._id
            next();

        })




    } catch (error) {
        res.status(400).json({
            message: error.message,
            data: [],
            error: true,
            success: false
        })

    }

}
export default authToken;