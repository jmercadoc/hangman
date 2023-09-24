import React from 'react';

const Letters = ({ onClick, guessedLetters }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div>
      {alphabet.map(letter => 
        guessedLetters.includes(letter) ? 
          <span key={letter} style={{ opacity: 0.5 }}>{letter}</span> :
          <button key={letter} onClick={() => onClick(letter)}>{letter}</button>
      )}
    </div>
  );
}

export default Letters;
