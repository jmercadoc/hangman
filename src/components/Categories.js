import React from 'react';

const Categories = ({ categories, onSelect }) => {
  return (
    <div>
      <h2>Choose a category:</h2>
      {categories.map((category, index) => 
        <button key={index} onClick={() => onSelect(category)}>
          {category.name}
        </button>
      )}
    </div>
  );
}

export default Categories;
