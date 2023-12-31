import React, { createContext, useState, useEffect } from 'react';

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
   

  useEffect(() => {
    // Cambia la URL según tu configuración de back-end
    const ws = new WebSocket(`ws://3.85.212.52:8000/ws/game_id/player_name`);
    ws.onopen = () => console.log('Connected to the WebSocket');
    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
