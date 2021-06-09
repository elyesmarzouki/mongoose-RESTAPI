const mongoose = require("mongoose")
require("dotenv").config({path:'./config/.env'})
const URI = process.env.MONGO_URI

const connectDB=async()=>{
try{
    await mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,useFindAndModify: false, })
    console.log("The database is connected !")
}
catch(error){
    console.error("The database is not connected !")
}
}

module.exports=connectDB