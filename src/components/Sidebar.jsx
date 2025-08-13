import { useState } from "react";
import { useEffect } from "react";
import ContactItem from "./ContactItem";
import { useParams } from "react-router";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

function Sidebar() {
  const { chatId } = useParams();
  const [chats, setChats] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedUser"));

  useEffect(() => {
    setIsFetching(true);
    const getChatList = () => {
      const contacts = onSnapshot(
        doc(db, "userChats", loggedInUser.uid),
        (doc) => {
          console.log(doc.data());
          setChats(
            Object.values(doc.data() || [])?.sort((a, b) => b?.date - a?.date)
          );
          setIsFetching(false);
        }
      );

      return () => {
        contacts();
      };
    };

    loggedInUser.uid && getChatList();
  }, [loggedInUser.uid]);

  return (
    <div
      className={`flex flex-col flex-1 md:flex-[0.25] md:min-w-80 md:max-w-96 z-10 border-r border-gray-300 ${
        chatId ? "hidden md:flex" : ""
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <div className="flex items-center rounded-lg">
          <img
            src={loggedInUser.photoURL}
            alt={`${loggedInUser.displayName}`}
            className="w-6 h-6 rounded-full mr-2"
          />
          <div className="flex-1">
            <p className="font-semibold text-sm text-gray-800 truncate">
              {loggedInUser.displayName}
            </p>
          </div>
        </div>
        <a
          href="/"
          onClick={() => localStorage.removeItem("loggedUser")}
          className="text-xs bg-[#25d366] text-white px-2 py-1 rounded flex items-center shadow outline-none"
        >
          Logout
        </a>
      </div>
      {isFetching && (
        <div className="overflow-y-auto p-2 mr-0.5">
          <div className="flex items-center justify-center">
            <p className="text-gray-500 border-2 border-r-0 border-green-500 rounded-full aspect-square h-6 animate-spin"></p>
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-2 mr-0.5 [&::-webkit-scrollbar]:w-[0.25rem] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#e4e7ec]">
        {chats.map((chat) => (
          <ContactItem key={chat.userInfo.id} {...chat} />
        ))}
        {chats.length === 0 && (
          <div className="flex items-center justify-center">
            <p className="text-gray-500">No chats</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
