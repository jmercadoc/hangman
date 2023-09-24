import React from 'react';

const Word = ({ word, guessedLetters }) => {
  return (
    <div>
      {word.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : '_'
      ).join(' ')}
    </div>
  );
}

export default Word;
