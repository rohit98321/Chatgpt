import { useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";

export default function Chat() {
  const [chats] = useState([
    { title: "Chat with AI 1" },
    { title: "Chat with AI 2" },
  ]);
  const [selectedChat, setSelectedChat] = useState(chats[0]);

  return (
    <div className="flex h-screen">
      <ChatSidebar chats={chats} onSelect={setSelectedChat} />
      <ChatWindow selectedChat={selectedChat} />
    </div>
  );
}
