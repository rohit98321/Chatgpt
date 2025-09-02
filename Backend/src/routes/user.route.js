const express=require("express")
const {registerController}=require("../controller/user.contrller")

const router=express.Router()

router.post("/register",registerController)