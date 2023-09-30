import React from 'react';
import StocksList from './Search';
import MarketWatch from './MarketWatch';
import NavBar from './NavBar';
import { Navigate } from 'react-router-dom';

export default function UserDashboard({ currentUser, logout }) {

  if (!currentUser || !currentUser.username) {
  
    return <Navigate to="/" replace />;
  }

  return (
    <div className='user-details'>
      <NavBar currentUser={currentUser} logout={logout} />
      <StocksList />
      <MarketWatch />
    </div>
  );
}