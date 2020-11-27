const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    category:{type:String,required:true},
    wear:{type:String,required:true},
    product:{type:String,required:true},
    image:{type:String,required:true},
    discount:{type:Number,default:0},
    brand:{type:String,required:true},
    oprice:{type:Number,required:true},

    price:{type:Number,default:function(){
        return ((100-this.discount)*this.oprice)/100
    }},
    description:{type:String},
    created_at:{type:String,default:((new Date()).getDate()+"-"+(new Date()).getMonth()+"-"+(new Date()).getFullYear())}






})

module.exports=mongoose.model('product',productSchema)



