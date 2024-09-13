import mongoose from "mongoose";



async function connection() {
    try {
       await  mongoose.connect(process.env.MONGODB_URL)
       console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error.message)
        
    }
    
}
export default connection;