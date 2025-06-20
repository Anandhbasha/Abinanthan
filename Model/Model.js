import mongoose from "mongoose";

const userScehma = new mongoose.Schema({
    userName:String,
    Mobile:Number,
    Password:String
})

const User = mongoose.model("Users",userScehma,"NewTable")

export default User