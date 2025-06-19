import mongoose from "mongoose";

const userScehma = new mongoose.Schema({
    userName:String,
    Mobile:Number
})

const User = mongoose.model("Users",userScehma,"newmodels")

export default User