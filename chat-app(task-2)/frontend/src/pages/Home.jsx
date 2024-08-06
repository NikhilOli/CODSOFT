import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Welcome to ChatApp</h1>
        <p className="text-xl text-white mb-8">Connect with friends and chat in real-time!</p>
        <div className="space-x-4">
          <Link 
            to="/login" 
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;