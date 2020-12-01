if(process.env.NODE_ENV=='production'){
    module.exports={
        MONGO_URL:process.env.MONGO_URL,
        MONGODB_URL:process.env.MONGODB_URL,
        EMAIL:process.env.EMAIL,
        PASSWORD:process.env.PASSWORD,
        RPORT:process.env.RPORT


    }
}
else{
    module.exports=require('./dev')
}
