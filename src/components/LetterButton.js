// src/components/LetterButton.js
import React from 'react';

function LetterButton({ letter, onClick }) {
    return (
        <button onClick={() => onClick(letter)}>
            {letter}
        </button>
    );
}

export default LetterButton;
