import React from 'react';
import StocksList from './Search';
import MarketWatch from './MarketWatch';
import NavBar from './NavBar';
import { Navigate } from 'react-router-dom';
import Footer from '../FooterPanel/Footer'

export default function UserDashboard({ currentUser, logout }) {

  if (!currentUser || !currentUser.username) {
  
    return <Navigate to="/" replace />;
  }

  return (
    <>
    <div className='user-details'>
      <NavBar currentUser={currentUser} logout={logout} />
      <p>Welcome to MarketWatch, your trusted platform for tracking stock market data and making informed investment decisions. Our app is designed to empower investors and traders with real-time information and powerful tools.</p>
      <MarketWatch />
      <p>At MarketWatch, our mission is to empower individuals with the knowledge and tools they need to make informed financial decisions. We are committed to:</p>
      <StocksList />
    </div>
    <Footer/>
    </>
  );
}