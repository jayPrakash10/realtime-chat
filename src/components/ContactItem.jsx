import React from "react";
import { Link, useParams } from "react-router";

const ContactItem = ({ id, userInfo, date, recent_message }) => {
  const { userId, chatId } = useParams();
  const isActiveChat = String(id) === chatId;
  const activeClass = isActiveChat ? "bg-gray-100" : "";

  const formattedDate = new Date(date?.toDate()).toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <Link
      to={`/${userId}/${userInfo.id}`}
      className="cursor-pointer py-2 outline-0"
      onClick={() => {
        localStorage.setItem("chatUser", JSON.stringify(userInfo));
      }}
    >
      <div
        className={`flex items-center p-3 rounded-lg hover:bg-gray-100 ${activeClass}`}
      >
        <img
          src={userInfo.profilePic}
          alt={`${userInfo.name}`}
          className="w-10 h-10 rounded-full mr-2"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center gap-2">
            <p className="font-semibold text-gray-800 truncate">
              {userInfo.name}
            </p>
            {date && <p className="text-xs text-gray-500">{formattedDate}</p>}
          </div>
          <p className="text-xs text-gray-600 truncate">{recent_message}</p>
        </div>
      </div>
    </Link>
  );
};

export default ContactItem;
