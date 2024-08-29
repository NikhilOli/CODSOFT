import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import ChatList from './ChatList';
import MessageInput from './MessageInput';
import MessageBubble from './MessageBubble';
import api from '../../services/api';

const ChatWindow = () => {
  const { user } = useContext(AuthContext);
  const socket = useSocket();
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.on('userStatusUpdate', (data) => {
        setOnlineUsers((prevOnlineUsers) => {
          const { userId, online } = data;

          if (online) {
            return [...prevOnlineUsers, userId];
          } else {
            return prevOnlineUsers.filter((id) => id !== userId);
          }
        });
      });

      return () => {
        socket.off('userStatusUpdate');
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket && user) {
      socket.emit('addUser', user._id);

      socket.on('receiveMessage', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [socket, user]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (selectedChat && socket) {
      socket.emit('join', { room: selectedChat._id });
      fetchMessages();
    }
  }, [selectedChat, socket]);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const messagesResponse = await api.get(`/message/${selectedChat._id}`);
      setMessages(messagesResponse.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (content) => {
    if (!selectedChat || !socket) return;
    try {
      const response = await api.post('/message', {
        chatId: selectedChat._id,
        senderId: user._id,
        text: content,
      });

      socket.emit('sendMessage', {
        ...response.data,
        receiverId: selectedChat.otherUser._id,
        room: selectedChat._id,
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="h-full flex">
      <ChatList onSelectChat={setSelectedChat} selectedChat={selectedChat} onlineUsers={onlineUsers} />
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <MessageBubble
                  key={message._id}
                  message={message}
                  isOwnMessage={message.senderId === user._id}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <MessageInput onSendMessage={sendMessage} />
          </>
        ) : (
          <div className="flex-1 flex justify-center items-center text-gray-500">
            Tap on a chat to start a conversation
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;