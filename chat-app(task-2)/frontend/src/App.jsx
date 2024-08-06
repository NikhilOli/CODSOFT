import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Layout from './components/layout/Layout';
import ChatWindow from './components/chat/ChatWindow';
import ProfileCard from './components/profile/ProfileCard';
import Home from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Layout />}>
            <Route index element={<ChatWindow />} />
            <Route path="profile" element={<ProfileCard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;