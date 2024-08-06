import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ChatList from './ChatList';
import MessageInput from './MessageInput';
import MessageBubble from './MessageBubble';
import api from '../../services/api';
import { initializeSocket } from '../../services/socket';

const ChatWindow = () => {
  const { user } = useContext(AuthContext);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = initializeSocket();
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
    }
  }, [selectedChat]);

  const fetchMessages = async () => {
    try {
      const response = await api.get(`/messages/${selectedChat._id}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (content) => {
    try {
      const response = await api.post('/messages', {
        recipient: selectedChat._id,
        content,
      });
      setMessages([...messages, response.data]);
      socket.emit('sendMessage', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="h-full flex">
      <ChatList onSelectChat={setSelectedChat} selectedChat={selectedChat} />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message._id}
              message={message}
              isOwnMessage={message.sender === user._id}
            />
          ))}
        </div>
        <MessageInput onSendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;