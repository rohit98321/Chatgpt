const {Server}=require("socket.io")
const cookie=require("cookie")
const jwt=require("jsonwebtoken")
const userModel=require("../models/user.model")
const generateAiResponse=require("../service/ai.service")
const messageModel=require("../models/message.model")

const initSocketServer=(httpServer)=>{

    const io=new Server(httpServer,{})


    //socket.io middleware where we get token from haeaders and set user in socket.user
    io.use( async (socket,next)=>{

        const cookies=cookie.parse(socket.handshake.headers?.cookie || "")
        console.log(cookies);
        if(!cookies.token){
            next(new Error("Authentication error: No token provided"))
        }

        try {

            const decoded=jwt.verify(cookies.token,process.env.JWT_SECRET);
            const user= await userModel.findById(decoded.id)
            socket.user=user
            next()

            
        } catch (error) {

            next(new Error("Authentication error: invalid token"))
            
        }
       
    })

    io.on("connection",(socket) => {
      

        socket.on("user-message",async (messagePayload)=>{


            await messageModel.create({
                chat:messagePayload.chat,
                user:socket.user._id,
                content:messagePayload.content,
                role:"user"
            })

            const chatHistory= (await messageModel.find({
                chat:messagePayload.chat
            }).sort({createdAt:-1}).limit(20).lean()).reverse()
            
            

            const aiResponse=  await generateAiResponse(chatHistory.map(item =>{
                return {
                    role:item.role,
                    parts:[{text:item.content}]
                }
            }));

            await messageModel.create({
                chat:messagePayload.chat,
                user:socket.user._id,
                content:aiResponse,
                role:"model"
            })

            console.log(aiResponse);
            socket.emit("ai-response",{
                content:aiResponse,
                chat:messagePayload.chat
            })


        })

    })
}

module.exports=initSocketServer