import { createContext, useContext, useState } from 'react';

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlistStocks, setWatchlistStocks] = useState([]);

  return (
    <WatchlistContext.Provider value={{ watchlistStocks, setWatchlistStocks }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}
