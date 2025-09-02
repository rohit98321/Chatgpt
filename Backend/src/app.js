const express =require("express");
const app=express();
const userRouter =require("./routes/user.route")
const chatRouter =require("./routes/chat.route")
const cookieParser=require("cookie-parser")

//middleware
app.use(express.json())
app.use(cookieParser())



//user
 app.use("/user",userRouter)


 //chat
 app.use("/chat",chatRouter)




module.exports=app;