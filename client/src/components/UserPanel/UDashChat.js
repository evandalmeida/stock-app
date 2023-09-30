import React from 'react';
import ChatBot from './ChatBot';
import NavBar from './NavBar';

export default function UDashWatchListandChat( {currentUser, logout}){

    return (
        <div className='user-details'>
            <NavBar currentUser={currentUser} logout={logout} />
            <ChatBot/>
        </div>
    )
}