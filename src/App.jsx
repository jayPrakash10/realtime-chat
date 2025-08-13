import { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { Outlet, useParams } from "react-router";
import { db } from "../firebase";
import { getDoc, doc, updateDoc, writeBatch } from "firebase/firestore";

function App() {
  const { chatId, userId } = useParams();

  useEffect(() => {
    const updateMessagesToDelivered = async () => {
      if (!userId) return;

      const userChatsRef = doc(db, "userChats", userId);
      const userChatsSnap = await getDoc(userChatsRef);

      if (userChatsSnap.exists()) {
        const userChatsData = userChatsSnap.data();
        const batch = writeBatch(db);

        for (const chatKey in userChatsData) {
          const contactId = userChatsData[chatKey].userInfo.id;
          const chat_id = userId < contactId ? `${userId}-${contactId}` : `${contactId}-${userId}`;
          const chatRef = doc(db, "chats", chat_id);
          const chatSnap = await getDoc(chatRef);

          if (chatSnap.exists()) {
            const chatData = chatSnap.data();
            let needsUpdate = false;
            const updatedMessages = chatData.messages.map((msg) => {
              if (msg.senderId !== userId && msg.status === "sent") {
                needsUpdate = true;
                return { ...msg, status: "delivered" };
              }
              return msg;
            });

            if (needsUpdate) {
              batch.update(chatRef, { messages: updatedMessages });
            }
          }
        }
        await batch.commit();
      }
    };

    updateMessagesToDelivered();
  }, [userId]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className={`flex-col flex-1 ${chatId ? "flex" : "hidden md:flex"}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
