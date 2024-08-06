import React from 'react';

const MessageBubble = ({ message, isOwnMessage }) => {
    return (
        <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isOwnMessage
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
            >
                {message.content}
            </div>
        </div>
    );
};

export default MessageBubble;