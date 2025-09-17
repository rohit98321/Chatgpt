import { useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import { useSelector } from "react-redux";


export default function Chat() {
  
 
  const chats=useSelector((state) => state.chats.chats)

  
 

  return (
    <div className="flex h-screen">
      <ChatSidebar  chats={chats}/>
      <ChatWindow />
   
    </div>
  );
}
