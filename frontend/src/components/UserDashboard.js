import React from 'react';
import StocksList from './StocksList';
import WatchList from './WatchList';
import MarketWatch from './MarketWatch';

function UserDashboard() {
  return (
    <div>
      <h2>User Dashboard</h2>
      <StocksList />
      <MarketWatch />
      <WatchList />
    </div>
  );
}

export default UserDashboard;
