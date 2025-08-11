import React from 'react';

const MessageBubble = ({ message, time, status, isSent }) => {
  const bubbleClasses = isSent
    ? 'bg-green-100 self-end'
    : 'bg-white self-start';

  return (
    <div className={`flex items-center ${isSent ? 'justify-end' : 'justify-start'}`}>
        <div className={`relative rounded-lg p-3 max-w-lg mx-2 my-1 shadow ${bubbleClasses}`}>
            <p className="text-sm text-gray-800">{message}</p>
            <div className="flex items-center justify-end mt-1">
                <p className="text-xs text-gray-500 mr-2">{time}</p>
                {isSent && <p className="text-xs text-gray-500">{status}</p>}
            </div>
        </div>
    </div>
  );
};

export default MessageBubble;
