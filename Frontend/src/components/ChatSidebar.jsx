import Nav from "../nav/Nav";
import ChatBtn from "../components/ChatBtn"

export default function ChatSidebar({chats,setsingleChat}) {
  console.log(chats);



    const render=chats.map((chat)=>(
      <ChatBtn key={chat._id} chat={chat} />
    ))



    return (
      <div className="w-1/4 bg-gray-800 p-4 text-white h-screen">
        <h2 className="text-xl font-bold mb-4">Chats</h2>

        <div className="grid grid-cols-1">

        
        {render}
        </div>
        {/* <Nav/> */}
      </div>
    );
  }
  