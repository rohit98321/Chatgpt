const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken")


const authUser= async (req,res,next)=>{


    const {token}=req.cookies;

    if(!token){
        return res.status(404).json({
            message:"unauthorize access"
        })
    }

    try {

    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const user =await userModel.findById(decoded.id)
    req.user=user;
    next()
        
    } catch (error) {
        
        res.status(404).json({
            message:"invalid token"
        })
    }



}


module.exports={
    authUser
}