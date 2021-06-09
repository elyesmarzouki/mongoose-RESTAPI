const express=require('express')
const router=express.Router()
const User =require('../models/User') 

//GET :  RETURN ALL USERS

router.get("/",async(req,res)=>{
    try {
        const users= await User.find()
        res.status(200).send({msg:"all users",users})
    } catch (error) {
        res.status(500).send("The operation is impossible!")
    }
})

//POST :  ADD A NEW USER TO THE DATABASE

router.post("/",async(req,res)=>{
    try{
        const {name,email,phone}=req.body
        if(!name||!email||!phone){
            return res.status(400).send("name, email and phone are required!")
        }
        const userr= await User.findOne({email})
        if(userr){
            return res.status(400).send("contact already exists")
        }
        const user= new User({name,email,phone})
        await user.save()
        res.status(200).send({msg:"User added",user})
    } catch(error){
        res.status(500).send("The operation is impossible!")
    }
})

//PUT : EDIT A USER BY ID 

router.put("/:userId",async(req,res)=>{
    try {
        const {userId}=req.params
        const newUser= await User.findOneAndUpdate({_id:userId},{$set:{...req.body}})
        res.status(200).send({msg:"User edited",newUser})
    } catch (error) {
        res.status(500).send("The operation is impossible!")
    }
})

//DELETE : REMOVE A USER BY ID

router.delete("/:userId",async(req,res)=>{
    try {
        const {userId}=req.params
        await User.findByIdAndDelete({_id:userId})
        res.status(200).send("User deleted")
    } catch (error) {
        res.status(500).send("The operation is impossible!")
    }
})

module.exports=router