import React from 'react';
import ChatBot from './ChatBot';
import WatchList from './WatchList';
import NavBar from './NavBar';

export default function UDashWatchListandChat( {currentUser, logout}){

    return (
        <div className='user-details'>
          <h2>{currentUser.username}: User Dashboard</h2>
          <NavBar currentUser={currentUser} logout={logout} />
          <WatchList/>
          <ChatBot/>
        </div>
    )
}