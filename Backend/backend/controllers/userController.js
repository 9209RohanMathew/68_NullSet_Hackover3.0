const event=require("../models/eventModels")
const ErrorHandler = require("../utils/errorHandler")
const User=require("../models/userModels")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const sendToken=require("../utils/jwtToken")

const authorizeOrganizersModel = require("../models/authorizeOrganizersModel");

//Register a User
exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}=req.body
    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"This is a sample id",
            url:"profileEpicURL",
        },
    })

   sendToken(user,201,res)

})

//Login
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body
    if (!email || !password){
        return next(new ErrorHandler("Please enter email & password",400))
    }
    const user= await User.findOne({email}).select("+password")

    if(!user){
        return next (new ErrorHandler("Invalid Email or Password",401))
    }
    
    const isPasswordMatched=await user.comparePassword(password)
    if(!isPasswordMatched){
        return next (new ErrorHandler("Invalid Email or Password",401))
    }

   sendToken(user,200,res)
})

//Logout user 
exports.logout=catchAsyncErrors(async (req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success:true,
        message:"Logged out"
    })
})

exports.confirmOrganizer=catchAsyncErrors(async(req,res,next)=>{
    let user = await User.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Organizer not found ", 404));
      }
    user=await User.findByIdAndUpdate(req.params.id, {role:"organizerConfirmed"})
    res.status(200).json({
        success: true,
        user,
      });
})
