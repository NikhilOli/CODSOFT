import React, { useState } from 'react';
import InputEmoji from 'react-input-emoji';

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} className="bg-gray-100 p-4">
            <div className="flex items-center">
                <InputEmoji
                    value={message}
                    onChange={setMessage}
                    keepOpened
                    onEnter={handleSendMessage}
                    placeholder="Type a message..."
                    borderRadius={20}
                    borderColor="#CBD5E0" 
                />
                <button
                    type="button"
                    onClick={handleSendMessage}
                    className="bg-indigo-500 text-white rounded-full py-2 px-6 ml-2 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Send
                </button>
            </div>
        </form>
    );
};

export default MessageInput;
