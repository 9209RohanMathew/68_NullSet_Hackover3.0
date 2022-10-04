const mongoose=require('mongoose')

const pendingOrganizerSchema=new mongoose.Schema({
    organizerId:{
        type:String,
        required:true
    }

})
module.exports=mongoose.model("PendingOrganizer",pendingOrganizerSchema)