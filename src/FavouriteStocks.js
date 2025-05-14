import { useEffect, useState } from 'react';

const API_KEY = "d0i63u9r01ql18ms2a9gd0i63u9r01ql18ms2aa0";

const FavoriteStocks = () => {
  const [favorites, setFavorites] = useState([]);
  const [quotes, setQuotes] = useState([]);

  // Fetch favorites from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/favorites')
      .then(res => res.json())
      .then(setFavorites);
  }, []);

  // Fetch quotes for each favorite
  useEffect(() => {
    const fetchQuotes = async () => {
      const data = await Promise.all(favorites.map(async symbol => {
        const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
        const quote = await res.json();
        return { symbol, ...quote };
      }));
      setQuotes(data);
    };
    if (favorites.length) fetchQuotes();
  }, [favorites]);

  const removeFavorite = (symbol) => {
    fetch(`http://localhost:5000/api/favorites/${symbol}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(setFavorites);
  };

  return (
    <div>
      <h2>Favorite Stocks</h2>
      {quotes.map(stock => (
        <div key={stock.symbol}>
          <strong>{stock.symbol}</strong>: ${stock.c} 
          <button onClick={() => removeFavorite(stock.symbol)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default FavoriteStocks;
