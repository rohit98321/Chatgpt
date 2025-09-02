const jwt = require("jsonwebtoken")
const chatModel=require("../models/chat.model")

const chatCreateController= async (req,res)=>{
        const {title}=req.body;
        const user=req.user;
        console.log(user);
        const chat=await chatModel.create({
            title,
            user:user._id
        })


        res.status(200).json({
            message:"new chat created",
            chat:{
                _id:chat._id,
                title:chat.title,
                lastActivity:chat.lastActivity,
                user:chat.user
            }
        })

}


module.exports={
    chatCreateController
}