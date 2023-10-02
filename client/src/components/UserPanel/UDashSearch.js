import React from 'react';
import Search from './Search';
import NavBar from './NavBar';
import Footer from '../FooterPanel/Footer'

export default function UDashSearch( {currentUser, logout}){

    return (
      <>
        <div className='user-details'>
        <header class="page-title">StockWatcher</header>
          <NavBar currentUser={currentUser} logout={logout} />
          <Search/>
        </div>
        <Footer/>
      </>
    )
}