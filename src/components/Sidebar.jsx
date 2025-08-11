import React from "react";
import ChatListItem from "./ChatListItem";
import { useParams } from "react-router";

const chats = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    date: "Yesterday",
    lastMessage: "Hey, how are you?",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    date: "10:30 AM",
    lastMessage: "See you tomorrow!",
  },
  {
    id: 3,
    name: "Bob Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    date: "9:15 AM",
    lastMessage: "Thanks for the help!",
  },
];

function Sidebar() {
  const { id } = useParams();

  return (
    <div className={`flex flex-col flex-1 lg:flex-[0.25] lg:min-w-80 lg:max-w-96 z-10 border-r border-gray-300 ${id ? "hidden lg:flex" : ""}`}>
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-semibold">Chats</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-2 mr-0.5 [&::-webkit-scrollbar]:w-[0.25rem] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#e4e7ec]">
        {chats.map((chat) => (
          <ChatListItem key={chat.id} {...chat} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
