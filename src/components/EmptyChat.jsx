import React from "react";

const EmptyChat = () => {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 p-8 overflow-y-auto grid place-content-center">
        Select a conversation to continue
      </div>
    </div>
  );
};

export default EmptyChat;
