import React, { useEffect } from 'react';
import axios from 'axios';
import { useWatchlist } from './WatchListContext';

export default function WatchList() {
    const { watchlistStocks, setWatchlistStocks } = useWatchlist();

    useEffect(() => {
        axios.get('/api/watchlist')
            .then(response => {
                console.log("API Response:", response.data);
                setWatchlistStocks(response.data);
            })
            .catch(error => console.error('Error fetching watchlist:', error));
    }, []);

    const removeFromWatchlist = (stock) => {
        axios.post('/api/remove-from-watchlist', { stock: stock })
            .then(response => {
                if (response.data.message) {
                    setWatchlistStocks(prevStocks => prevStocks.filter(s => s.id !== stock.id));
                } else if (response.data.error) {
                    console.error('Error removing stock:', response.data.error);
                }
            })
            .catch(error => console.error('Error sending remove request:', error));
    };

    return (
        <div>
            <h2>WatchList</h2>
            {watchlistStocks ? watchlistStocks.map(stock => (
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
                    <button onClick={() => removeFromWatchlist(stock)}>Remove from Watchlist</button>
                </div>
            )) : <p>Loading...</p>}
        </div>
    );
}
