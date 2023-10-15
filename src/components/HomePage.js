import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

function HomePage() {
    const [gameId, setGameId] = useState(null);
    const [token, setToken] = useState(null);
    const [adminName, setAdminName] = useState('');
    const navigate  = useNavigate ();
    const [playerName, setPlayerName] = useState('');

    const createGame = async () => {
        
        if (!adminName) {
            alert("Por favor, ingrese un nombre de administrador.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/create_game/', { admin: adminName });
            const { gameId, token, message } = response.data;

            setGameId(gameId);
            setToken(token);
            console.log(message);
            navigate(`/admin/${gameId}`, { state: { token } });

        } catch (error) {
            console.error("Error al crear el juego:", error);
        }
    };

    const joinGame = async () => {
        try {
            // Aquí, asumiendo que tienes un endpoint /join_game/{gameId} en tu backend:
            const response = await axios.post(`http://localhost:8000/join_game/${gameId}`, { player_name: playerName });
            

            if (response.status === 200) {
                // Navega a una vista de jugador o lo que desees hacer luego de unirse
                const { token, message } = response.data;
                setToken(token);
                setPlayerName(playerName);

                navigate(`/playerView/${gameId}/${playerName}`, { state: { token } });
            }
        } catch (error) {
            console.error("Error al unirse al juego:", error);
            alert('Error al unirse al juego. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div>
            <h1>HomePage</h1>
            
            <label>
                Nombre del Administrador:
                <input 
                    type="text" 
                    value={adminName} 
                    onChange={e => setAdminName(e.target.value)} 
                />
            </label>

            <button onClick={createGame}>Crear juego</button>
            
            {gameId && token && (
                <div>
                    <p>Game ID: {gameId}</p>
                    <p>Token: {token}</p>
                </div>
            )}

            <h2>Unirse a un juego</h2>
            <div>
                <input 
                    value={gameId} 
                    onChange={(e) => setGameId(e.target.value)} 
                    placeholder="Código del juego" 
                />
            </div>
            <div>
                <input 
                    value={playerName} 
                    onChange={(e) => setPlayerName(e.target.value)} 
                    placeholder="Tu nombre" 
                />
            </div>
            <div>
                <button onClick={joinGame}>Unirse al juego</button>
            </div>
        </div>
    );
}

export default HomePage;
