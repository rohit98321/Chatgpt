const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { generateAiResponse, generateVector } = require("../service/ai.service");
const messageModel = require("../models/message.model");
const { createMemory, queryMemory } = require("../service/vector.service");

const initSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors:{
      origin:"http://localhost:5173",
      allowedHeaders:["Content-Type","Authorization"],
      credentials:true
    }
  });

  //socket.io middleware where we get token from haeaders and set user in socket.user
  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
    console.log(cookies);
    if (!cookies.token) {
      next(new Error("Authentication error: No token provided"));
    }

    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);
      socket.user = user;
      console.log("socket.user", socket.user);
      next();
    } catch (error) {
      next(new Error("Authentication error: invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("user connected");
    socket.on("user-message", async (messagePayload) => {
      console.log("messagepayload content", messagePayload);

    //   const usermessage = await messageModel.create({
    //     chat: messagePayload.chat,
    //     user: socket.user._id,
    //     content: messagePayload.content,
    //     role: "user",
    //   });

    //   console.log("usermessage", usermessage);

    //   //convert into vectors
    //   const vectors = await generateVector(messagePayload.content);
    //   console.log(vectors);

        //start at the same time
        const [usermessage,vectors]= await Promise.all([

                 messageModel.create({
                chat: messagePayload.chat,
                user: socket.user._id,
                content: messagePayload.content,
                role: "user",
              }),

               generateVector(messagePayload.content)

        ])

        console.log("usermessage", usermessage);
        console.log(vectors);



      //create memory in pincone
      await createMemory({
        vectors,
        messageId: usermessage._id,
        metadata: {
          chat: messagePayload.chat,
          user: socket.user._id,
          text: messagePayload.content,
        },
      });

      //query memory
    //   const memory = await queryMemory({
    //     queryVector: vectors,
    //     limit: 4,
    //     metadata: {},
    //   });

    //   console.log(memory);

    //   const chatHistory = (
    //     await messageModel
    //       .find({
    //         chat: messagePayload.chat,
    //       })
    //       .sort({ createdAt: -1 })
    //       .limit(5)
    //       .lean()
    //   ).reverse();


    //start at the same time
    const [memory,chatHistory]=await Promise.all([

        queryMemory({
                queryVector: vectors,
                limit: 4,
                 metadata: {},
                }),

                messageModel
                .find({
                  chat: messagePayload.chat,
                })
                .sort({ createdAt: -1 })
                .limit(5)
                .lean()
            
    ])


         chatHistory.reverse();



      const stm = chatHistory.map((item) => ({
        role: item.role === "model" ? "model" : "user", // Gemini needs "user"/"model"
        parts: [{ text: item.content }],
      }));

      const ltm = [
        {
          role: "user",
          parts: [
            {
              text: `
      These are some previous messages from the chat. Use them to generate a response:
      
      ${memory.map((item) => item.metadata.text).join("\n")}
              `,
            },
          ],
        },
      ];


        console.log("stm and ltm => ",stm,ltm[0]);
      const aiResponse = await generateAiResponse([...ltm,...stm]);
      console.log("aiResponse", aiResponse);

    //   const aimessage = await messageModel.create({
    //     chat: messagePayload.chat,
    //     user: socket.user._id,
    //     content: aiResponse,
    //     role: "model",
    //   });

    //   const aiVectors = await generateVector(aimessage.content);



      //start at the same time
    const [aimessage,aiVectors]=await Promise.all([
        messageModel.create({
                chat: messagePayload.chat,
                user: socket.user._id,
                content: aiResponse,
                role: "model",
              }),

              generateVector(aiResponse)

    ])



      await createMemory({
        vectors: aiVectors,
        messageId: aimessage._id,
        metadata: {
          chat: messagePayload.chat,
          user: socket.user._id,
          text: aimessage.content,
        },
      });

      socket.emit("ai-response", {
        content: aiResponse,
        chat: messagePayload.chat,
      });
    });
  });
};

module.exports = initSocketServer;
