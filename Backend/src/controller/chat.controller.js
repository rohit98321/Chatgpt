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

const chatsListController= async (req,res)=>{

    const user=req.user;
    console.log(user);
    const chats=await chatModel.find({user:user._id})


    if(chats.length==0){
        return res.status(202).json({
            message:"empty chats",
            
        })
    }

    try {
        console.log(chats);
        res.status(202).json({
            message:"chats fetched",
            chats,
            
        })
        
    } catch (error) {
        res.status(404).json({
            message:"something is wrong",
            
        })
    }
   

}


module.exports={
    chatCreateController,
    chatsListController
}