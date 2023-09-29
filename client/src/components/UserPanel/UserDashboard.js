import React from 'react';
import StocksList from './StocksList';
import MarketWatch from './MarketWatch';
import NavBar from './NavBar';
import { Navigate } from 'react-router-dom';

export default function UserDashboard({ currentUser, logout }) {

  if (!currentUser || !currentUser.username) {
  
    return <Navigate to="/" replace />;
  }

  return (
    <div className='user-details'>
      <h2>{currentUser.username}: User Dashboard</h2>
      <NavBar currentUser={currentUser} logout={logout} />
      <StocksList/>
      <MarketWatch/>
    </div>
  );
}