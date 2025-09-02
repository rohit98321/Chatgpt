const express=require("express");
const { authUser } = require("../middleware/auth.middleware");
const {chatCreateController}=require("../controller/chat.controller")
const router=express();




router.post("/create",authUser,chatCreateController)



module.exports=router