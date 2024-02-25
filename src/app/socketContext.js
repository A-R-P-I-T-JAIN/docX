// socketContext.js
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log("Attempting to connect to socket...");
    const newSocket = io('http://localhost:3001'); // Replace with your socket server URL

    newSocket.on('connect', () => {
      console.log("Socket connected successfully!");
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  console.log("Socket state:", socket);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
