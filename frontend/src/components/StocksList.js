import React, { useEffect, useState } from 'react';

function StocksList() {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all available stocks from the backend
    fetch('/api/all-stocks')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setStocks(data))
      .catch(error => {
        console.error("Error fetching stock data:", error);
        setError('Error loading stocks!'); // Set the error state here
      });
  }, []);

  return (
    <div>
      <h1>All Available Stocks</h1>
      {error ? (
        <p>{error}</p> // Display the error message
      ) : stocks.length > 0 ? (
        <ul>
          {stocks.map(stock => (
            <li key={stock.symbol}>
              {stock.symbol} ({stock.name})
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading stocks...</p>
      )}
    </div>
  );
}

export default StocksList;
