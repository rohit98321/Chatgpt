import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { asyncGetChats } from "../redux/actions/ChatActions";
import { addmessage } from "../redux/slice/MsgSlice";

export default function ChatWindow() {
  const [Input, setInput] = useState("");
  const [socket, setsocket] = useState(null);

  const chatallmgs = useSelector((state) => state.message.messages);
  const currentChat = useSelector((state) => state.chats.chat);
  console.log("currentchat", currentChat);
  const dispatch = useDispatch();

  const sendMessage = () => {
    if (!Input.trim()) return;
    


    dispatch(addmessage(Input))
    socket.emit("user-message", {
      chat: currentChat,
      content: Input,
    });
    

    setInput("");
    
  };

  useEffect(() => {
    const tempSocket = io("http://localhost:3000", {
      withCredentials: true,
    });

    
    tempSocket.on("ai-response", (message) => {
      dispatch(addmessage(message))
    });

    setsocket(tempSocket);
    dispatch(asyncGetChats());

    return () => {
      tempSocket.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="flex-1 flex flex-col bg-gray-900 text-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chatallmgs.map((msg, idx) =>
          msg.role === "user" ? (
            <div key={idx} className="flex justify-end">
              <h2 className="bg-blue-950 p-2 max-w-[60%] rounded-lg">
                {msg.content}
              </h2>
            </div>
          ) : (
            <div key={idx} className="flex justify-start">
              <h2 className="bg-green-950 p-2 max-w-[60%] rounded-lg">
                {msg.content}
              </h2>
            </div>
          )
        )}
      </div>
      <div className="flex p-4 bg-gray-800">
        <input
          value={Input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-l-md bg-gray-700 text-white outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
