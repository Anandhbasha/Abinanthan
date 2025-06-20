import User from "../Model/Model.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const readData =async(req,res)=>{
    try {
        const read = await User.find()
        return res.status(200).json({message:"Read succesfully",data:read})
    } catch (error) {
        return res.status(404).json({message:"Unable to Read",err:error})
    }
}

export const insertData = async(req,res)=>{
    try {
        const {userName,Mobile,Password} = req.body
        const existUser = await User.findOne({Mobile})
        if(existUser){
            return res.status(404).json({message:"User Already exist"})
        }
        const insertNew = await User({userName,Mobile,Password}).save()
        return res.status(202).json({message:"Data Inserted Succesfully",data:insertNew})
    } catch (error) {
        return res.status(403).json({message:"Unable to insert new data",err:error})
    }
}
export const updateData = async(req,res)=>{
    try {
        const {userName} = req.body
        const {Mobile} = req.params
        const updateData = await User.findOneAndUpdate({Mobile},{$set:{userName}})
        if(!updateData){
            return res.status(404).json({err:"User doesn't exist"})
        }
        return res.status(200).json({message:`${Mobile} User is Updated Succesfully`})
    } catch (error) {
        return res.status(403).json({message:"Unable to Update data",err:error})
    }
}
export const deleteData = async(req,res)=>{
    try{
        const {Mobile} = req.params
        const deleteData = await User.findOneAndDelete({Mobile}) 
    if(!deleteData){
            return res.status(404).json({err:"User doesn't exist"})
        }
        return res.status(200).json({message:`${Mobile} User is Deleted Succesfully`})
    } catch (error) {
        return res.status(403).json({message:"Unable to Delete data",err:error})
    }
}

export const registerUser = async(req,res)=>{
    try {
        const {userName,Mobile,Password} = req.body
        const existUser = await User.findOne({Mobile})
        if(existUser){
            return res.status(404).json({message:"User Already exist"})
        }
        const Salt = await bcrypt.genSalt(10)
        const hassedPassword = await bcrypt.hash(Password,Salt)
        const insertNewUser = await User({userName:userName,Mobile:Mobile,Password:hassedPassword}).save()
        return res.status(200).json({message:"User Inserted Succesfully",info:insertNewUser})

    } catch (error) {
        return res.status(435).json({message:"Unable to Inserted User",err:error})
    }
}
export const loginUser = async(req,res)=>{
    try {
        const {userName,Password} = req.body
        const existUser = await User.findOne({userName})
        if(!existUser){
            return res.status(404).json({message:"User not in list"})
        }
        const matchPassword = await bcrypt.compare(Password,existUser.Password)
        if(!matchPassword){
            return res.status(404).json({message:"Password not match"})
        }
        const token = jwt.sign({userName},"abcdef",{expiresIn:'5m'})

        return res.status(200).json({message:"Login Succesfull",data:{
            userName:userName,
            token:token
        }})
    } catch (error) {
        return res.status(480).json({message:"Login Error"})
    }


}

export const verifyToken = async(req,res,next)=>{
    const auth = req.headers["authorization"]
    if(!auth){
        return res.status(400).json({message:"Token Not Provided"})
    }

    const token = auth.split(" ")[1]
    // console.log(token);
    
    try {
        const decode = jwt.verify(token,"abcdef")
        req.user = decode
        next()
    }
    catch (error) {
        return res.status(400).json({message:"Access Denied",err:error})
    }


}