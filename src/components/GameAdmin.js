import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

function GameAdmin() {
    const [words, setWords] = useState('');
    const { gameId } = useParams();
    const location = useLocation();
    const token = location.state.token;
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const addWords = async () => {
        const wordsArray = words.split(',').map(word => word.trim());
        try {
            const response = await axios.post(`${apiBaseUrl}/add_words/${gameId}`, { words: wordsArray }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('Palabras agregadas exitosamente!');
            setWords('');
        } catch (error) {
            console.error("Error al agregar palabras:", error);
            alert('Error al agregar palabras. Por favor, inténtalo de nuevo.');
        }
    };

    const startGame = async () => {
        try {
            const response = await axios.post(`${apiBaseUrl}/start_game/${gameId}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('¡Juego iniciado!');
        } catch (error) {
            console.error("Error al iniciar el juego:", error);
            alert('Error al iniciar el juego. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div>
            <h2>Administrar juego: {gameId}</h2>
            <div>
                <textarea 
                    value={words} 
                    onChange={(e) => setWords(e.target.value)} 
                    placeholder="Añade palabras separadas por comas. Ejemplo: azul,rojo,verde" 
                />
                <button onClick={addWords}>Agregar palabras</button>
            </div>
            <div>
                <button onClick={startGame}>Iniciar juego</button>
            </div>
        </div>
    );
}

export default GameAdmin;
