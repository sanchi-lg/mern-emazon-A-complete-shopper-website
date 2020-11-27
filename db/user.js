const mongoose=require('mongoose')
var crypto=require('crypto')
const userSchema=new mongoose.Schema({
    email:{type:String,unique:true,required:true},
    name:{type:String,required:true},
     hash:String,
     salt:String,
     cart:{type:[
         {id:{type:String},quantity:{type:Number,required:true}}
        ],default:[]},
    
        created_at:{type:Date,default:Date.now},
    
    wish:{type:Array},
    address:{type:Array},
    orders:{type:Array},
    latestrespass:{type:{ltime:Number,ltoken:String}}



})
userSchema.methods.setPassword=function(password){
this.salt=crypto.randomBytes(16).toString('hex')
this.hash=crypto.pbkdf2Sync(password,this.salt,1000,64,'sha512').toString('hex')

}
userSchema.methods.validPassword=function(password){
    var hash=crypto.pbkdf2Sync(password,this.salt,1000,64,'sha512').toString('hex')
    return this.hash===hash
    }

module.exports=mongoose.model('user',userSchema)