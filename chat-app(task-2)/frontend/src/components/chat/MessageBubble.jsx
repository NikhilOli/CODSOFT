import React from 'react';
import {format} from 'timeago.js'

const MessageBubble = ({ message, isOwnMessage }) => {
    return (
        <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}>
            <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isOwnMessage
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                    }`}
            >
                <div>{message.text}</div>
                <div className="text-right mt-1">
                    <span className={`text-xs ${ isOwnMessage ? "text-gray-300" : "text-gray-500" }`}>{format(message.createdAt)}</span>
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;