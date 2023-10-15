// src/components/PlayerView.js
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import LetterButton from './LetterButton';
import axios from 'axios'; 


function PlayerView() {
    const { gameId, playerName } = useParams();
    const [ws, setWs] = useState(null);
    const location = useLocation();
    const token = location.state.token;
    const [currentWord, setCurrentWord] = useState("");

    useEffect(() => {
        const websocket = new WebSocket(`ws://localhost:8000/ws/${gameId}/${playerName}`);
        
        websocket.onopen = () => {
            console.log("Connected to the WebSocket");
        };

        websocket.onmessage = (event) => {
            const message = event.data;
            console.log("Message from server:", message);
            setCurrentWord(message);
            console.log("currentWord--->", currentWord);
        };

        websocket.onclose = () => {
            console.log("Disconnected from the WebSocket");
        };

        setWs(websocket);
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
                `http://127.0.0.1:8000/guess_letter/${gameId}`, 
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
