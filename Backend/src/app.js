const express =require("express");
const app=express();
const userRouter =require("./routes/user.route")

//user
 app.use("/user",userRouter)




 
module.exports=app;