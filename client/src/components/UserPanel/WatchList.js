import React, { useEffect } from 'react';
import axios from 'axios';
import { useWatchlist } from './WatchListContext';

export default function WatchList() {
    const { stocks, setStocks } = useWatchlist();

    useEffect(() => {
        axios.get('/api/watchlist')
            .then(response => setStocks(response.data))
            .catch(error => console.error('Error fetching watchlist:', error));
    }, []);

    const removeFromWatchlist = (stock) => {
        axios.post('/api/remove-from-watchlist', { stock: stock })
            .then(response => {
                if (response.data.message) {
                    setStocks(prevStocks => prevStocks.filter(s => s.id !== stock.id));
                } else if (response.data.error) {
                    console.error('Error removing stock:', response.data.error);
                }
            })
            .catch(error => console.error('Error sending remove request:', error));
    };

    return (
        <div>
            <h2>WatchList</h2>
            {stocks ? stocks.map(stock => (
                <div className="stock-card" key={stock.id}>
                    <h3>{stock.symbol} ({stock.name})</h3>
                    <button onClick={() => removeFromWatchlist(stock)}>Remove from Watchlist</button>
                </div>
            )) : <p>Loading...</p>}
        </div>
    );
}
