const jwt=require("jsonwebtoken")
const userModel=require("../models/user.model")
const bcrypt=require("bcryptjs")




const registerController= async (req,res)=>{

    const {email,password,fullname:{firstname,lastname}}=req.body;

    const validemail=await userModel.findOne({email})

    if(validemail){
        return res.status(404).json({
            message:"this email is already has been created"
        })
    }

    const user=await userModel.create({
        email:email,
        password: await bcrypt.hash(password,10),
        fullname:{
            firstname,
            lastname
        }
    })

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"user register successfully",
        user
    })

    





}

const loginController=async (req,res)=>{
    const {email,password}=req.body;
    
    const existUser=await userModel.findOne({email})
    if(!existUser){
        return res.status(404).json({
            message:"wrong email"
        })
    }
    const matchPassword= await bcrypt.compare(password,existUser.password)

    if(!matchPassword){
        return res.status(404).json({
            message:"wrong password"
        })
    }

   

    try {

        const token=jwt.sign({id:existUser._id},process.env.JWT_SECRET)
        res.cookie("token",token);
        res.status(200).json({
            message:"user loggedin successfully",
            existUser
        })

    } catch (error) {
        console.log(error);
        
    }

    



}


module.exports={
    registerController,
    loginController
}