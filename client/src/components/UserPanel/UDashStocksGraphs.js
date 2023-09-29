import React from 'react';
import StocksList from './StocksList';
import NavBar from './NavBar';


export default function UDashStocksGraphs( {currentUser, logout}){

    return (
        <div className='user-details'>
          <h2>{currentUser.username}: User Dashboard</h2>
          <NavBar currentUser={currentUser} logout={logout} />
          <StocksList/>
        </div>
    )
}