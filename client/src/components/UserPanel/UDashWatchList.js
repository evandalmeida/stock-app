import React from 'react';
import WatchList from './WatchList';
import NavBar from './NavBar';

export default function UDashWatchListandChat( {currentUser, logout}){

    return (
        <div className='user-details'>
          <NavBar currentUser={currentUser} logout={logout} />
          <WatchList/>
        </div>
    )
}