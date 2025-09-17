const express =require("express");
const app=express();
const userRouter =require("./routes/user.route")
const chatRouter =require("./routes/chat.route")
const messageRouter=require("./routes/message.route")
const cookieParser=require("cookie-parser")
const cors =require("cors")

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))



//user
 app.use("/user",userRouter)


 //chat
 app.use("/chat",chatRouter)

 //messages
 app.use("/message",messageRouter)




module.exports=app;