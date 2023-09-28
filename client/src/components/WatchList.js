import React, { useEffect, useState } from 'react';
import axios from 'axios';

function WatchList() {
  const [stocks, setStocks] = useState([]);
  
  useEffect(() => {
    axios.get('/api/watchlist')
      .then(response => setStocks(response.data))
      .catch(error => console.error('Error fetching watchlist:', error));
  }, []);
  
  return (
    <div>
      <h2>WatchList</h2>
      <ul>
        {stocks.map(stock => (
          <li key={stock.id}>{stock.symbol} ({stock.name})</li>
        ))}
      </ul>
    </div>
  );
}

export default WatchList;
