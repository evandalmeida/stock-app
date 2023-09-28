import React from 'react';
import StocksList from '../StocksList';
import WatchList from '../WatchList';
import MarketWatch from '../MarketWatch';
import ChatBot from '../ChatBot';
import NavBar from '../NavBar';
import { Navigate } from 'react-router-dom';

function UserDashboard({ currentUser, logout }) {
  // Check if currentUser exists and has a username property
  if (!currentUser || !currentUser.username) {
    // Redirect to home if no user is logged in
    return <Navigate to="/" replace />;
  }

  return (
    <div className='user-details'>
      <h2>{currentUser.username}: User Dashboard</h2>
      <NavBar currentUser={currentUser} logout={logout} />
      <StocksList />
      <MarketWatch />
      <WatchList />
      <ChatBot />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default UserDashboard;
