import { useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import { useNavigate, useParams } from "react-router";
import EmptyChat from "./EmptyChat";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

function Chat() {
  const { userId, chatId } = useParams();

  const navigate = useNavigate();

  const [conversation, setConversation] = useState([]);
  const [chatUser, setChatUser] = useState({});
  const [input, setInput] = useState("");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedUser"));

  const chat_id =
    userId < chatId ? `${userId}-${chatId}` : `${chatId}-${userId}`;

  const handleSend = (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    updateDoc(doc(db, "chats", chat_id), {
      messages: arrayUnion({
        id: crypto.randomUUID(),
        message: input,
        senderId: loggedInUser.uid,
        date: Timestamp.now(),
        status: "sent",
      }),
    });

    updateDoc(doc(db, "userChats", loggedInUser.uid), {
      [chatUser.id + ".date"]: serverTimestamp(),
      [chatUser.id + ".recent_message"]: input,
    });

    updateDoc(doc(db, "userChats", chatUser.id), {
      [loggedInUser.uid + ".userInfo"]: {
        id: loggedInUser.uid,
        name: loggedInUser.displayName,
        profilePic: loggedInUser.photoURL,
      },
      [loggedInUser.uid + ".date"]: serverTimestamp(),
      [loggedInUser.uid + ".recent_message"]: input,
    });

    setInput("");
  };

  const handleMarkAsRead = async (messageId) => {
    const updatedConversation = conversation.map((msg) => {
      if (msg.id === messageId) {
        return { ...msg, status: "read" };
      }
      return msg;
    });

    await updateDoc(doc(db, "chats", chat_id), {
      messages: updatedConversation,
    });
  };

  const handleMarkAsDelivered = async (messageId) => {
    const updatedConversation = conversation.map((msg) => {
      if (msg.id === messageId) {
        return { ...msg, status: "delivered" };
      }
      return msg;
    });

    await updateDoc(doc(db, "chats", chat_id), {
      messages: updatedConversation,
    });
  };

  if (!chatId) {
    return <EmptyChat />; // Or some placeholder/error component
  }

  useEffect(() => {
    if (chatId) {
      const chatUser = JSON.parse(localStorage.getItem("chatUser"));
      setChatUser(chatUser);
      const chats = onSnapshot(doc(db, "chats", chat_id), (doc) => {
        if (doc.exists()) {
          setConversation(doc.data().messages);
        }
      });

      return () => {
        chats();
      };
    }
  }, [chatId, chat_id]);

  return (
    <div className="flex flex-col flex-1 h-screen">
      {/* Chat Header */}
      <div className="flex items-center px-2 py-2 gap-2">
        <div className="md:hidden">
          <button className="p-2" onClick={() => navigate(`/${userId}`)}>
            <ArrowLeftIcon className="h-4" />
          </button>
        </div>
        <div className="flex-1 flex items-center gap-3 px-2">
          <img
            src={chatUser.profilePic}
            alt={`${chatUser.name}'s avatar`}
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{chatUser.name}</h3>
            <p className="text-xs text-gray-500">{chatUser.phone}</p>
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
        {[...conversation].reverse().map((msg) => (
          <MessageBubble
            key={msg.id}
            {...msg}
            onMarkAsRead={handleMarkAsRead}
            onMarkAsDelivered={handleMarkAsDelivered}
          />
        ))}
      </div>

      {/* Message Input Footer */}
      <div className="flex items-center p-2 border-t border-gray-300">
        <form onSubmit={handleSend} className="flex-1 flex items-center">
          <textarea
            className="flex-1 p-2 border-none text-sm leading-4 rounded-lg focus:outline-none field-sizing-content max-h-20 resize-none [&::-webkit-scrollbar]:w-[0.25rem] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/50"
            placeholder="Type a message"
            type="text"
            value={input}
            autoComplete="false"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default Chat;
