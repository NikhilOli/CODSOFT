import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4">
            <div className="flex items-center">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    type="submit"
                    className="bg-indigo-500 text-white rounded-r-full py-2 px-6 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Send
                </button>
            </div>
        </form>
    );
};

export default MessageInput;