// src/components/PlayerView.js
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import LetterButton from './LetterButton';
import axios from 'axios'; 



function PlayerView() {
    const { gameId, playerName } = useParams();
    //const [ws, setWs] = useState(null);
    const location = useLocation();
    const token = location.state.token;
    const [currentWord, setCurrentWord] = useState("");
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    

    useEffect(() => {
        const websocket = new WebSocket(`ws://3.85.212.52:8000/ws/${gameId}/${playerName}`);
        
        websocket.onopen = () => {
            console.log("Connected to the WebSocket");
        };

        websocket.onerror = (error) => {
            console.log("Error en la conexión:", error);
          };

        websocket.onmessage = (event) => {
            const message = event.data;
            console.log("Message from server:", message);
            setCurrentWord(message);
        };

        websocket.onclose = () => {
            console.log("Disconnected from the WebSocket");
        };

        //setWs(websocket);
        //console.log(ws);
        // Limpiar al desmontar el componente.
        return () => {
            if (websocket) {
                websocket.close();
            }
        };
    }, [gameId, playerName]);


    const guessLetter = async (letter) => {
        try {
            const response = await axios.post(
                `${apiBaseUrl}/guess_letter/${gameId}`, 
                { letter }, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setCurrentWord(response.data.current_guess);
            console.log('respuesta -->',response.data);
        } catch (error) {
            console.error("Error al adivinar la letra:", error);
            alert('Error al adivinar la letra. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div>
            <h2>Player View for {playerName}</h2>
            <h3>{currentWord}</h3>
            {/* Botones de letras */}
            {
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                    <LetterButton key={letter} letter={letter} onClick={guessLetter} />
                ))
            }
        </div>
    );
}

export default PlayerView;
