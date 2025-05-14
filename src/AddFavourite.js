import { useState } from 'react';

const AddFavorite = ({ onAdd }) => {
  const [symbol, setSymbol] = useState('');

  const addSymbol = () => {
    fetch('http://localhost:5000/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol: symbol.toUpperCase() })
    })
    .then(res => res.json())
    .then(favs => {
      setSymbol('');
      onAdd(favs);
    });
  };

  return (
    <div>
      <input
        value={symbol}
        onChange={e => setSymbol(e.target.value)}
        placeholder="Enter stock symbol (e.g. AAPL)"
      />
      <button onClick={addSymbol}>Add to Favorites</button>
    </div>
  );
};

export default AddFavorite;
