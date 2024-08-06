import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

const GroupChatWindow = () => {
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    // Fetch groups from the server here
    // Example: setGroups(data);
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      socket.emit('join', { room: selectedGroup._id });
    }

    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('message');
    };
  }, [selectedGroup]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send message to the server
      setMessage('');
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  return (
    <div>
      <h2>Group Chat Window</h2>
      <select onChange={(e) => setSelectedGroup(e.target.value)}>
        {groups.map((group) => (
          <option key={group._id} value={group._id}>{group.name}</option>
        ))}
      </select>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.content}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
        </form>
</div>
);
};
export default GroupChatWindow;

