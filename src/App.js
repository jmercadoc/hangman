import React from 'react';
import './App.css';
import Hangman from './components/Hangman';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hangman Game</h1>
        <Hangman />
      </header>
    </div>
  );
}

export default App;
