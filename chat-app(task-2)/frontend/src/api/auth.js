import axios from 'axios';

// const API_URL = 'http://localhost:4000';

export const register = (userData) => axios.post(`${import.meta.env.VITE_API_URL}/register`, userData);
export const login = (userData) => axios.post(`${import.meta.env.VITE_API_URL}/login`, userData);
