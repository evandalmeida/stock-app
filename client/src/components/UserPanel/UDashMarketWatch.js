import React from 'react';
import MarketWatch from './MarketWatch';
import NavBar from './NavBar';
import Footer from '../FooterPanel/Footer'

export default function UDashMarketWatch( {currentUser, logout}){
    return (
      <>
        <div className='user-details'>
          <NavBar currentUser={currentUser} logout={logout} />
          <MarketWatch/>
        </div>
        <footer>
          <Footer/>
        </footer>
      </>
    )
}