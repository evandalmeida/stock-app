import React from 'react';
import ChatBot from './ChatBot';
import NavBar from './NavBar';
import Footer from '../FooterPanel/Footer'


export default function UDashWatchListandChat( {currentUser, logout}){
    return (
        <>    
            <div className='user-details'>
            <header class="page-title">StockWatcher</header>
                <NavBar currentUser={currentUser} logout={logout} />
                <ChatBot/>
            </div>
            <Footer/>
        </>
    )
}