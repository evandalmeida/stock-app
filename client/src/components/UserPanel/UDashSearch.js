import React from 'react';
import Search from './Search';
import NavBar from './NavBar';


export default function UDashSearch( {currentUser, logout}){

    return (
        <div className='user-details'>
          <NavBar currentUser={currentUser} logout={logout} />
          <Search/>
        </div>
    )
}