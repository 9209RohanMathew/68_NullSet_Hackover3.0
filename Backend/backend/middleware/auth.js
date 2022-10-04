const ErrorHandler = require("../utils/errorHandler")

const catchAsyncErrors=require("./catchAsyncErrors")
const jwt =require("jsonwebtoken")
const User=require("../models/userModels")
exports.isAuthenthicatedUser = catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies 
    if(!token){
        return next(new ErrorHandler("Please login to access this resource",401))
    }
    const decodeData=jwt.verify(token,process.env.JWT_SECRET)
    req.user=await User.findById(decodeData.id)
    next()
})

exports.authorizeRoles=(... roles)=>{
    return  (req,res,next)=>{
      if (!roles.includes(req.user.role)){
        return next(new ErrorHandler(`Role :${req.user.role} is not allowed to access this resource`,403))
      }
   
      next()
       
    }
}

exports.authorizeRoles=(... roles)=>{
  return  (req,res,next)=>{
    if (!roles.includes(req.user.role)){
      return next(new ErrorHandler(`Role :${req.user.role} is not allowed to access this resource`,403))
    }
    else if (roles[2].includes(req.user.roles)){
      async function storeOrganizerInDB(){
        await authorizeOrganizersModel(req.user.id)  
      }
      storeOrganizerInDB();
      return next(new ErrorHandler(`Role :${req.user.role} is not allowed to directly access this resource, profile is sent for confirmation`,403))
    }
 
    next()
     
  }
}
