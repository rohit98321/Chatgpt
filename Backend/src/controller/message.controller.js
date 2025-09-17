const messageModel=require("../models/message.model")



 const getMssageController=async (req,res)=>{

    const {chatId}=req.params
  


       try {

        const messages=await messageModel.find({chat:chatId})
        res.json({
            message:"messages fetches",
            messages
           
        })
        
       } catch (error) {
        res.json({
            message:"not found"
        })
       }

}

module.exports={
    getMssageController
}