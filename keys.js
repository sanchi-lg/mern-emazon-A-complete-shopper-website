
if(process.env.NODE_ENV=="production"){
    module.exports={
        MONGO_URL:process.env.MONGO_URL,
        MONGODB_URL:rocess.env.MONGODB_URL,
        EMAIL:rocess.env.EMAIL,
        PASSWORD:process.env.PASSWORD,
        RPORT:process.env.RPORT
    }
}
else{
    module.exports=require('./env')

}