import React from 'react';
import StocksList from './StocksList';
import WatchList from './WatchList';

function UserDashboard() {
  return (
    <div>
      <h2>User Dashboard</h2>
      <StocksList />
      <WatchList />
    </div>
  );
}

export default UserDashboard;
