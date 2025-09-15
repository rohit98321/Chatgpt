import { useState } from "react";

export default function ChatWindow({ selectedChat }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "You", text: input }]);
    setInput("");

    // fake AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "AI", text: "🤖 This is an AI response!" },
      ]);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-900 text-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-md ${
              msg.sender === "You"
                ? "bg-blue-600 self-end text-right"
                : "bg-gray-700 self-start"
            }`}
          >
            <span className="font-semibold">{msg.sender}: </span>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex p-4 bg-gray-800">
        <input
          value={input}
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
