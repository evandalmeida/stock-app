import React from 'react';
import MarketWatch from './MarketWatch';
import NavBar from './NavBar';
import Footer from '../FooterPanel/Footer'

export default function UDashMarketWatch( {currentUser, logout}){
    return (
      <>
        <div className='user-details'>
        <header class="page-title">StockWatcher</header>
          <NavBar currentUser={currentUser} logout={logout} />
          <MarketWatch/>
        </div>
        <Footer/>
      </>
    )
}