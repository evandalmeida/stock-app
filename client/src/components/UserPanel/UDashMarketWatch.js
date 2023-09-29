import React from 'react';
import MarketWatch from './MarketWatch';
import NavBar from './NavBar';

export default function UDashMarketWatch( {currentUser, logout}){
    return (
        <div className='user-details'>
          <h2>{currentUser.username}: User Dashboard</h2>
          <NavBar currentUser={currentUser} logout={logout} />
          <MarketWatch/>
        </div>
    )
}