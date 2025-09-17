const express=require("express")
const {getMssageController}=require("../controller/message.controller")

const router=express.Router()



router.get("/:chatId",getMssageController)

module.exports=router