const mongoose=require('mongoose')

const eventSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter the name"]
    },
    description:{
        type:String,
        required:[true,"Please Enter the Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter the price per head for the event"],
        maxLength:[8,"Price cannot exceed 8 characters"]
    },
    location:{
        type:String,
        required:[true,"Please enter the location of the event"]    
    },
    date:{
        type:Date,
        required:[true,"Please enter the date of the event"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:{
        
        url:{
            type:String,
            required:true
        }},
    category:{
        type:String,
        required:[true,"Please Enter event category"]
    },
    seats:{
        type:Number,
        required:[true,"Please the maximum number of seats"],
        maxLength:[4,"Seats cannot exceed 4 character"],
        default:1
    },
    numOfReview:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:Number,
                required:true
            }

        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:"true"

    },
    createdAt:{
        type:Date,
        default:Date.now
    }
   

})
module.exports=mongoose.model("Events",eventSchema)