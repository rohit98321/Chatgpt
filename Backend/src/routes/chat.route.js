const express=require("express");
const { authUser } = require("../middleware/auth.middleware");
const {chatCreateController,chatsListController}=require("../controller/chat.controller");
const chatModel = require("../models/chat.model");
const router=express();




router.post("/create",authUser,chatCreateController)
router.get("/chats",authUser,chatsListController)



module.exports=router