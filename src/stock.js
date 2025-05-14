import "./StockMarketPage.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function StockMarketPage() {
  const [query, setQuery] = useState("Apple");
  const [symbol, setSymbol] = useState("AAPL");
  const [companyName, setCompanyName] = useState("Apple Inc.");
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    fetchStockData(symbol);
  }, [symbol]);

  const handleSearch = async () => {
    const apiKey = "d0i63u9r01ql18ms2a9gd0i63u9r01ql18ms2aa0";
    try {
      const searchRes = await axios.get(
        `https://finnhub.io/api/v1/search?q=${query}&token=${apiKey}`
      );

      if (searchRes.data.result.length > 0) {
        const match = searchRes.data.result[0];
        setSymbol(match.symbol);
        setCompanyName(match.description);
      } else {
        alert("No matching stock found!");
      }
    } catch (error) {
      console.error("Error fetching stock symbol:", error);
    }
  };

  const fetchStockData = async (symbol) => {
    const apiKey = "d0i63u9r01ql18ms2a9gd0i63u9r01ql18ms2aa0";
    try {
      const res = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
      );
      setStockData(res.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  return (
    <div className="container">
      <div className="input-container">
        <h1 className="title">📈 Stock Market Tracker</h1>
        <div className="input-group">
          <input
            className="input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter stock name or symbol (e.g. Apple, TSLA)"
          />
          <button className="button" onClick={handleSearch}>Search</button>
        </div>
      </div>

      {stockData && (
        <div className="card">
          <h2>{companyName} ({symbol}) - ${stockData.c}</h2>
          <div className="grid">
            <p><strong>Open:</strong> ${stockData.o}</p>
            <p><strong>High:</strong> ${stockData.h}</p>
            <p><strong>Low:</strong> ${stockData.l}</p>
            <p><strong>Previous Close:</strong> ${stockData.pc}</p>
            <p className={stockData.d >= 0 ? "change-positive" : "change-negative"}>
              {stockData.d >= 0 ? '▲' : '▼'} {stockData.d.toFixed(2)} ({stockData.dp.toFixed(2)}%)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
