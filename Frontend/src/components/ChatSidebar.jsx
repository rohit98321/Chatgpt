export default function ChatSidebar({ chats, onSelect }) {
    return (
      <div className="w-1/4 bg-gray-800 p-4 text-white h-screen">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <ul className="space-y-2">
          {chats.map((chat, idx) => (
            <li
              key={idx}
              className="p-2 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600"
              onClick={() => onSelect(chat)}
            >
              {chat.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  