const mongoose=require('mongoose')
const proSchema=new mongoose.Schema({
    category:{type:String,required:true},
    wear:{type:String,required:true},
   




})

module.exports=mongoose.model('pro',proSchema)



