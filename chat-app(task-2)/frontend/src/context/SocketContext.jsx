import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_SERVER_URL, {
        withCredentials: true,
        });

        newSocket.on('connect', () => {
        console.log('Connected to socket server');
        });

        newSocket.on('disconnect', () => {
        console.log('Disconnected from socket server');
        });

        setSocket(newSocket);

        return () => {
        newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
        {children}
        </SocketContext.Provider>
    );
};