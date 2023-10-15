import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import GameAdmin from './components/GameAdmin';
import PlayerView from './components/PlayerView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/:gameId" element={<GameAdmin />} />
        <Route path="/playerView/:gameId/:playerName" element={<PlayerView />} />
      </Routes>
    </Router>
  );
}

export default App;
