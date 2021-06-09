const express = require('express')
const app = express()
require("dotenv").config({path:'./config/.env'})
const port = process.env.S_PORT
const connectDB =require('./config/connectDB')
const UserRouter=require('./routes/user')

app.use(express.json())
app.use("/users",UserRouter)
connectDB()
app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`The server is running on port ${port}`)
    }
})