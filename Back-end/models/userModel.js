import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,   
    confirmPassword:String,
    profilePic:String,
    role:String,

},{
    timestamps:true
})
const User=mongoose.model('User',userSchema);

export default User;