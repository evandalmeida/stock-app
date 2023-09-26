import React, { useEffect, useState } from 'react';

function StocksList() {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the most active stocks from the backend
    fetch('/api/most-active-stocks')
      .then(response => response.json())
      .then(data => setStocks(data))
      .catch(error => console.error("Error fetching stock data:", error));
  }, []);

  return (
    <div>
        {error && <p>Error loading stocks!</p>}
        <h1>Most Active Stocks</h1>
        <ul>
            {stocks.map(stock => (
            <li key={stock.symbol}>
                {stock.symbol} ({stock.companyName}): ${stock.latestPrice}
            </li>
            ))}
        </ul>
    </div>
  );
}

export default StocksList;