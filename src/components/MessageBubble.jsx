import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useOnScreen } from "../hooks/useOnScreen";
import SingleTickIcon from "./icons/SingleTickIcon";
import DoubleTickGrayIcon from "./icons/DoubleTickGrayIcon";
import DoubleTickBlueIcon from "./icons/DoubleTickBlueIcon";

const MessageBubble = ({
  id,
  message,
  date,
  status,
  senderId,
  onMarkAsRead,
  onMarkAsDelivered,
}) => {
  const { userId } = useParams();
  const [ref, isIntersecting] = useOnScreen({ threshold: 0.5 });

  useEffect(() => {
    if (
      isIntersecting &&
      (status === "sent" || status === "delivered") &&
      userId !== senderId
    ) {
      onMarkAsRead(id);
    } else if (status === "sent" && userId !== senderId) {
      onMarkAsDelivered(id);
    }
  }, [
    isIntersecting,
    status,
    senderId,
    userId,
    id,
    onMarkAsRead,
    onMarkAsDelivered,
  ]);

  const bubbleClasses =
    userId === senderId ? "bg-green-100 self-end" : "bg-white self-start";

  const formattedDate = new Date(date.toDate()).toLocaleString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

  const StatusIcon = () => {
    if (status === "read") {
      return <DoubleTickBlueIcon className="h-4 w-4" />;
    }
    if (status === "delivered") {
      return <DoubleTickGrayIcon className="h-4 w-4" />;
    }
    if (status === "sent") {
      return <SingleTickIcon className="h-4 w-4" />;
    }
    return null;
  };

  return (
    <div
      ref={ref}
      className={`flex items-center ${
        userId === senderId ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative rounded-lg px-3 py-2 max-w-lg mx-2 my-1 shadow ${bubbleClasses}`}
      >
        <p className="text-sm text-gray-800">{message}</p>
        <div className="flex items-center justify-end mt-1">
          <p className="text-xs text-gray-500 mr-2">{formattedDate}</p>
          {userId === senderId && <StatusIcon />}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
