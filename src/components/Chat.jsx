import React, { useState } from "react";
import MessageBubble from "./MessageBubble";
import { useNavigate, useParams } from "react-router";
import EmptyChat from "./EmptyChat";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";

// Mock data - in a real app, this would come from an API
const chats = {
  1: {
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    phone: "+1 234 567 890",
    messages: [
      {
        id: 1,
        message: "Hey, how are you?",
        time: "10:30 AM",
        status: "read",
        isSent: false,
      },
      {
        id: 2,
        message: "I am good, thanks! How about you?",
        time: "10:31 AM",
        status: "read",
        isSent: true,
      },
      {
        id: 3,
        message: "Doing great! Just working on the new project.",
        time: "10:32 AM",
        status: "delivered",
        isSent: false,
      },
    ],
  },
  2: {
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    phone: "+1 987 654 321",
    messages: [],
  },
  3: {
    name: "Bob Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    phone: "+1 555 555 555",
    messages: [],
  },
};

function Chat() {
  const { id } = useParams();
  const chat = chats[id];

  const navigate = useNavigate();

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      message: input,
      time: new Date().toLocaleTimeString(),
      status: "sent",
      isSent: true,
    };

    chats[id].messages.unshift(newMessage);
    setInput("");
  };

  if (!chat) {
    return <EmptyChat />; // Or some placeholder/error component
  }

  return (
    <div className="flex flex-col flex-1 h-screen">
      {/* Chat Header */}
      <div className="flex items-center">
        <div className="lg:hidden">
          <button className="p-3" onClick={() => navigate("/")}>
            <ArrowLeftIcon className="h-4" />
          </button>
        </div>
        <div className="flex items-center p-3">
          <img
            src={chat.avatar}
            alt={`${chat.name}'s avatar`}
            className="w-10 h-10 rounded-full mr-4"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{chat.name}</h3>
            <p className="text-xs text-gray-500">{chat.phone}</p>
          </div>
        </div>
      </div>

      {/* Messages Screen */}
      <div
        className="flex-1 p-4 mr-0.5 overflow-y-auto flex flex-col-reverse [&::-webkit-scrollbar]:w-[0.25rem] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/50"
        style={{
          backgroundImage:
            "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      >
        {[...chat.messages].map((msg) => (
          <MessageBubble key={msg.id} {...msg} />
        ))}
      </div>

      {/* Message Input Footer */}
      <div className="flex items-center p-3 border-t border-gray-300">
        <form onSubmit={handleSend} className="flex-1 flex items-center">
          <textarea
            className="flex-1 p-2 mx-2 border-none rounded-full focus:outline-none px-4"
            placeholder="Type a message"
            type="text"
            value={input}
            rows={1}
            maxRows={5}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
                e.preventDefault();
              }
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default Chat;
