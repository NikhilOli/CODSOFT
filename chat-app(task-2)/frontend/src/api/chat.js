import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const getFriends = (token) => axios.get(`${API_URL}/friends`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const getChats = (token) => axios.get(`${API_URL}/chats`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const sendMessage = (messageData, token) => axios.post(`${API_URL}/sendMessage`, messageData, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
