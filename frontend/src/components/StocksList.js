import React, { useEffect, useState } from 'react';

function StocksList() {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the most active stocks from the backend
    fetch('/api/most-active-stocks')
      .then(response => response.json())
      .then(data => setStocks(data))
      .catch(error => {
        console.error("Error fetching stock data:", error);
        setError('Error loading stocks!'); // Set the error state here
      });
  }, []);

  return (
    <div>
      <h1>Most Active Stocks</h1>
      {error ? (
        <p>{error}</p> // Display the error message
      ) : stocks.length > 0 ? (
        <ul>
          {stocks.map(stock => (
            <li key={stock.symbol}>
              {stock.symbol} ({stock.companyName}): ${stock.latestPrice}
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
