import React, { useEffect, useState } from 'react';
import { getFriends } from '../../api/chat';

const ChatList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await getFriends(token);
        setFriends(data);
      } catch (error) {
        console.error('Failed to fetch friends', error);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div>
      <h2>Friends List</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend._id}>{friend.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
