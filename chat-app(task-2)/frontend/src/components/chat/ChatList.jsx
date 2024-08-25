import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const ChatList = ({ onSelectChat, selectedChat }) => {
  const [chats, setChats] = useState([]);
  const { user }= useContext(AuthContext)

  useEffect(() => {
    fetchChats();
    console.log(user);
    
  }, []);

  const fetchChats = async () => {
    try {
      const response = await api.get('/users', { params: { userId: user._id } });
      const userChats = response.data
      setChats(userChats);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  return (
    <div className="w-64 bg-gray-100 overflow-y-auto">
      <h2 className="text-xl font-semibold p-4 bg-gray-200">Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat._id}
            className={`p-4 cursor-pointer hover:bg-gray-200 ${
              selectedChat && selectedChat._id === chat._id ? 'bg-gray-300' : ''
            }`}
            onClick={() => onSelectChat(chat)}
          >
            <div className="font-medium">{chat.username}</div>
            <div className="text-sm text-gray-500">{chat.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;