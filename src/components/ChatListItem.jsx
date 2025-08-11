import React from "react";
import { Link, useParams } from "react-router";

const ChatListItem = ({ id, avatar, name, date, lastMessage }) => {
  const { id: chatId } = useParams();
  const isActiveChat = String(id) === chatId;
  const activeClass = isActiveChat ? "bg-gray-100" : "";

  return (
    <Link to={`/${id}`} className="cursor-pointer py-2 outline-0">
      <div
        className={`flex items-center p-3 rounded-lg hover:bg-gray-100 ${activeClass}`}
      >
        <img
          src={avatar}
          alt={`${name}`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 truncate">{name}</h3>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
          <p className="text-sm text-gray-600 truncate">{lastMessage}</p>
        </div>
      </div>
    </Link>
  );
};

export default ChatListItem;
