import React, { useState } from 'react';


export default function Search() {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const searchStock = () => {
    // Fetch stock data based on the search query
    fetch(`/api/search-stock?query=${searchQuery}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setStocks([data]))  // Assume the backend returns a single stock object
      .catch(error => {
        console.error("Error fetching stock data:", error);
        setError('Error loading stock!');
      });
  };

  return (
    <div>
      <h1 className='search-heading'>Search Stocks</h1>

      <div className="search-container">
      <input 
        type="text"
        value={searchQuery} 
        onChange={e => setSearchQuery(e.target.value)} 
        placeholder="Enter stock symbol..."
        className="search-input"
      />
      <button onClick={searchStock} className="search-button">Search</button>
    </div>


      {error ? (
        <p>{error}</p>
      ) : stocks.length > 0 ? (
        <div className="card-container">
          {stocks.map(stock => (
            <div className="card" key={stock.symbol}>
              <div className="card-title">{stock.symbol} ({stock.name})</div>
              <div className="card-detail">Price: ${stock.price}</div>
              <div className="card-detail">52 Week High: ${stock.fiftyTwoWeekHigh}</div>
              <div className="card-detail">52 Week Low: ${stock.fiftyTwoWeekLow}</div>
              <div className="card-detail">Market Cap: ${stock.marketCap}</div>
              <div className="card-detail">Volume: {stock.volume}</div>
              <div className="card-detail">Dividend Rate: {stock.dividendRate}</div>
              <div className="card-detail">Dividend Yield: {stock.dividendYield}</div>
              <div className="card-detail">Trailing PE: {stock.trailingPE}</div>
              <div className="card-detail">Forward PE: {stock.forwardPE}</div>
            </div>))}
        </div>) 
    : (<p>Search for stocks using the search bar above.</p>)}</div>
  );
}