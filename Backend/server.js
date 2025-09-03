require("dotenv").config()
const app=require('./src/app')
const connectDb=require("./src/database/db")

//socket.io connection
const initSocketServer=require("./src/sockets/socket.server")
const httpServer=require("http").createServer(app);

connectDb()
initSocketServer(httpServer)








httpServer.listen(3000,()=>{
    console.log("server is running on port 3000");
})