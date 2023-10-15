import React, { createContext, useState, useEffect } from 'react';

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  
  const websocketURL = process.env.WEBSOCKET_URL;

  useEffect(() => {
    // Cambia la URL según tu configuración de back-end
    const ws = new WebSocket(`${websocketURL}/ws/game_id/player_name`);
    ws.onopen = () => console.log('Connected to the WebSocket');
    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [websocketURL]);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
