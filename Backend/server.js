require("dotenv").config()
const app=require('./src/app')
const connectDb=require("./src/database/db")
connectDb()








app.listen(3000,()=>{
    console.log("server is running on port 3000");
})