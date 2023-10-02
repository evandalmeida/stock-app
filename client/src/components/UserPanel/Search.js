import React, { useState } from 'react';
import { useWatchlist } from './WatchListContext';  // Import the context

export default function Search() {
    const [stocks, setStocks] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [message, setMessage] = useState('');
    const { setWatchlistStocks } = useWatchlist();  // Use the context

    const searchStock = () => {
        // Fetch stock data based on the search query
        setMessage('');
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

    const addToWatchlist = (stock) => {
      fetch('/api/add-to-watchlist', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stock: stock }),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`Server responded with status: ${response.status}`);
          }
          return response.text()
              .then(text => {
                  try {
                      return JSON.parse(text);
                  } catch (e) {
                      throw new Error('Server response was not valid JSON');
                  }
              });
      })
      .then(data => {
          setMessage(data.message || data.error);
          if (data.message && data.message.includes("added")) {
              setWatchlistStocks(prevStocks => [...prevStocks, stock]); // Update the watchlist stocks in context
          }
      })
      .catch(error => console.error("Error adding to watchlist:", error));
  };
  

    const removeFromWatchlist = (stock) => {
        fetch('/api/remove-from-watchlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stock: stock }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            } else if (data.error) {
                alert(data.error);
            }
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
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}

            { stocks.length > 0 ? (
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
                            <button onClick={() => addToWatchlist(stock)}>Add to Watchlist</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Search for stocks using the search bar above.</p>
            )}
        </div>
    );
}
