import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const ChatList = ({ onSelectChat, selectedChat }) => {
  const [chats, setChats] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user._id) {
      fetchChats();
    }
  }, [user]);

  const fetchChats = async () => {
    try {
      const response = await api.get(`/chat/${user._id}`);
      const userChats = response.data;

      const chatsWithOtherUserData = await Promise.all(
        userChats.map(async (chat) => {
          const otherUserId = chat.members.find(memberId => memberId !== user._id);
          const otherUserResponse = await api.get(`/users/profile/${otherUserId}`);
          const otherUserData = otherUserResponse.data;
          
          return {
            ...chat,
            otherUser: otherUserData
          };
        })
      );

      console.log('Chats with other user data:', chatsWithOtherUserData);
      setChats(chatsWithOtherUserData);
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
            <div className="font-medium">{chat.otherUser?.username}</div>
            <div className="text-sm text-gray-500">{chat.otherUser?.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
